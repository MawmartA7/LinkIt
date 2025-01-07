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
import com.linkIt.api.domain.models.RefreshToken;
import com.linkIt.api.domain.models.User;
import com.linkIt.api.domain.repositories.RefreshTokenRepository;
import com.linkIt.api.domain.repositories.UserRepository;
import com.linkIt.api.infra.scheduler.TokenSchedulerService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService {

    @Value("${api.jwt.secret.accessToken}")
    private String accessTokenSecret;

    @Value("${api.jwt.secret.refreshToken}")
    private String refreshTokenSecret;

    @Value("${api.jwt.secret.genericToken}")
    private String genericTokenSecret;

    @Value("${api.jwt.issuer}")
    private String issuer;

    @Value("${api.jwt.expirationInMinutes.accessToken}")
    private int accessTokenExpiration;
    @Value("${api.jwt.expirationInMinutes.refreshToken}")
    private int refreshTokenExpiration;

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final TokenSchedulerService tokenSchedulerService;

    public String generateAccessToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(accessTokenSecret);
            String token = JWT.create()
                    .withIssuer(issuer)
                    .withSubject(user.getLogin())
                    .withExpiresAt(this.generateExpirationDate(accessTokenExpiration))
                    .sign(algorithm);

            return token;
        } catch (JWTCreationException ex) {
            throw new RuntimeException("an error occurred while the token was being created", ex);
        }
    }

    public String generateRefreshToken(User user) {
        try {
            LocalDateTime expiration = LocalDateTime.now().plusMinutes(refreshTokenExpiration);
            Instant intantExpiration = expiration.toInstant(ZoneOffset.of("-03:00"));

            Algorithm algorithm = Algorithm.HMAC256(refreshTokenSecret);

            String token = JWT.create()
                    .withIssuer(issuer)
                    .withSubject(user.getLogin())
                    .withExpiresAt(intantExpiration)
                    .sign(algorithm);

            var refreshToken = refreshTokenRepository.insert(new RefreshToken(token, expiration));

            this.tokenSchedulerService.scheduleTokenExpired(refreshToken.getId().toString(), intantExpiration);

            return token;
        } catch (JWTCreationException ex) {
            throw new RuntimeException("an error occurred while the token was being created", ex);
        }
    }

    public String generateGenericToken(String subject, int expirationInMinutes) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(genericTokenSecret);
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

    public String validateAccessToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(accessTokenSecret);
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

    public String validateRefreshToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(refreshTokenSecret);
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

    public String validateGenericToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(genericTokenSecret);
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

    public String getUserLoginByAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("token")) {
                String login = this.validateAccessToken(cookie.getValue());

                return this.userRepository.findByLogin(login).getUsername();
            }
        }

        return null;
    }

    private Instant generateExpirationDate(int expiration) {
        return LocalDateTime.now().plusMinutes(expiration).toInstant(ZoneOffset.of("-03:00"));
    }

}
