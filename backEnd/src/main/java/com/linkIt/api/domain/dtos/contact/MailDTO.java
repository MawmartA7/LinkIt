package com.linkIt.api.domain.dtos.contact;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MailDTO(@NotBlank(message = "The name must be filled in") String name,
                @NotBlank(message = "The subject must be filled in") String subject,
                @NotBlank(message = "The message must be filled in") @Size(max = 250, message = "The message must have a maximum of 250 characters") String message,
                String token) {

}
