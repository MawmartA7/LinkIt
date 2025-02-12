package com.linkIt.api.domain.exceptions.shortened;

public class ShortenedAlreadyExistsException extends RuntimeException {
    public ShortenedAlreadyExistsException() {
        super("Shortened already exists with the same alias");
    }
}
