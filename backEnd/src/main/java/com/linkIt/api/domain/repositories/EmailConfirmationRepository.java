package com.linkIt.api.domain.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.linkIt.api.domain.models.EmailConfirmation;

public interface EmailConfirmationRepository extends MongoRepository<EmailConfirmation, String> {

    Optional<EmailConfirmation> findByEmail(String email);

    void deleteByEmail(String email);

    void deleteAllByEmail(String email);

}
