package com.linkIt.api.application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.linkIt.api.domain.dtos.auth.AdminRegisterDTO;
import com.linkIt.api.domain.dtos.shortened.AllShortenedsResponseDTO;
import com.linkIt.api.domain.services.AuthenticationService;
import com.linkIt.api.domain.services.ShortenedService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1")
@RequiredArgsConstructor
public class AdminController {

    private final AuthenticationService authenticationService;

    private final ShortenedService shortenedService;

    @PostMapping("/register")
    public ResponseEntity<Void> adminRegister(@RequestBody @Valid AdminRegisterDTO adminRegisterDTO) {
        this.authenticationService.register(adminRegisterDTO);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/shortened/all")
    public ResponseEntity<AllShortenedsResponseDTO> getAll(@RequestParam(name = "page") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        AllShortenedsResponseDTO shorteneds = this.shortenedService.getAll(page, size);
        return ResponseEntity.ok(shorteneds);
    }
}
