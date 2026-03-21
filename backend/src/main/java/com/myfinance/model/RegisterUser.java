package com.myfinance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "register_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "First name is required")
  @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
  @Column(name = "first_name", nullable = false, length = 50)
  private String firstName;

  @Size(max = 50, message = "Last name must be less than 50 characters")
  @Column(name = "last_name", length = 50)
  private String lastName;

  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
  @Column(name = "username", unique = true, nullable = false, length = 20)
  private String username;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password must be at least 8 characters")
  @Column(name = "password", nullable = false, length = 255)
  private String password;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  @Column(name = "email", unique = true, nullable = false, length = 255)
  private String email;

  @NotBlank(message = "Phone number is required")
  @Pattern(regexp = "^[1-9][0-9]{9}$", message = "Phone number must be 10 digits and cannot start with 0")
  @Column(name = "phone", nullable = false, length = 10)
  private String phone;
}
