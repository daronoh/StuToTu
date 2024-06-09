package com.orbital.stutotu;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.repository.UserRepository;

@SpringBootTest
public class UserRegistrationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testUserRegistration() {
        Profile user = new Profile("testuser", passwordEncoder.encode("password123"));
        userRepository.save(user);

        Profile foundUser = userRepository.findByUsername("testuser");
        assertTrue(foundUser != null && passwordEncoder.matches("password123", foundUser.getPassword()));
    }
}