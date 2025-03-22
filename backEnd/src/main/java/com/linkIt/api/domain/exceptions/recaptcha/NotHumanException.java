package com.linkIt.api.domain.exceptions.recaptcha;

public class NotHumanException extends RuntimeException {
    public NotHumanException() {
        super("Automated behavior detected");
    }

    public NotHumanException(String message) {
        super(message);
    }
}
