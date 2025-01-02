package com.linkIt.api.domain.exceptions.auth;

public class SendConfirmationMailException extends RuntimeException {

    public SendConfirmationMailException(String message) {
        super(message);
    }

}
