package com.linkIt.api.domain.dtos.contact;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MailDTO(
        @NotBlank(message = "The name must be filled in") @Size(max = 50, message = "The name must have a maximum of 50 characters") @Size(min = 3, message = "The name must be at least 3 characters") String name,
        @NotBlank(message = "The subject must be filled in") String subject,
        @NotBlank(message = "The message must be filled in") @Size(max = 250, message = "The message must have a maximum of 250 characters") @Size(min = 10, message = "The message must be at least 10 characters") String message,
        String token) {

}
