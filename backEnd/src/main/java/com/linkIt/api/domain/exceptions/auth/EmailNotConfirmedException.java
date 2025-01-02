package com.linkIt.api.domain.exceptions.auth;

public class EmailNotConfirmedException extends RuntimeException {

    public EmailNotConfirmedException(String message) {
        super(message);
    }

}
