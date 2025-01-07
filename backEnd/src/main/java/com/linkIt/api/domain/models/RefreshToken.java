package com.linkIt.api.domain.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "RefreshTokens")
public class RefreshToken {

    private UUID id;

    private String token;

    private LocalDateTime expiresAt;

    public RefreshToken(String token, LocalDateTime expiresAt) {
        this.id = UUID.randomUUID();
        this.token = token;
        this.expiresAt = expiresAt;
    }

}
