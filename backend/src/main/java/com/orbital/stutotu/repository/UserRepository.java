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
    boolean existsByEmail(String email);
    Profile findByUsername(String username);
    List<Profile> findByUsernameContainingIgnoreCase(String username);

    @Query("SELECT DISTINCT p FROM Profile p LEFT JOIN p.subjects s " +
           "WHERE p.role = 'TUTOR' AND (" +
           "LOWER(p.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.gender) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.educationLevel) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.location) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Profile> searchTutorProfile(@Param("query") String query);

       // for filtering profiles
       @Query("SELECT p FROM Profile p " +
              "WHERE (:gender IS NULL OR p.gender = :gender) " +
              "AND (:educationLevel IS NULL OR p.educationLevel = :educationLevel) " +
              "AND (:location IS NULL OR p.location = :location) " +
              "AND (:rate IS NULL OR p.rate <= :rate)")
       List<Profile> findByFilters(
              @Param("gender") String gender,
              @Param("educationLevel") String educationLevel,
              @Param("location") String location,
              @Param("rate") Integer rate);

    @Query("SELECT p.role FROM Profile p WHERE p.username = :username")
    String findRoleByUsername(@Param("username") String username);

    @Query("SELECT p FROM Profile p JOIN p.tags t WHERE p.role = 'TUTOR' AND t = :tag")
    List<Profile> findTutorsByTag(@Param("tag") String tag);

    /*@Query("SELECT p FROM Profile p JOIN p.tags t WHERE t = :tag")
    List<Profile> findByTag(@Param("tag") String tag);*/

}
