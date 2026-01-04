package com.responsite.backend.dto;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private String fullName;
    private String role;
    private String contactNumber;
    private String email;
    private String address;
    private String zone;
}
