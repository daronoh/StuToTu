package com.orbital.stutotu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbital.stutotu.model.Tag;


public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByTypeAndValidated(String type, boolean validated);
}


