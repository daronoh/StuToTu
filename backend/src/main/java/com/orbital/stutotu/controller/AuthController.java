package com.orbital.stutotu.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.orbital.stutotu.dto.LoginRequest;
import com.orbital.stutotu.security.JwtUtil;
import com.orbital.stutotu.service.AuthService;

// @CrossOrigin(origins = "https://stutotu.netlify.app/")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Validate login credentials
            boolean isAuthenticated = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            if (isAuthenticated) {
                String token = jwtUtil.generateToken(loginRequest.getUsername());
                Map<String, String> response = new HashMap<>();
                response.put("accessToken", token);
                return ResponseEntity.ok(response); // Successful authentication
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Unauthorized
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
        }
    }
}