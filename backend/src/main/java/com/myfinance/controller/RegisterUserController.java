package com.myfinance.controller;

import com.myfinance.model.LoginRequest;
import com.myfinance.model.ForgotPasswordRequest;
import com.myfinance.model.RegisterUser;
import com.myfinance.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class RegisterUserController {

  @Autowired
  private RegisterUserService registerUserService;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUser user) {
    try {
      RegisterUser savedUser = registerUserService.registerUser(user);
      return ResponseEntity.ok(savedUser);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(
      @Valid @RequestBody LoginRequest request,
      BindingResult result) {

    if (result.hasErrors()) {
      return ResponseEntity
          .badRequest()
          .body(result.getAllErrors().get(0).getDefaultMessage());
    }
    boolean authenticated = registerUserService.authenticate(request.getUsername(), request.getPassword());
    if (authenticated) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgotPassword(
      @Valid @RequestBody ForgotPasswordRequest request,
      BindingResult result) {

    if (result.hasErrors()) {
      return ResponseEntity
          .badRequest()
          .body(result.getAllErrors().get(0).getDefaultMessage());
    }

    boolean accountExists = registerUserService
        .isUserRegistered(request.getEmailOrPhone());

    if (accountExists) {
      return ResponseEntity.ok("Password sent successfully.");
    }

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body("No account found with provided email or phone.");
  }

  @GetMapping
  public ResponseEntity<List<RegisterUser>> getAllUsers() {
    List<RegisterUser> users = registerUserService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable Long id) {
    return registerUserService.getUserById(id)
        .map(user -> ResponseEntity.ok(user))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody RegisterUser user) {
    return registerUserService.getUserById(id)
        .map(existingUser -> {
          user.setId(id);
          RegisterUser updatedUser = registerUserService.updateUser(user);
          return ResponseEntity.ok(updatedUser);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    if (registerUserService.getUserById(id).isPresent()) {
      registerUserService.deleteUser(id);
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
