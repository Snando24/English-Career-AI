package com.englishcareer.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Global exception handler for REST API
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex,
            WebRequest request) {
        log.error("Resource not found: {}", ex.getMessage());

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("NOT_FOUND")
                .code(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceAlreadyExistsException(
            ResourceAlreadyExistsException ex,
            WebRequest request) {
        log.error("Resource already exists: {}", ex.getMessage());

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("CONFLICT")
                .code(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInputException(
            InvalidInputException ex,
            WebRequest request) {
        log.error("Invalid input: {}", ex.getMessage());

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("BAD_REQUEST")
                .code(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(
            BadCredentialsException ex,
            WebRequest request) {
        log.error("Bad credentials: {}", ex.getMessage());

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("UNAUTHORIZED")
                .code(HttpStatus.UNAUTHORIZED.value())
                .message("Invalid email or password")
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request) {
        log.error("Validation error: {}", ex.getMessage());

        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) ->
                errors.add(error.getDefaultMessage())
        );

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("BAD_REQUEST")
                .code(HttpStatus.BAD_REQUEST.value())
                .message("Validation failed")
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .errors(errors)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex,
            WebRequest request) {
        log.error("Unexpected error: ", ex);

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("INTERNAL_SERVER_ERROR")
                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected error occurred")
                .path(request.getDescription(false).replace("uri=", ""))
                .timestamp(LocalDateTime.now())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
