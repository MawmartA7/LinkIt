package com.linkIt.api.domain.dtos.auth;

import com.linkIt.api.domain.models.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminRegisterDTO(
                @NotBlank(message = "The email must be filled in") @Email(message = "The email must follow the RFC 5322 format") String login,
                @NotBlank(message = "The email must be filled in") @Size(min = 4, message = "The password must be at least 5 characters long") String password,
                UserRole role) {

}
