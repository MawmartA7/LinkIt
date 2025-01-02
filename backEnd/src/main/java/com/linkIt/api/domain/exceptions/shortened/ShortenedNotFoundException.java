package com.linkIt.api.domain.exceptions.shortened;

public class ShortenedNotFoundException extends RuntimeException {

    public ShortenedNotFoundException() {
        super("Shortened not found");
    }
}