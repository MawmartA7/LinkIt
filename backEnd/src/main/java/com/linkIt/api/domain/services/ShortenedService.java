package com.linkIt.api.domain.services;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linkIt.api.domain.models.Shortened;
import com.linkIt.api.domain.models.enums.ShortenedStatus;
import com.linkIt.api.domain.dtos.shortened.AllShortenedsResponseDTO;
import com.linkIt.api.domain.dtos.shortened.CreateShortenedRequestDTO;
import com.linkIt.api.domain.dtos.shortened.DetailsResponseDTO;
import com.linkIt.api.domain.dtos.shortened.ShortenedSortDTO;
import com.linkIt.api.domain.exceptions.shortened.ShortenedAlreadyExistsException;
import com.linkIt.api.domain.exceptions.shortened.ShortenedNotFoundException;
import com.linkIt.api.domain.repositories.ShortenedRepository;
import com.linkIt.api.infra.scheduler.ShortenedSchedulerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShortenedService {

    private final ShortenedRepository shortenedRepository;

    private final ShortenedSchedulerService shortenedSchedulerService;

    @Value("${api.shortened.expirationInHours}")
    private int EXPIRATION_IN_HOURS;

    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Transactional
    public void create(CreateShortenedRequestDTO createRequestDTO, String login) {

        String id = createRequestDTO.id();

        if (id == null || id.isBlank()) {
            id = this.generateRandomId(4, 6);
        }

        if (this.shortenedRepository.existsByAliasAndOwner(createRequestDTO.alias(), login)) {
            throw new ShortenedAlreadyExistsException();
        }

        if (this.shortenedRepository.existsById(id)) {
            String addOn = this.generateRandomId(1, 3);
            String possibleId = id + "-" + addOn;
            while (this.shortenedRepository.existsById(possibleId)) {
                addOn = this.generateRandomId(1, 3);
                possibleId = id + "-" + addOn;
            }
            id = possibleId;
        }

        Shortened shortened = new Shortened(id, login, createRequestDTO.url(), createRequestDTO.alias(),
                EXPIRATION_IN_HOURS);

        shortenedSchedulerService.scheduleShortenedExpired(id,
                shortened.getExpiredAt().toInstant(ZoneOffset.of("-03:00")));

        this.shortenedRepository.insert(shortened);

    }

    public DetailsResponseDTO getShortenedDetails(String alias, String login) {

        Shortened shortened = this.shortenedRepository.findByAliasAndOwner(alias, login)
                .orElseThrow(() -> new ShortenedNotFoundException());

        return new DetailsResponseDTO(shortened);

    }

    @Transactional
    public void changeStatus(String alias, ShortenedStatus status, String login) {
        Shortened shortened = this.shortenedRepository.findByAliasAndOwner(alias, login)
                .orElseThrow(() -> new ShortenedNotFoundException());

        if (shortened.getStatus().equals(ShortenedStatus.expired) && status.equals(ShortenedStatus.available)) {
            shortened.setExpiredAt(LocalDateTime.now().plusHours(EXPIRATION_IN_HOURS));

            shortenedSchedulerService.scheduleShortenedExpired(shortened.getId(),
                    shortened.getExpiredAt().toInstant(ZoneOffset.of("-03:00")));

        }

        shortened.setStatus(status);
        shortened.setStatusModifiedAt(LocalDateTime.now());

        this.shortenedRepository.save(shortened);
    }

    @Transactional
    public void deleteShortened(String alias, String login) {
        if (!this.shortenedRepository.existsByAliasAndOwner(alias, login)) {
            throw new ShortenedNotFoundException();
        }

        this.shortenedRepository.deleteByAliasAndOwner(alias, login);
    }

    public AllShortenedsResponseDTO getAllByUserAndSearch(String search, int page, int size, ShortenedSortDTO sort,
            String login) {

        var pageable = PageRequest.of(page, size, sort.direction(), sort.orderBy().getFieldName(), "createdAt",
                "statusModifiedAt");

        if (search.isBlank()) {
            var shorteneds = this.shortenedRepository.findAllByOwner(login, pageable);

            return new AllShortenedsResponseDTO(shorteneds);
        } else {
            var shorteneds = this.shortenedRepository.findAllByOwnerAndAliasContaining(login, search, pageable);

            return new AllShortenedsResponseDTO(shorteneds);
        }
    }

    public AllShortenedsResponseDTO getAll(int page, int size) {

        var pageable = PageRequest.of(page, size, Direction.ASC, "createdAt", "statusModifiedAt");
        var shorteneds = this.shortenedRepository.findAll(pageable);

        return new AllShortenedsResponseDTO(shorteneds);
    }

    @Transactional
    public String redirect(String id) {

        Shortened shortened = this.shortenedRepository.findById(id).orElseThrow(() -> new ShortenedNotFoundException());

        if (shortened.getStatus() != ShortenedStatus.available) {
            return FRONTEND_URL + "/link-unavailable";
        }

        shortened.setClicks(shortened.getClicks() + 1);
        shortened.setLastAccessed(LocalDateTime.now());

        this.shortenedRepository.save(shortened);

        return shortened.getOriginalUrl();

    }

    private String generateRandomId(int min, int max) {
        String id = RandomStringUtils.randomAlphanumeric(min, max);

        while (this.shortenedRepository.existsById(id)) {
            id = RandomStringUtils.randomAlphanumeric(min, max);
        }

        return id;
    }

}
