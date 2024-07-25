package com.orbital.stutotu.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    private String title;
    private String description;
    private String date;
    private String startTime;
    private String endTime;
}