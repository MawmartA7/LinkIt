package com.linkIt.api.domain.exceptions.handlers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.linkIt.api.domain.exceptions.ValidationErrorMessageDTO;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@NonNull MethodArgumentNotValidException ex,
            @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, @NonNull WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {

            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        ValidationErrorMessageDTO errorMessage = new ValidationErrorMessageDTO(HttpStatus.BAD_REQUEST.value(),
                "INVALID_VALUES", errors);

        return ResponseEntity.badRequest().body(errorMessage);
    }

    // @ExceptionHandler(Exception.class)
    // private ResponseEntity<?> handleGlobalException(Exception exception,
    // WebRequest request) {
    // return ResponseEntity.badRequest()
    // .body(new ErrorResponse(
    // "An internal error has occurred, please try again. If the error persists,
    // please contact us.",
    // "INTERNAL_SERVER_ERROR"));
    // }

}
