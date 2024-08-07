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

    @ElementCollection
    private List<Tag> tags;

    @ElementCollection
    private List<Review> reviews;

    @Column
    private Integer numOfReviews;

    @Column
    private Integer totalRating;

    @Column
    private Double avgRating; // avg = total / num

    @ElementCollection
    private List<Event> events;

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
        this.reviews = new ArrayList<>();
        this.numOfReviews = 0;
        this.totalRating = 0;
        this.avgRating = 0.0;
        this.events = new ArrayList<>();
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
        ArrayList<Tag> strings = new ArrayList<>();
        strings.add(new Tag("Patient"));
        strings.add(new Tag("Organized"));
        strings.add(new Tag("Topic-oriented"));
        strings.add(new Tag("Exam-oriented"));
        strings.add(new Tag("Adaptable"));
        strings.add(new Tag("Structured"));
        strings.add(new Tag("Visual"));
        strings.add(new Tag("Practical"));
        this.tags = strings;
        this.reviews = new ArrayList<>();
        this.numOfReviews = 0;
        this.totalRating = 0;
        this.avgRating = 0.0;
        this.events = new ArrayList<>();
    }

    // Factory methods for creating specific roles
    public static Profile createStudentProfile(String username, String password, String firstName, String lastName, String email, String gender) {
        return new Profile(username, password, firstName, lastName, email, gender, "STUDENT");
    }

    public static Profile createTutorProfile(String username, String password, String firstName, String lastName, String email, String gender, 
        List<String> subjects, String educationLevel, String location, int rate) {
        return new Profile(username, password, firstName, lastName, email, gender, subjects, educationLevel, location, rate, "TUTOR");
    }

    // validating 'others' option
    public boolean canAddTag(String tagName) {
        return tags.stream().noneMatch(t -> t.getName().equalsIgnoreCase(tagName) && !t.isValidated());
    }

    // addTag for 'others' option
    public void addTag(String tagName) {
        if (canAddTag(tagName)) {
            Tag tag = tags.stream()
                        .filter(t -> t.getName()
                        .equalsIgnoreCase(tagName))
                        .findFirst()
                        .orElse(new Tag(tagName));

            tag.addToProfile();
            if (!tags.contains(tag)) {
                tags.add(tag);
            }
        }
    }

    //this essentially we use this to leave reviews as it will update all the info we need, i want to display the avg rating on the profile so we need these.
    public void leaveReview(Review review) {
        this.reviews.add(review);
        this.numOfReviews++;
        this.totalRating += review.getRating();
        this.avgRating = (this.totalRating * 1.0 / this.numOfReviews);
        
        tags.stream()
            .filter(tag -> tag.getInProfile())  // Filter tags that are in profile
            .forEach(tag -> {
                String tagName = tag.getName();
                if (review.getTags().contains(tagName)) {
                    tag.reviewed();  // Call reviewed() if tag name is in review's tags
                } else {
                    tag.complain();  // Call complain() otherwise
                }
            });
    }

    public void createEvent(Event event) {
        this.events.add(event);
    }

    public void deleteEvent(Event event) {
        if (this.events.contains(event)) {
            System.out.println("event found");
        } else {
            System.out.println("event not found");
        }
        this.events.remove(event);
    }
}


/*
 * // remove 'other' tags from profile
    public void removeTag(String tagName) {
        Tag tagToRemove = tags.stream()
                              .filter(t -> t.getName().equalsIgnoreCase(tagName))
                              .findFirst()
                              .orElse(null);

        if (tagToRemove != null) {
            tagToRemove.removeFromProfile();
            tags.remove(tagToRemove);
        }
    }
 */