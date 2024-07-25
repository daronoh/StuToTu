package com.orbital.stutotu.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Event {
    private String title;
    private String description;
    private String date;
    private String startTime;
    private String endTime;
}