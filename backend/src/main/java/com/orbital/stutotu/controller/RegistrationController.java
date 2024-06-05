package com.orbital.stutotu.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Registration user) {

        if (registrationRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        logger.info("Received username: {}", user.getUsername());
        logger.info("Received password: {}", user.getPassword());
        // Your registration logic here
        Registration registration = new Registration();
        registration.setUsername(user.getUsername());
        registration.setPassword(user.getPassword());

        registrationRepository.save(registration);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}