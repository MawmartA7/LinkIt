package com.linkIt.api.domain.exceptions.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.linkIt.api.domain.dtos.ErrorResponseDTO;
import com.linkIt.api.domain.exceptions.auth.EmailConfirmException;
import com.linkIt.api.domain.exceptions.auth.EmailNotConfirmedException;
import com.linkIt.api.domain.exceptions.auth.RecoveryPasswordException;
import com.linkIt.api.domain.exceptions.auth.SendConfirmationMailException;
import com.linkIt.api.domain.exceptions.auth.TokenException;
import com.linkIt.api.domain.exceptions.auth.UserAlreadyExistsException;
import com.linkIt.api.domain.exceptions.auth.UserNotFoundException;

@RestControllerAdvice
public class AuthExceptionHandler {

        @ExceptionHandler(UserAlreadyExistsException.class)
        private ResponseEntity<?> handleUserAlreadyExists(UserAlreadyExistsException exception, WebRequest request) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ErrorResponseDTO(HttpStatus.CONFLICT.value(), "USER_ALREADY_EXISTS",
                                                exception.getMessage()));
        }

        @ExceptionHandler(UserNotFoundException.class)
        private ResponseEntity<?> handleUserNotFoundException(UserNotFoundException exception,
                        WebRequest request) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new ErrorResponseDTO(HttpStatus.NOT_FOUND.value(),
                                                "USER_NOT_FOUND",
                                                exception.getMessage()));
        }

        @ExceptionHandler(TokenException.class)
        private ResponseEntity<?> handleTokenException(TokenException exception, WebRequest request) {
                String code = "TOKEN_EXPIRED";
                if (!exception.getMessage().equals("Token expired")) {
                        code = "INVALID TOKEN";
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(new ErrorResponseDTO(HttpStatus.UNAUTHORIZED.value(), code,
                                                exception.getMessage()));
        }

        @ExceptionHandler(EmailConfirmException.class)
        private ResponseEntity<?> handleEmailConfirmException(EmailConfirmException exception, WebRequest request) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new ErrorResponseDTO(HttpStatus.NOT_FOUND.value(), "EMAIL_NOT_FOUND",
                                                exception.getMessage()));
        }

        @ExceptionHandler(EmailNotConfirmedException.class)
        private ResponseEntity<?> handleEmailNotConfirmedException(EmailNotConfirmedException exception,
                        WebRequest request) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(new ErrorResponseDTO(HttpStatus.FORBIDDEN.value(), "EMAIL_NOT_CONFIRMED",
                                                exception.getMessage()));
        }

        @ExceptionHandler(SendConfirmationMailException.class)
        private ResponseEntity<?> handleSendConfirmationMailException(SendConfirmationMailException exception,
                        WebRequest request) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ErrorResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                                "SEND_MAIL_CONFIRMATION_ERROR",
                                                exception.getMessage()));
        }

        @ExceptionHandler(RecoveryPasswordException.class)
        private ResponseEntity<?> handleRecoveryPasswordException(RecoveryPasswordException exception,
                        WebRequest request) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(new ErrorResponseDTO(HttpStatus.BAD_REQUEST.value(),
                                                "RECOVERY_ERROR",
                                                exception.getMessage()));
        }

}