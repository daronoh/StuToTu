package com.orbital.stutotu.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.dto.ProfileEditDTO;
import com.orbital.stutotu.exception.ResourceNotFoundException;
import com.orbital.stutotu.model.Profile;
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
            List<Tag> profileTags = profile.getTags();
            for (Tag t : profileTags) {
                if (profileDetails.getTags().contains(t.getName())) {
                    t.addToProfile();
                } else {
                    t.removeFromProfile();
                }
            }


            // Save updated profile
            Profile updatedProfile = userRepository.save(profile);
            return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Profile>> filterProfiles(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String educationLevel,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer rate) {

                System.out.println("Filtering...");
                System.out.println("Gender: " + gender);
                System.out.println("Education Level: " + educationLevel);
                System.out.println("Location: " + location);
                System.out.println("Rate: " + rate);

        List<Profile> filteredProfiles = userRepository.findByFilters(
                gender, educationLevel, location, rate);
        return ResponseEntity.ok(filteredProfiles);
    }

}

/* 

    @PostMapping("/addTag")
    public ResponseEntity<?> addTag(@RequestParam Long profileId, @RequestParam String tag, @RequestParam String type) {
        Optional<Profile> profileOpt = userRepository.findById(profileId);
        if (profileOpt.isPresent()) {
            Profile profile = profileOpt.get();

            profile.getTags().add(tag);
            userRepository.save(profile);

            tagRepository.save(new Tag());

            return ResponseEntity.ok("Tag added successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/validateTag")
    public ResponseEntity<?> validateTag(@RequestParam Long tagId, @RequestParam boolean validated) {
        Optional<Tag> tagOpt = tagRepository.findById(tagId);
            if (tagOpt.isPresent()) {
                Tag tag = tagOpt.get();
                
                // Set the validation status of the tag
                tag.setValidated(validated);
                tagRepository.save(tag);
                
                return ResponseEntity.ok("Tag validation status updated");
            } else {
                return ResponseEntity.notFound().build();
            }
        }

}

*/

