package com.orbital.stutotu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.orbital.stutotu.model.Profile;

@Repository
public interface UserRepository extends JpaRepository<Profile, Long> {
    boolean existsByUsername(String username);
    Profile findByUsername(String username);
    List<Profile> findByUsernameContainingIgnoreCase(String username);

    @Query("SELECT DISTINCT p FROM Profile p LEFT JOIN p.subjects s WHERE " +
           "LOWER(p.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.gender) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.educationLevel) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Profile> searchEntireProfile(@Param("query") String query);
}
