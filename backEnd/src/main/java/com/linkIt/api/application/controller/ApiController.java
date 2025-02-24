package com.linkIt.api.application.controller;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.linkIt.api.domain.dtos.shortened.AllShortenedsResponseDTO;
import com.linkIt.api.domain.dtos.shortened.CreateShortenedRequestDTO;
import com.linkIt.api.domain.dtos.shortened.DetailsResponseDTO;
import com.linkIt.api.domain.dtos.shortened.ShortenedSortDTO;
import com.linkIt.api.domain.models.enums.ShortenedSortable;
import com.linkIt.api.domain.models.enums.ShortenedStatus;
import com.linkIt.api.infra.security.TokenService;
import com.linkIt.api.domain.services.ShortenedService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiController {

    public static String API_URL = System.getenv().getOrDefault("API_URL", "http://localhost:8080");

    private final ShortenedService shortenedService;

    private final TokenService tokenService;

    @PostMapping("/shorten")
    public ResponseEntity<Void> createShortenedUrl(@RequestBody @Valid CreateShortenedRequestDTO createRequestDTO,
            HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        this.shortenedService.create(createRequestDTO, login);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/details/{alias}")
    public ResponseEntity<DetailsResponseDTO> getShortenedDetails(@PathVariable String alias,
            HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        return ResponseEntity.ok(this.shortenedService.getShortenedDetails(alias, login));
    }

    @PatchMapping("/status/{alias}/available")
    public ResponseEntity<Void> changeToAvailable(@PathVariable String alias, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        this.shortenedService.changeStatus(alias, ShortenedStatus.available, login);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/status/{alias}/disabled")
    public ResponseEntity<Void> changeToDisabled(@PathVariable String alias, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        this.shortenedService.changeStatus(alias, ShortenedStatus.disabled, login);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/status/{alias}/expired")
    public ResponseEntity<Void> changeToExpired(@PathVariable String alias, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        this.shortenedService.changeStatus(alias, ShortenedStatus.expired, login);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/shorten/{alias}/delete")
    public ResponseEntity<Void> delete(@PathVariable String alias, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        this.shortenedService.deleteShortened(alias, login);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/shortened/all")
    public ResponseEntity<AllShortenedsResponseDTO> getAllBySearch(
            @RequestParam(name = "search", defaultValue = "") String search, @RequestParam(name = "page") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            @RequestParam(name = "orderBy", defaultValue = "expiredAt") ShortenedSortable orderBy,
            @RequestParam(name = "order", defaultValue = "DESC") Direction sortDirection, HttpServletRequest request) {

        String login = tokenService.getUserLoginByAccessToken(request);

        AllShortenedsResponseDTO shorteneds = this.shortenedService.getAllByUserAndSearch(search, page, size,
                new ShortenedSortDTO(orderBy, sortDirection), login);
        return ResponseEntity.ok(shorteneds);
    }

}
