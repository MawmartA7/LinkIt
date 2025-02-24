package com.linkIt.api.domain.dtos.shortened;

import org.springframework.data.domain.Sort.Direction;

import com.linkIt.api.domain.models.enums.ShortenedSortable;

public record ShortenedSortDTO(ShortenedSortable orderBy, Direction direction) {
}
