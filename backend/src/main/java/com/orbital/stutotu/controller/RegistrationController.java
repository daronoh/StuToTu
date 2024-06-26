package com.orbital.stutotu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.repository.UserRepository;

// @CrossOrigin(origins = "https://stutotu.netlify.app/")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Profile user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        } else if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        Profile saveUser;
        
        switch (user.getRole()) {
            case "STUDENT" -> saveUser = Profile.createStudentProfile(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getFirstName(),
                        user.getLastName(), user.getEmail(), user.getGender());
            case "TUTOR" -> saveUser = Profile.createTutorProfile(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getFirstName(),
                        user.getLastName(), user.getEmail(), user.getGender(), user.getSubjects(), user.getEducationLevel(), user.getLocation(), user.getRate());
            default -> {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("ERROR");
            }
        }
        

        userRepository.save(saveUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}