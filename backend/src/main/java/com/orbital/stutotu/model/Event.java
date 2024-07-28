package com.orbital.stutotu.model;

import java.util.Objects;

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
public class Event {

    private String title;
    private String description;
    private String date;
    private String startTime;
    private String endTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(title, event.title) &&
               Objects.equals(description, event.description) &&
               Objects.equals(date, event.date) &&
               Objects.equals(startTime, event.startTime) &&
               Objects.equals(endTime, event.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, date, startTime, endTime);
    }

}