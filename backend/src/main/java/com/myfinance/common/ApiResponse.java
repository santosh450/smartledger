package com.myfinance.common;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;

    // ✅ Success
    public static <T> ApiResponse<T> success(T data) {
        return success(200, "Success", data);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return success(200, message, data);
    }

    public static <T> ApiResponse<T> success(int status, String message, T data) {
        return ApiResponse.<T>builder()
                .status(status)
                .message(message)
                .data(data)
                .build();
    }

    // ✅ Created
    public static <T> ApiResponse<T> created(T data) {
        return success(201, "Created", data);
    }

    // ❌ Error
    public static <T> ApiResponse<T> error(int status, String message) {
        return ApiResponse.<T>builder()
                .status(status)
                .message(message)
                .data(null)
                .build();
    }

    // ⚠️ Validation Error
    public static ApiResponse<Map<String, String>> validationError(Map<String, String> errors) {
        return ApiResponse.<Map<String, String>>builder()
                .status(400)
                .message("Validation failed")
                .data(errors)
                .build();
    }

    // 📭 No Content
    public static <T> ApiResponse<T> noContent() {
        return ApiResponse.<T>builder()
                .status(204)
                .message("No Content")
                .data(null)
                .build();
    }

}
