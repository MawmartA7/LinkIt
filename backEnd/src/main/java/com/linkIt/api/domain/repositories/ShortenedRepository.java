package com.linkIt.api.domain.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import com.linkIt.api.domain.models.Shortened;
import com.linkIt.api.domain.models.enums.ShortenedStatus;

public interface ShortenedRepository extends MongoRepository<Shortened, String> {

    Optional<Shortened> findByAliasAndOwner(String alias, String owner);

    boolean existsByAliasAndOwner(String alias, String owner);

    void deleteByAliasAndOwner(String alias, String owner);

    @NonNull
    Page<Shortened> findAll(@NonNull Pageable pageable);

    Page<Shortened> findAllByOwner(String owner, PageRequest pageable);

    Page<Shortened> findAllByOwnerAndStatus(String owner, ShortenedStatus status, PageRequest pageable);

    Page<Shortened> findAllByOwnerAndStatusNot(String owner, ShortenedStatus status, PageRequest pageable);

    Page<Shortened> findAllByOwnerAndAliasContaining(String owner, String alias, PageRequest pageable);

    Page<Shortened> findAllByOwnerAndAliasContainingAndStatus(String owner, String alias, ShortenedStatus status,
            PageRequest pageable);

    Page<Shortened> findAllByOwnerAndAliasContainingAndStatusNot(String owner, String alias, ShortenedStatus status,
            PageRequest pageable);

}
