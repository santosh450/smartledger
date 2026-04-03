package com.myfinance.exception;

import com.myfinance.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 🔥 1. Handle Generic Exception (LAST fallback)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception ex) {

        log.error("Unexpected error occurred", ex);

        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    // 🔥 2. Handle Bad Request
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<?>> handleBadRequest(Exception ex) {

        log.warn("Bad request: {}", ex.getMessage());

        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 🔥 3. Handle Validation Errors (IMPORTANT)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.validationError(errors));
    }

    // 🔥 4. Custom Exception (Recommended)
//        @ExceptionHandler(ResourceNotFoundException.class)
//        public ResponseEntity<ApiResponse<?>> handleNotFound(ResourceNotFoundException ex) {
//
//            return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
//        }

    // 🔥 Common Builder Method (DRY)
    private ResponseEntity<ApiResponse<?>> buildResponse(HttpStatus status, String message) {
        return ResponseEntity
                .status(status)
                .body(ApiResponse.error(status.value(), message));
    }
}

