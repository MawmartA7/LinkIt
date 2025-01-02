package com.linkIt.api.domain.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.linkIt.api.domain.models.User;

public interface UserRepository extends MongoRepository<User, UUID> {

    UserDetails findByLogin(String login);

    boolean existsByLogin(String login);

}
