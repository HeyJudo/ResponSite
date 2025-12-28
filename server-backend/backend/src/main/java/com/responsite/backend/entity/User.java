package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Lombok automatically generates Getters/Setters
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;
    private String fullName;
    private String role; // "RESIDENT", "STAFF", "ADMIN"
    private String contactNumber;
    private String address;
    private String zone; // Purok
    private String email;
}