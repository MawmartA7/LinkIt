package com.linkIt.api.domain.dtos.shortened;

import java.time.LocalDateTime;

import com.linkIt.api.application.controller.ApiController;
import com.linkIt.api.domain.models.enums.ShortenedStatus;
import com.linkIt.api.domain.models.Shortened;

public record DetailsResponseDTO(String originalUrl, String shortenedUrl, ShortenedStatus status, Long clicks,
                LocalDateTime expiredAt,
                LocalDateTime createdAt, LocalDateTime lastAccessed, LocalDateTime statusModifiedAt) {

        public DetailsResponseDTO(Shortened shortened) {
                this(shortened.getOriginalUrl(),
                                ApiController.API_URL + "/" + shortened.getId(), shortened.getStatus(),
                                shortened.getClicks(), shortened.getExpiredAt(), shortened.getCreatedAt(),
                                shortened.getLastAccessed(),
                                shortened.getStatusModifiedAt());
        }

}
