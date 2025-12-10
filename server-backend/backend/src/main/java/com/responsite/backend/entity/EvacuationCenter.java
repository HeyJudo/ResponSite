package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "evacuation_centers")
public class EvacuationCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int capacity;
    private String status; // OPEN, CLOSED, FULL 

    @PrePersist
    protected void onCreate() {
        if (this.status == null) {
            this.status = "CLOSED";
        }
    }
}