package com.linkIt.api.application.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.linkIt.api.domain.dtos.auth.AuthDTO;
import com.linkIt.api.domain.dtos.auth.EmailConfirmationDTO;
import com.linkIt.api.domain.dtos.auth.EmailDTO;
import com.linkIt.api.domain.dtos.auth.RecoveryCodeDTO;
import com.linkIt.api.domain.dtos.auth.RecoveryPasswordDTO;
import com.linkIt.api.domain.dtos.auth.TokenResponseDTO;
import com.linkIt.api.domain.services.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Value("${api.jwt.expirationInHours}")
    private int tokenExpirationInHours;

    @Value("${app.environment}")
    private String appEnvironment;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody @Valid AuthDTO loginDTO,
            HttpServletResponse response) {
        TokenResponseDTO token = this.authenticationService.login(loginDTO);

        Cookie cookie = new Cookie("token", token.token());

        cookie.setHttpOnly(true);
        cookie.setSecure(appEnvironment == "prod" ? true : false);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * tokenExpirationInHours);
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> userRegister(@RequestBody @Valid AuthDTO authDTO) {
        this.authenticationService.userRegister(authDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/email")
    public ResponseEntity<Void> confirmEmail(@RequestParam String email, @RequestParam String confirmationId) {
        this.authenticationService.confirmEmail(new EmailConfirmationDTO(confirmationId, email));

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/email/forgot-password")
    public ResponseEntity<Void> sendRecoveryPassword(@RequestBody EmailDTO emailDTO) {
        this.authenticationService.sendRecoveryPassword(emailDTO);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/recovery-password/verify")
    public ResponseEntity<String> veryPassword(@RequestBody RecoveryCodeDTO recoveryCodeDTO) {
        String recoveryLink = this.authenticationService.verifyRecoveryCode(recoveryCodeDTO.code());

        return ResponseEntity.ok(recoveryLink);
    }

    @PatchMapping("/recovery-password/recovery")
    public ResponseEntity<Void> recoveryPassword(@RequestBody RecoveryPasswordDTO recoveryPasswordDTO) {
        this.authenticationService.recoveryPassword(recoveryPasswordDTO);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
