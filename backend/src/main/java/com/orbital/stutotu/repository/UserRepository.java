package com.orbital.stutotu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orbital.stutotu.model.Profile;

@Repository
public interface UserRepository extends JpaRepository<Profile, Long> {
    boolean existsByUsername(String username);
    Profile findByUsername(String username);
}
