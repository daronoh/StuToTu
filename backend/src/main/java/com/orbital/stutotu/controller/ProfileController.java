package com.orbital.stutotu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.exception.ResourceNotFoundException;
import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.repository.UserRepository;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    // GET profile by username
    @GetMapping("/{username}")
    public ResponseEntity<Profile> getProfileByUsername(@PathVariable String username) {
        try {
            Profile profile = userRepository.findByUsername(username);
            if (profile == null) {
                throw new ResourceNotFoundException("Profile not found with username: " + username);
            }
            return ResponseEntity.ok(profile);
        } catch (Exception ex) {
            throw new ResourceNotFoundException("Profile not found with username: " + username, ex);
        }
    }

    // Update profile information
    @PutMapping("/{username}")
    public ResponseEntity<Profile> updateProfile(@PathVariable String username, @RequestBody Profile profileDetails) {
        Profile profile = userRepository.findByUsername(username);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile not found with username: " + username);
        }

            // Update profile fields
            profile.setFirstName(profileDetails.getFirstName());
            profile.setLastName(profileDetails.getLastName());
            profile.setEmail(profileDetails.getEmail());
            profile.setGender(profileDetails.getGender());
            profile.setProfilePicture(profileDetails.getProfilePicture());
            profile.setDescription(profileDetails.getDescription());

            // Save updated profile
            Profile updatedProfile = userRepository.save(profile);
            return ResponseEntity.ok(updatedProfile);
    }
}
