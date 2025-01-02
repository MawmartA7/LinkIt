package com.linkIt.api.domain.exceptions.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.linkIt.api.domain.dtos.ErrorResponseDTO;
import com.linkIt.api.domain.exceptions.shortened.ShortenedAlreadyExistsException;
import com.linkIt.api.domain.exceptions.shortened.ShortenedNotFoundException;

@RestControllerAdvice
public class ShortenedExceptionHandler {

    @ExceptionHandler(ShortenedAlreadyExistsException.class)
    private ResponseEntity<?> handleShortenedAlreadyExistsException(ShortenedAlreadyExistsException exception,
            WebRequest request) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                new ErrorResponseDTO(HttpStatus.CONFLICT.value(), "SHORTENED_ALREADY_EXISTS", exception.getMessage()));
    }

    @ExceptionHandler(ShortenedNotFoundException.class)
    private ResponseEntity<?> handleShortenedNotFound(ShortenedNotFoundException exception, WebRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseDTO(HttpStatus.NOT_FOUND.value(), "SHORTENED_NOT_FOUND",
                        exception.getMessage()));
    }
}
