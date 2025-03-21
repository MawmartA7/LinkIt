package com.linkIt.api.domain.exceptions.recaptcha;

public class NotHumanException extends RuntimeException {
    public NotHumanException() {
        super("Invalid reCAPTCHA token");
    }

    public NotHumanException(String message) {
        super(message);
    }
}
