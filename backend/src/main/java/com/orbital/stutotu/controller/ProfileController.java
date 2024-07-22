package com.orbital.stutotu.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.orbital.stutotu.dto.ProfileEditDTO;
import com.orbital.stutotu.exception.ResourceNotFoundException;
import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.model.Review;
import com.orbital.stutotu.model.Tag;
import com.orbital.stutotu.repository.UserRepository;
import com.orbital.stutotu.service.MyUserDetailsService;


@Validated
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyUserDetailsService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Profile>> searchTutorProfiles(@RequestParam String query) {
        List<Profile> profiles = userService.searchTutorProfiles(query);
        return ResponseEntity.ok(profiles);
    }

    // GET profile by username
    @GetMapping("/{username}")
    public ResponseEntity<Profile> getProfileByUsername(@PathVariable String username) {
        System.out.println("getting profile");
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
    @PutMapping("/edit/{username}")
    public ResponseEntity<Profile> updateProfile(@PathVariable String username, @Valid @RequestBody ProfileEditDTO profileDetails) {
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
            profile.setSubjects(profileDetails.getSubjects());
            profile.setEducationLevel(profileDetails.getEducationLevel());
            profile.setLocation(profileDetails.getLocation());
            profile.setRate(profileDetails.getRate());

            List<String> profileTags = profileDetails.getTags();
            for (Tag t : profile.getTags()) {
                if (profileTags.contains(t.getName())) {
                    t.addToProfile();
                } else {
                    t.removeFromProfile();
                }
            }

            // Add "other" tags
            for (String tagName : profileTags) {
                profile.addTag(tagName);
            }

            // Save updated profile
            Profile updatedProfile = userRepository.save(profile);
            return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Profile>> filterProfiles(
            @RequestParam(required = false) List<String> subjects,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String educationLevel,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer rate) {

                List<Profile> filteredProfiles = userRepository.findByFilters(
                    subjects,
                    gender,
                    educationLevel,
                    location,
                    rate
            );
        return ResponseEntity.ok(filteredProfiles);
    }

    @PostMapping("/review")
    public ResponseEntity<Profile> leaveReview(@RequestBody Review review) {
        try {
            Profile reviewFor = userRepository.findByUsername(review.getReviewFor());
            if (reviewFor == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
            reviewFor.leaveReview(review);
            Profile updatedProfile = userRepository.save(reviewFor);

            return ResponseEntity.ok(updatedProfile);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }
}

