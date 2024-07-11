package com.orbital.stutotu.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
public class Review {
    private String reviewFor;
    private String reviewFrom;
    private String content;
    private int rating;
}
