package com.orbital.stutotu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.dto.FriendRequestDTO;
import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.service.MyUserDetailsService;


// @CrossOrigin(origins = "https://stutotu.netlify.app/")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private MyUserDetailsService userService;

    @PostMapping("/send")
    public ResponseEntity<String> sendFriendRequest(@RequestBody FriendRequestDTO requestDTO) {
        try {
            userService.sendFriendRequest(requestDTO.getRequesterUsername(), requestDTO.getReceiverUsername());
            return ResponseEntity.ok("Friend request sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send friend request: " + e.getMessage());
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestBody FriendRequestDTO requestDTO) {
        try {
            userService.acceptFriendRequest(requestDTO.getRequesterUsername(), requestDTO.getReceiverUsername());
            return ResponseEntity.ok("Friend request accepted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send friend request: " + e.getMessage());
        }
    }

    @PostMapping("/reject")
    public ResponseEntity<String> rejectFriendRequest(@RequestBody FriendRequestDTO requestDTO) {
        try {
            userService.rejectFriendRequest(requestDTO.getRequesterUsername(), requestDTO.getReceiverUsername());
            return ResponseEntity.ok("Friend request rejected successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send friend request: " + e.getMessage());
        }
    }


    @GetMapping("/pending/{username}")
    public ResponseEntity<List<Profile>> getPendingFriendRequests(@PathVariable String username) {
        try {
            List<Profile> pendingRequests = userService.getPendingFriendRequests(username);
            return ResponseEntity.ok(pendingRequests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Profile>> getFriends(@PathVariable String username) {
        try {
            List<Profile> friends = userService.getFriends(username);
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFriend(@RequestBody FriendRequestDTO requestDTO) {
        try {
            System.out.println("trying to remove friend");
            userService.removeFriend(requestDTO.getRequesterUsername(), requestDTO.getReceiverUsername());
            System.out.println("success");
            return ResponseEntity.ok("Friend removed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove friend: " + e.getMessage());
        }
    }
}
