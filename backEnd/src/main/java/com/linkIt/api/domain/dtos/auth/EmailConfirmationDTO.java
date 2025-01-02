package com.linkIt.api.domain.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailConfirmationDTO(String id,
                @NotBlank(message = "The email must be filled in") @Email(message = "The email must follow the RFC 5322 format") String email) {

}
