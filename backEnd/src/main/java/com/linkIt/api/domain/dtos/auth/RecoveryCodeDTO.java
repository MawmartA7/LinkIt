package com.linkIt.api.domain.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RecoveryCodeDTO(@NotBlank(message = "The code must be filled in") @Size(min = 5, max = 5) String code) {
}