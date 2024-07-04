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

    public Tag(String name) {
        this.name = name;
        this.validated = true;
        this.inProfile = false;
        this.complains = 0;
    }

    // will return false if the complain leads to the tag having too many complains and being removed
    public boolean complain() {
        this.complains++;
        if (this.complains > 5) {
            validated = false;
            this.inProfile = false;
            return false;
        }
        return true;
    }

    public void addToProfile() {
        this.inProfile = true;
    }

    public void removeFromProfile() {
        this.inProfile = false;
    }
}
