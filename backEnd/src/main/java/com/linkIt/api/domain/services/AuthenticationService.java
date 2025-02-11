package com.linkIt.api.domain.services;

import java.util.Random;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linkIt.api.domain.models.EmailConfirmation;
import com.linkIt.api.domain.models.User;
import com.linkIt.api.domain.models.UserRole;
import com.linkIt.api.domain.dtos.auth.AdminRegisterDTO;
import com.linkIt.api.domain.dtos.auth.AuthDTO;
import com.linkIt.api.domain.dtos.auth.EmailConfirmationDTO;
import com.linkIt.api.domain.dtos.auth.EmailDTO;
import com.linkIt.api.domain.dtos.auth.RecoveryPasswordDTO;
import com.linkIt.api.domain.dtos.auth.TokenDTO;
import com.linkIt.api.domain.exceptions.auth.EmailConfirmException;
import com.linkIt.api.domain.exceptions.auth.EmailNotConfirmedException;
import com.linkIt.api.domain.exceptions.auth.RecoveryPasswordException;
import com.linkIt.api.domain.exceptions.auth.TokenException;
import com.linkIt.api.domain.exceptions.auth.UserAlreadyExistsException;
import com.linkIt.api.domain.exceptions.auth.UserNotFoundException;
import com.linkIt.api.infra.security.TokenService;
import com.linkIt.api.domain.repositories.EmailConfirmationRepository;
import com.linkIt.api.domain.repositories.RefreshTokenRepository;
import com.linkIt.api.domain.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository repository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final EmailConfirmationRepository emailConfirmationRepository;

    private final TokenService tokenService;

    private final EmailService emailService;

    public TokenDTO[] login(AuthDTO data) {

        User user = (User) this.repository.findByLogin(data.login());

        EmailConfirmation emailConfirmation = this.emailConfirmationRepository.findByEmail(data.login()).orElse(null);

        if (user == null && emailConfirmation != null) {
            throw new EmailNotConfirmedException("Email is not confirmed");
        }

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var accessToken = this.tokenService.generateAccessToken((User) auth.getPrincipal());
        String refreshToken = this.tokenService.generateRefreshToken((User) auth.getPrincipal());
        TokenDTO[] tokens = { new TokenDTO(accessToken), new TokenDTO(refreshToken) };
        return tokens;
    }

    @Transactional
    public void register(AdminRegisterDTO data) {
        if (this.repository.findByLogin(data.login()) != null)
            throw new UserAlreadyExistsException("User already registered with the same login");

        String encrypedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encrypedPassword, data.role());

        this.emailConfirmationRepository.deleteAllByEmail(data.login());

        String randomDigits = this.createCode();

        EmailConfirmation emailConfirmation = new EmailConfirmation(randomDigits, data.login(), newUser);

        this.emailConfirmationRepository.insert(emailConfirmation);

        emailService
                .sendEmailConfirmation(new EmailConfirmationDTO(randomDigits, data.login()));

    }

    public void userRegister(AuthDTO data) {
        AdminRegisterDTO register = new AdminRegisterDTO(data.login(), data.password(), UserRole.USER);

        this.register(register);
    }

    @Transactional
    public void confirmEmail(EmailConfirmationDTO dto) {

        var emailConfirmation = this.emailConfirmationRepository.findByEmail(dto.email());

        if (emailConfirmation.isEmpty() || !emailConfirmation.get().getId().equals(dto.id())) {
            throw new EmailConfirmException("Email or confirm id not found");
        }

        User user = emailConfirmation.get().getUser();

        this.repository.save(user);

        this.emailConfirmationRepository.delete(emailConfirmation.get());
    }

    @Transactional
    public void sendRecoveryPassword(EmailDTO emailDTO) {

        if (!this.repository.existsByLogin(emailDTO.email())) {
            throw new EmailConfirmException("Email not registered in DB");
        }

        String randomDigits = this.createCode();

        EmailConfirmation emailConfirmation = new EmailConfirmation(randomDigits, emailDTO.email());

        this.emailConfirmationRepository.insert(emailConfirmation);

        emailService
                .sendEmailPasswordRecovey(new EmailConfirmationDTO(randomDigits, emailDTO.email()));
    }

    @Transactional
    public String verifyRecoveryCode(String code) {
        EmailConfirmation emailConfirmation = this.emailConfirmationRepository.findById(code)
                .orElseThrow(() -> new RecoveryPasswordException("The code is incorrect"));

        String token = this.tokenService.generateGenericToken(emailConfirmation.getEmail(), 10);

        this.emailConfirmationRepository.delete(emailConfirmation);

        return token;
    }

    @Transactional
    public void recoveryPassword(RecoveryPasswordDTO recoveryPasswordDTO) {

        String email = this.tokenService.validateAccessToken(recoveryPasswordDTO.token());

        User user = (User) this.repository.findByLogin(email);

        user.setPassword(new BCryptPasswordEncoder().encode(recoveryPasswordDTO.password()));

        this.repository.save(user);

    }

    public TokenDTO generateRefreshAccessToken(TokenDTO tokenDTO) {

        if (!this.refreshTokenRepository.existsByToken(tokenDTO.token())) {
            throw new TokenException("Invalid token: " + tokenDTO.token());
        }

        String login = this.tokenService.validateRefreshToken(tokenDTO.token());

        if (login.isEmpty()) {
            throw new TokenException("Invalid token: " + tokenDTO.token());
        }

        User user = (User) this.repository.findByLogin(login);

        String accessToken = this.tokenService.generateAccessToken(user);

        return new TokenDTO(accessToken);
    }

    private String createCode() {
        String randomDigits = String.valueOf(new Random().nextInt(10000, 99999));

        do {
            randomDigits = String.valueOf(new Random().nextInt(10000, 99999));

        } while (this.emailConfirmationRepository.existsById(randomDigits));

        return randomDigits;
    }

}
