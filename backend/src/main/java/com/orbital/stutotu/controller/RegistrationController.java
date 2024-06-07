package com.orbital.stutotu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.model.Registration;
import com.orbital.stutotu.repository.RegistrationRepository;

// @CrossOrigin(origins = "https://stutotu.netlify.app/")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Registration user) {

        if (registrationRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        Registration registration = new Registration();
        registration.setUsername(user.getUsername());
        registration.setPassword(user.getPassword());

        registrationRepository.save(registration);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}