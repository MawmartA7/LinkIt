package com.linkIt.api.application.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.linkIt.api.domain.services.ShortenedService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final ShortenedService shortenedService;

    @GetMapping("/{id}")
    public ResponseEntity<Void> redirect(@PathVariable String id, HttpServletResponse servletResponse)
            throws IOException {

        servletResponse.sendRedirect(this.shortenedService.redirect(id));

        return ResponseEntity.status(HttpStatus.PERMANENT_REDIRECT).build();
    }

}
