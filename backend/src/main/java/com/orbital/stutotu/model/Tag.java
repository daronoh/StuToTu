package com.orbital.stutotu.model;

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
public class Tag {

    private String name;
    private boolean validated;
    private boolean inProfile;
    private int complains;
    private int totalReviews;

    public Tag(String name) {
        this.name = name;
        this.validated = true;
        this.inProfile = false;
        this.complains = 0;
        this.totalReviews = 0;
    }

    public void reviewed() {
        this.totalReviews++;
        if (this.complains <= this.totalReviews / 2) {
            validated = true;
        }
    }

    // will return false if the complain leads to the tag having too many complains and being removed
    public void complain() {
        this.complains++;
        this.totalReviews++;
        if (this.complains > this.totalReviews / 2) {
            validated = false;
        }
    }

    public void addToProfile() {
        this.inProfile = true;
    }

    public void removeFromProfile() {
        this.inProfile = false;
    }

    public boolean getInProfile() {
        return this.inProfile;
    }
}
