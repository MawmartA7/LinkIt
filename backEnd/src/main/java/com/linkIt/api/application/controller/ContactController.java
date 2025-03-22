package com.linkIt.api.application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.linkIt.api.domain.dtos.contact.MailDTO;
import com.linkIt.api.domain.services.ContactService;
import com.linkIt.api.infra.security.TokenService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/contact")
public class ContactController {

    private final ContactService contactService;

    private final TokenService tokenService;

    @PostMapping("/send-email")
    public ResponseEntity<Void> sendEmail(@RequestBody @Valid MailDTO mailDTO, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        contactService.sendEmail(mailDTO, login);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

}
