package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EvacuationCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int capacity;
    private String status; // OPEN, CLOSED
}