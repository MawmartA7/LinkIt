package com.linkIt.api.application.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linkIt.api.domain.dtos.auth.AuthDTO;
import com.linkIt.api.domain.dtos.auth.EmailConfirmationDTO;
import com.linkIt.api.domain.dtos.auth.EmailDTO;
import com.linkIt.api.domain.dtos.auth.RecoveryCodeDTO;
import com.linkIt.api.domain.dtos.auth.RecoveryPasswordDTO;
import com.linkIt.api.domain.dtos.auth.TokenDTO;
import com.linkIt.api.domain.services.AuthenticationService;
import com.linkIt.api.infra.security.CookieService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Value("${api.jwt.expirationInMinutes.accessToken}")
    private int accessTokenExpiration;
    @Value("${api.jwt.expirationInMinutes.refreshToken}")
    private int refreshTokenExpiration;

    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody @Valid AuthDTO loginDTO,
            HttpServletResponse response) {
        var tokens = this.authenticationService.login(loginDTO);

        TokenDTO accessToken = tokens[0];

        this.cookieService.createCookie(response, "access_token", accessToken.token(), "/", true,
                accessTokenExpiration);

        TokenDTO refreshToken = tokens[1];

        this.cookieService.createCookie(response, "refresh_token", refreshToken.token(), "/", true,
                refreshTokenExpiration);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> userRegister(@RequestBody @Valid AuthDTO authDTO) {
        this.authenticationService.userRegister(authDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        this.cookieService.deleteCookie(response, "access_token", "/");
        this.cookieService.deleteCookie(response, "refresh_token", "/");

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/email")
    public ResponseEntity<Void> confirmEmail(@RequestBody EmailConfirmationDTO emailConfirmationDTO) {
        this.authenticationService.confirmEmail(emailConfirmationDTO);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/email/forgot-password")
    public ResponseEntity<Void> sendRecoveryPassword(@RequestBody EmailDTO emailDTO) {
        this.authenticationService.sendRecoveryPassword(emailDTO);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/recovery-password/verify")
    public ResponseEntity<TokenDTO> veryPassword(@RequestBody RecoveryCodeDTO recoveryCodeDTO) {
        TokenDTO token = this.authenticationService.verifyRecoveryCode(recoveryCodeDTO.code());

        return ResponseEntity.ok(token);
    }

    @PatchMapping("/recovery-password/recovery")
    public ResponseEntity<Void> recoveryPassword(@RequestBody RecoveryPasswordDTO recoveryPasswordDTO) {
        this.authenticationService.recoveryPassword(recoveryPasswordDTO);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = this.cookieService.getCookieValue(request, "refresh_token");

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }
        TokenDTO accessToken = this.authenticationService
                .generateRefreshAccessToken(new TokenDTO(refreshToken));

        this.cookieService.createCookie(response, "access_token", accessToken.token(), "/", true,
                accessTokenExpiration);

        return ResponseEntity.ok().build();

    }

}
