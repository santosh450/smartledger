package com.smartledger.controller;

import com.smartledger.common.ApiResponse;
import com.smartledger.model.ForgotPasswordRequest;
import com.smartledger.model.LoginRequest;
import com.smartledger.model.RegisterUser;
import com.smartledger.service.RegisterUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class RegisterUserController {

        private final RegisterUserService registerUserService;

        @PostMapping("/register")
        public ResponseEntity<ApiResponse<RegisterUser>> registerUser(
                        @Valid @RequestBody RegisterUser user) {

                log.info("Registering user: {}", user.getUsername());

                RegisterUser savedUser = registerUserService.registerUser(user);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(ApiResponse.created(savedUser));
        }

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<String>> login(
                        @Valid @RequestBody LoginRequest request) {

                log.info("Login attempt for user: {}", request.getUsername());

                boolean authenticated = registerUserService.authenticate(
                                request.getUsername(),
                                request.getPassword());

                if (!authenticated) {
                        return ResponseEntity
                                        .status(HttpStatus.UNAUTHORIZED)
                                        .body(ApiResponse.error(401, "Invalid username or password"));
                }

                return ResponseEntity.ok(ApiResponse.success("Login successful"));
        }

        @PostMapping("/forgot-password")
        public ResponseEntity<ApiResponse<String>> forgotPassword(
                        @Valid @RequestBody ForgotPasswordRequest request) {

                log.info("Forgot password request for: {}", request.getEmailOrPhone());

                boolean accountExists = registerUserService.isUserRegistered(request.getEmailOrPhone());

                if (!accountExists) {
                        return ResponseEntity
                                        .status(HttpStatus.NOT_FOUND)
                                        .body(ApiResponse.error(404, "No account found"));
                }

                return ResponseEntity.ok(
                                ApiResponse.success("Password sent successfully"));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<RegisterUser>>> getAllUsers() {

                List<RegisterUser> users = registerUserService.getAllUsers();

                return ResponseEntity.ok(ApiResponse.success(users));
        }

        // ✅ Get By ID
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<RegisterUser>> getUserById(
                        @PathVariable Long id) {

                return registerUserService.getUserById(id)
                                .map(user -> ResponseEntity.ok(ApiResponse.success(user)))
                                .orElse(ResponseEntity
                                                .status(HttpStatus.NOT_FOUND)
                                                .body(ApiResponse.error(404, "User not found")));
        }

        // ✅ Update
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<RegisterUser>> updateUser(
                        @PathVariable Long id,
                        @Valid @RequestBody RegisterUser user) {

                return registerUserService.getUserById(id)
                                .map(existing -> {
                                        user.setId(id);
                                        RegisterUser updated = registerUserService.updateUser(user);
                                        return ResponseEntity.ok(ApiResponse.success(updated));
                                })
                                .orElse(ResponseEntity
                                                .status(HttpStatus.NOT_FOUND)
                                                .body(ApiResponse.error(404, "User not found")));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
                return registerUserService.getUserById(id)
                                .map(user -> {
                                        registerUserService.deleteUser(id);
                                        return ResponseEntity.noContent().<Void>build();
                                })
                                .orElseGet(() -> ResponseEntity.notFound().<Void>build());
        }
}
