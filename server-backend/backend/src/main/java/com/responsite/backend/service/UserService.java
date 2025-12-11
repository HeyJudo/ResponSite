package com.responsite.backend.service;

import com.responsite.backend.dto.RegisterRequestDTO;
import com.responsite.backend.dto.UserResponseDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.util.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Logic: Register a new user
    public UserResponseDTO registerUser(RegisterRequestDTO registerDTO) {
        // 1. Check if username exists
        if (userRepository.findByUsername(registerDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        // 2. Convert DTO to Entity
        User user = EntityMapper.toEntity(registerDTO);

        // 3. Default role is RESIDENT if not specified
        user.setRole("RESIDENT");

        // 4. Save to Database
        User savedUser = userRepository.save(user);

        // 5. Return DTO (without password)
        return EntityMapper.toDto(savedUser);
    }

    // Logic: Login check - returns User entity for session storage
    public User loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Compare Passwords (Simple String comparison for MVP)
            if (user.getPassword().equals(password)) {
                return user; // Success: Return the user entity (for session)
            }
        }
        return null; // Failed: Return nothing
    }

    // Convert User entity to DTO for API responses
    public UserResponseDTO toResponseDTO(User user) {
        return EntityMapper.toDto(user);
    }
}
