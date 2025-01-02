package com.linkIt.api.domain.dtos.shortened;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateShortenedRequestDTO(@NotBlank(message = "The url must be filled in") String url, String id,
        @NotBlank(message = "The alias must be filled in") @Size(max = 20, message = "The alias must have a maximum of 20 characters") String alias) {
}