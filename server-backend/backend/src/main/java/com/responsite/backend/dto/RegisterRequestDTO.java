package com.responsite.backend.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String password;
    private String fullName;
    private String contactNumber;
    private String address;
    private String zone;
}
