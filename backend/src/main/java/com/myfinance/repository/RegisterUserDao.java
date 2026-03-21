package com.myfinance.repository;

import com.myfinance.model.RegisterUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterUserDao extends JpaRepository<RegisterUser, Long> {

  Optional<RegisterUser> findByUsername(String username);

  Optional<RegisterUser> findByEmail(String email);

  Optional<RegisterUser> findByPhone(String phone);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  boolean existsByPhone(String phone);
}