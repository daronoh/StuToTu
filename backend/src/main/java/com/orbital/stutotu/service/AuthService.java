package com.orbital.stutotu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository registrationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to authenticate user credentials
    public boolean authenticate(String username, String password) {
        Profile user = registrationRepository.findByUsername(username);
        if (user != null) {
            // Check if the provided password matches the hashed password stored in the database
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false; // User not found
    }

}