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
}

