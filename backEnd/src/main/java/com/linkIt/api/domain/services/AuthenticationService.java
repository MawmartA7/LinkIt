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
import com.linkIt.api.domain.dtos.auth.TokenResponseDTO;
import com.linkIt.api.domain.exceptions.auth.EmailConfirmException;
import com.linkIt.api.domain.exceptions.auth.EmailNotConfirmedException;
import com.linkIt.api.domain.exceptions.auth.RecoveryPasswordException;
import com.linkIt.api.domain.exceptions.auth.UserAlreadyExistsException;
import com.linkIt.api.domain.exceptions.auth.UserNotFoundException;
import com.linkIt.api.infra.scheduler.UserSchedulerService;
import com.linkIt.api.infra.security.TokenService;
import com.linkIt.api.domain.repositories.EmailConfirmationRepository;
import com.linkIt.api.domain.repositories.UserRepository;
import java.time.ZoneOffset;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository repository;

    private final EmailConfirmationRepository emailConfirmationRepository;

    private final TokenService tokenService;

    private final EmailService emailService;

    private final UserSchedulerService userSchedulerService;

    public TokenResponseDTO login(AuthDTO data) {

        User user = (User) this.repository.findByLogin(data.login());

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        if (user == null || !user.isEmailConfirmed()) {
            throw new EmailNotConfirmedException("Email is not confirmed");
        }

        var token = this.tokenService.generateToken((User) auth.getPrincipal());

        return new TokenResponseDTO(token);
    }

    @Transactional
    public void register(AdminRegisterDTO data) {
        if (this.repository.findByLogin(data.login()) != null)
            throw new UserAlreadyExistsException("User already registered with the same login");

        String encrypedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encrypedPassword, data.role());

        User insertedUser = this.repository.insert(newUser);

        EmailConfirmation emailConfirmation = new EmailConfirmation(data.login());

        userSchedulerService.scheduleUserUpdate(insertedUser.getId().toString(),
                emailConfirmation.getExpiresAt().toInstant(ZoneOffset.of("-03:00")));

        this.emailConfirmationRepository.insert(emailConfirmation);

        emailService
                .sendEmailConfirmation(new EmailConfirmationDTO(emailConfirmation.getId().toString(), data.login()));

    }

    public void userRegister(AuthDTO data) {
        AdminRegisterDTO register = new AdminRegisterDTO(data.login(), data.password(), UserRole.USER);

        this.register(register);
    }

    @Transactional
    public void confirmEmail(EmailConfirmationDTO dto) {

        var emailConfirmation = this.emailConfirmationRepository.findByEmail(dto.email());

        if (emailConfirmation.isEmpty() && !emailConfirmation.get().getId().equals(dto.id())) {
            throw new EmailConfirmException("Email or confirm id not found");
        }

        User user = (User) this.repository.findByLogin(dto.email());

        user.setEmailConfirmed(true);

        this.repository.save(user);
        this.emailConfirmationRepository.delete(emailConfirmation.get());
    }

    @Transactional
    public void sendRecoveryPassword(EmailDTO emailDTO) {

        if (!this.repository.existsByLogin(emailDTO.email())) {
            throw new EmailConfirmException("Email not registered in DB");
        }

        String randomDigits = String.valueOf(new Random().nextInt(10000, 99999));

        do {
            randomDigits = String.valueOf(new Random().nextInt(10000, 99999));

        } while (this.emailConfirmationRepository.existsById(randomDigits));

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

        String email = this.tokenService.validateToken(recoveryPasswordDTO.token());

        User user = (User) this.repository.findByLogin(email);

        user.setPassword(new BCryptPasswordEncoder().encode(recoveryPasswordDTO.password()));

        this.repository.save(user);

    }

}
