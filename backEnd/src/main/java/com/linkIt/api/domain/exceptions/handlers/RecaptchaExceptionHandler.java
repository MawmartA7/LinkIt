package com.linkIt.api.domain.exceptions.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.linkIt.api.domain.dtos.ErrorResponseDTO;
import com.linkIt.api.domain.exceptions.recaptcha.NotHumanException;
import com.linkIt.api.domain.exceptions.recaptcha.RecaptchaException;

@RestControllerAdvice
public class RecaptchaExceptionHandler {

        @ExceptionHandler(RecaptchaException.class)
        private ResponseEntity<?> handleRecaptchaException(RecaptchaException exception,
                        WebRequest request) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                new ErrorResponseDTO(HttpStatus.BAD_REQUEST.value(), "RECAPTCHA_ERROR",
                                                exception.getMessage()));
        }

        @ExceptionHandler(NotHumanException.class)
        private ResponseEntity<?> handleNotHumanException(NotHumanException exception, WebRequest request) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(new ErrorResponseDTO(HttpStatus.FORBIDDEN.value(), "BOT_DETECTED",
                                                exception.getMessage()));
        }

}