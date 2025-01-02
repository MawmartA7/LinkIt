package com.linkIt.api.domain.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RecoveryPasswordDTO(@NotBlank(message = "The token must be filled in") String token,
                @NotBlank(message = "The email must be filled in") @Size(min = 4, message = "The password must be at least 5 characters long") String password) {
}