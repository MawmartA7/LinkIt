package com.linkIt.api.domain.validations;

import java.net.URI;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class UrlValidator implements ConstraintValidator<ValidUrlToShorten, String> {

    @Value("${api.url}")
    private String API_HOST;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }

        try {
            URL url = URI.create(value).toURL();
            String tld = url.getHost().substring(url.getHost().lastIndexOf('.') + 1);

            // Valida se o TLD tem pelo menos 2 caracteres
            if (tld.length() < 2) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("The URL's TLD must be at least 2 chars long")
                        .addConstraintViolation();
                return false;
            }

            // Valida se o protocolo é HTTP ou HTTPS
            if (!url.getProtocol().equals("http") && !url.getProtocol().equals("https")) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("You cannot shorten a URL with this protocol")
                        .addConstraintViolation();
                return false;
            }

            // Valida se a URL pertence ao mesmo domínio da API
            if (url.getHost().equals(new URI(API_HOST).toURL().getHost())) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("URL shortening not allowed for this domain")
                        .addConstraintViolation();
                return false;
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
