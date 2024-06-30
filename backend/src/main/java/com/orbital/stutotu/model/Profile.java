package com.orbital.stutotu.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private String gender;

    private String profilePicture;
    
    @ElementCollection
    private List<String> subjects;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;  

    private String educationLevel;

    private String location;

    @Column
    private int rate;

    private String role;

    @JsonIgnoreProperties("friends")
    @ManyToMany
    private List<Profile> friends; 

    @JsonIgnoreProperties("pendingRequests")
    @ManyToMany
    private List<Profile> pendingRequests; 

    public Profile(String username, String password, String firstName, String lastName, String email, String gender, String role) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.rate = 0;
        this.role = role;
        this.friends = new ArrayList<>();
        this.pendingRequests = new ArrayList<>();
    }

    public Profile(String username, String password, String firstName, String lastName, String email, String gender, List<String> subjects,
        String educationLevel, String location, int rate, String role) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.subjects = subjects;
        this.educationLevel = educationLevel;
        this.location = location;
        this.rate = rate;
        this.role = role;
        this.friends = new ArrayList<>();
        this.pendingRequests = new ArrayList<>();
    }

    // Factory methods for creating specific roles
    public static Profile createStudentProfile(String username, String password, String firstName, String lastName, String email, String gender) {
        return new Profile(username, password, firstName, lastName, email, gender, "STUDENT");
    }

    public static Profile createTutorProfile(String username, String password, String firstName, String lastName, String email, String gender, 
        List<String> subjects, String educationLevel, String location, int rate) {
        return new Profile(username, password, firstName, lastName, email, gender, subjects, educationLevel, location, rate, "TUTOR");
    }
}