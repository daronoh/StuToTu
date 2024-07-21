package com.orbital.stutotu.model;

import java.util.List;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private String reviewFor;
    private String reviewFrom;
    private String content;
    private int rating;
    private List<String> tags;
}
