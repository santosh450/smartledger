package com.yourapp.service;

import com.yourapp.model.RegisterUser;
import com.yourapp.repository.RegisterUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisterUserService {

  @Autowired
  private RegisterUserDao registerUserDao;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public RegisterUser registerUser(RegisterUser user) {
    // Check if username or email already exists
    if (registerUserDao.existsByUsername(user.getUsername())) {
      throw new RuntimeException("Username already exists");
    }
    if (registerUserDao.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    // Encode password
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    return registerUserDao.save(user);
  }

  public Optional<RegisterUser> findByUsername(String username) {
    return registerUserDao.findByUsername(username);
  }

  public Optional<RegisterUser> findByEmail(String email) {
    return registerUserDao.findByEmail(email);
  }

  public List<RegisterUser> getAllUsers() {
    return registerUserDao.findAll();
  }

  public Optional<RegisterUser> getUserById(Long id) {
    return registerUserDao.findById(id);
  }

  public RegisterUser updateUser(RegisterUser user) {
    return registerUserDao.save(user);
  }

  public void deleteUser(Long id) {
    registerUserDao.deleteById(id);
  }
}