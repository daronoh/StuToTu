package com.orbital.stutotu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbital.stutotu.model.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    boolean existsByUsername(String username);
}
