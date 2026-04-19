package com.smartledger.service;

import com.smartledger.model.RegisterUser;
import com.smartledger.repository.RegisterUserDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterUserService {

    private final RegisterUserDao registerUserDao;

    public RegisterUser registerUser(RegisterUser user) {

        log.info("Registering user: {}", user.getUsername());

        // Check if username or email already exists
        if (registerUserDao.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (registerUserDao.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return registerUserDao.save(user);
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

    public boolean authenticate(String username, String password) {
        log.info("Authenticating user: {}", username);

        return registerUserDao
                .findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .isPresent();
    }

    public boolean isUserRegistered(String phoneOrEmail) {
        return registerUserDao.existsByEmail(phoneOrEmail.toLowerCase()) || registerUserDao.existsByPhone(phoneOrEmail);
    }
}