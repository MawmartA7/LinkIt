package com.linkIt.api.domain.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.linkIt.api.domain.models.RefreshToken;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, UUID> {

    boolean existsByToken(String refreshToken);

}
