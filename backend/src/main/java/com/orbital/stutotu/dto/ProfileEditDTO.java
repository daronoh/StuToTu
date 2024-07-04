package com.orbital.stutotu.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileEditDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String profilePicture;
    private String Description;
    private List<String> Subjects;
    private String educationLevel;
    private String location;
    private int rate;
    private List<String> tags;
}
