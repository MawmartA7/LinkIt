package com.linkIt.api.domain.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.linkIt.api.domain.models.enums.ShortenedStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "shorteneds")
public class Shortened {

    @Id
    private String id;

    private String owner;

    @Field(name = "original_url")
    private String originalUrl;

    private String alias;

    private ShortenedStatus status;

    private Long clicks;

    @Field(name = "expired_at")
    private LocalDateTime expiredAt;

    @Field(name = "created_at")
    private LocalDateTime createdAt;

    @Field(name = "status_modified_at")
    private LocalDateTime statusModifiedAt;

    @Field(name = "last_accessed")
    private LocalDateTime lastAccessed;

    public Shortened(String id, String owner, String originalUrl, String alias, int expirationInHours) {
        this.id = id;
        this.owner = owner;
        this.originalUrl = originalUrl;
        this.alias = alias;
        this.status = ShortenedStatus.available;
        this.clicks = 0L;
        this.expiredAt = LocalDateTime.now().plusHours(expirationInHours);
        this.createdAt = LocalDateTime.now();
        this.statusModifiedAt = null;
        this.lastAccessed = null;
    }

}
