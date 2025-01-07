package com.linkIt.api.domain.dtos.auth;

import jakarta.validation.constraints.NotBlank;

public record TokenDTO(@NotBlank(message = "The token must be filled in") String token) {

}
