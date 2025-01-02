package com.linkIt.api.domain.exceptions.auth;

public class TokenException extends RuntimeException {

    public TokenException(String message) {
        super(message);
    }

}
