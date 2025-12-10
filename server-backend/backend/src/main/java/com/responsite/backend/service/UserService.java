package com.responsite.backend.service;

import com.responsite.backend.entity.User;
import com.responsite.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Logic: Register a new user
    public User registerUser(User user) {
        // 1. Check if username exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }
        
        // 2. Default role is RESIDENT if not specified
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("RESIDENT");
        }

        // 3. Save to Database
        
        return userRepository.save(user);
    }

    // Logic: Login check
    public User loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // 4. Compare Passwords (Simple String comparison for MVP)
            if (user.getPassword().equals(password)) {
                return user; // Success: Return the user object
            }
        }
        return null; // Failed: Return nothing
    }
}
