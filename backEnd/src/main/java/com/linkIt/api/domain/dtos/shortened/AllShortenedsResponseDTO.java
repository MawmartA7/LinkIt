package com.linkIt.api.domain.dtos.shortened;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.linkIt.api.domain.models.Shortened;

public record AllShortenedsResponseDTO(long totalCount,
        List<SimpleShortenedDetailsDTO> shorteneds) {

    public AllShortenedsResponseDTO(Page<Shortened> shorteneds) {
        this(shorteneds.getTotalElements(),
                shorteneds.getContent().stream().map(SimpleShortenedDetailsDTO::new).collect(Collectors.toList()));
    }

}
