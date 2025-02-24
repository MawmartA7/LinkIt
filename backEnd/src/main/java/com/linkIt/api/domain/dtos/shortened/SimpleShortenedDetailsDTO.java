package com.linkIt.api.domain.dtos.shortened;

import java.time.ZoneOffset;

import com.linkIt.api.application.controller.ApiController;
import com.linkIt.api.domain.models.Shortened;
import com.linkIt.api.domain.services.UrlService;

public record SimpleShortenedDetailsDTO(String alias, String shortenedUrl, String originalDomain, Long clicks,
        long expiredAt) {

    public SimpleShortenedDetailsDTO(Shortened shortened) {
        this(shortened.getAlias(), ApiController.API_URL + "/" + shortened.getId(),
                UrlService.getDomainFromUrl(shortened.getOriginalUrl()), shortened.getClicks(),
                shortened.getExpiredAt().toInstant(ZoneOffset.of("-03:00")).toEpochMilli());
    }

}
