package com.orbital.stutotu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.orbital.stutotu.model.Profile;
import com.orbital.stutotu.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Profile user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        var springUser = User.withUsername(user.getUsername())
                            .password(user.getPassword())
                            .roles(user.getRole())
                            .build();
        
        return springUser;
    }

    public List<Profile> searchTutorProfiles(String query) {
        return userRepository.searchTutorProfile(query);
    }

    @Transactional
    public void sendFriendRequest(String requesterUsername, String receiverUsername) {
        Profile requester = userRepository.findByUsername(requesterUsername);
        Profile recipient = userRepository.findByUsername(receiverUsername);

        if (requester !=null && recipient != null) {
            if (!requester.getPendingRequests().contains(recipient)) {
            requester.getPendingRequests().add(recipient);
            recipient.getPendingRequests().add(requester);
            userRepository.save(requester);
            userRepository.save(recipient);
            }
        } else {
            throw new IllegalArgumentException("Invalid usernames for friend request.");
        }
    }

    public void acceptFriendRequest(String requesterUsername, String receiverUsername) {
        Profile requester = userRepository.findByUsername(requesterUsername);
        Profile recipient = userRepository.findByUsername(receiverUsername);

        if (requester !=null && recipient != null) {
            recipient.getPendingRequests().remove(requester);
            requester.getPendingRequests().remove(recipient);
            recipient.getFriends().add(requester);
            requester.getFriends().add(recipient);
            userRepository.save(requester);
            userRepository.save(recipient);
        } else {
            throw new IllegalArgumentException("Invalid usernames for friend request.");
        }
    }

    public void rejectFriendRequest(String requesterUsername, String receiverUsername) {
        Profile requester = userRepository.findByUsername(requesterUsername);
        Profile recipient = userRepository.findByUsername(receiverUsername);

        if (requester !=null && recipient != null) {
            recipient.getPendingRequests().removeIf(profile -> profile.getUsername().equals(requesterUsername));
            requester.getPendingRequests().removeIf(profile -> profile.getUsername().equals(receiverUsername));
            userRepository.save(requester);
            userRepository.save(recipient);
        } else {
            throw new IllegalArgumentException("Invalid usernames for friend request.");
        }
    }

    public List<Profile> getPendingFriendRequests(String username) {
        Profile profile = userRepository.findByUsername(username);

        if (profile != null) {
            return profile.getPendingRequests();
        } else {
            throw new IllegalArgumentException("username not found!");
        }
    }

    public List<Profile> getFriends(String username) {
        Profile profile = userRepository.findByUsername(username);

        if (profile != null) {
            return profile.getFriends();
        } else {
            throw new IllegalArgumentException("username not found!");
        }
    }

    public void removeFriend(String requesterUsername, String receiverUsername) {
        Profile requester = userRepository.findByUsername(requesterUsername);
        Profile recipient = userRepository.findByUsername(receiverUsername);

        if (requester !=null && recipient != null) {
            recipient.getFriends().removeIf(profile -> profile.getUsername().equals(requesterUsername));
            requester.getFriends().removeIf(profile -> profile.getUsername().equals(receiverUsername));
            userRepository.save(requester);
            userRepository.save(recipient);
        } else {
            throw new IllegalArgumentException("Invalid usernames for friend removal.");
        }
    }
}

