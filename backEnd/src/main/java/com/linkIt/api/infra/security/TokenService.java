package com.linkIt.api.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.linkIt.api.domain.exceptions.auth.TokenException;
import com.linkIt.api.domain.models.User;
import com.linkIt.api.domain.repositories.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService {

    @Value("${api.jwt.secret}")
    private String secretKey;

    @Value("${api.jwt.issuer}")
    private String issuer;

    @Value("${api.jwt.expirationInHours}")
    private int tokenExpiration;

    private final UserRepository userRepository;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            String token = JWT.create()
                    .withIssuer(issuer)
                    .withSubject(user.getLogin())
                    .withExpiresAt(this.generateExpirationDate(tokenExpiration))
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException ex) {
            throw new RuntimeException("an error occurred while the token was being created", ex);
        }
    }

    public String generateGenericToken(String subject, int expirationInMinutes) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            String token = JWT.create()
                    .withIssuer(issuer)
                    .withSubject(subject)
                    .withExpiresAt(this.generateExpirationDate(expirationInMinutes))
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException ex) {
            throw new RuntimeException("an error occurred while the generic token was being created", ex);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (TokenExpiredException ex) {
            throw new TokenException("Token expired");

        } catch (JWTVerificationException ex) {
            return "";
        }
    }

    public String getUserLoginByToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("token")) {
                String login = this.validateToken(cookie.getValue());

                return this.userRepository.findByLogin(login).getUsername();
            }
        }

        return null;
    }

    private Instant generateExpirationDate(int expiration) {
        return LocalDateTime.now().plusHours(expiration).toInstant(ZoneOffset.of("-03:00"));
    }

}
