package com.linkIt.api.domain.validations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = NotSpecialCharsValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface NotSpecialChars {
    String message() default "The ID cannot contain special characters";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
