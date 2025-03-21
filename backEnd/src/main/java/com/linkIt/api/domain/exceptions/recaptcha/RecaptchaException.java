package com.linkIt.api.domain.exceptions.recaptcha;

public class RecaptchaException extends RuntimeException {
    public RecaptchaException() {
        super("An error occurred while verifying the reCAPTCHA token");
    }

    public RecaptchaException(String message) {
        super(message);
    }

}
