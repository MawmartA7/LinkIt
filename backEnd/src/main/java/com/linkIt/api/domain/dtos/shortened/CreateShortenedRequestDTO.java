package com.linkIt.api.domain.dtos.shortened;

import com.linkIt.api.domain.validations.NotSpecialChars;
import com.linkIt.api.domain.validations.ValidUrlToShorten;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateShortenedRequestDTO(@NotBlank(message = "The url must be filled in") @ValidUrlToShorten String url,
                @NotSpecialChars String id,
                @NotBlank(message = "The alias must be filled in") @Size(max = 20, message = "The alias must have a maximum of 20 characters") @Size(min = 5, message = "The alias must have a minimum of 5 characters") String alias) {
}