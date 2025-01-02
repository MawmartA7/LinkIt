package com.linkIt.api.domain.dtos.shortened;

import java.time.LocalDateTime;

import com.linkIt.api.domain.models.enums.ShortenedStatus;
import com.linkIt.api.domain.models.Shortened;

public record SimpleShortenedDetailsDTO(String alias, ShortenedStatus status, Long clicks,
        LocalDateTime expiredAt) {

    public SimpleShortenedDetailsDTO(Shortened shortened) {
        this(shortened.getAlias(), shortened.getStatus(), shortened.getClicks(), shortened.getExpiredAt());
    }

}
