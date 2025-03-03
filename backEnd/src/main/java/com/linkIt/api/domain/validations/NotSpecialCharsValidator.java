package com.linkIt.api.domain.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotSpecialCharsValidator implements ConstraintValidator<NotSpecialChars, String> {

    private static final String FORBIDDEN_CHARS_REGEX = "[\" <>#%{}|\\\\^`\\[\\]\\n\\r\\t]";
    private static final String[] SPECIAL_CHARS = { "?", "/", "&", "=", "+", ":", ";", "@" };

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }

        if (value.matches(FORBIDDEN_CHARS_REGEX)) {
            return false;
        }

        for (String charStr : SPECIAL_CHARS) {
            if (value.contains(charStr)) {
                return false;
            }
        }

        return true;
    }
}
