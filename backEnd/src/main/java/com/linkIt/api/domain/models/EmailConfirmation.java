package com.linkIt.api.domain.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "email-confirmation")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmailConfirmation {

    @Id
    private String id = UUID.randomUUID().toString();

    private String email;

    private User user;

    private LocalDateTime expiresAt;

    public EmailConfirmation(String email) {
        this.email = email;
        this.expiresAt = LocalDateTime.now().plusMinutes(1);
    }

    public EmailConfirmation(String id, String email) {
        this.id = id;
        this.email = email;
        this.expiresAt = LocalDateTime.now().plusMinutes(1);
    }

    public EmailConfirmation(String id, String email, User user) {
        this.id = id;
        this.email = email;
        this.user = user;
        this.expiresAt = LocalDateTime.now().plusMinutes(1);
    }
}
