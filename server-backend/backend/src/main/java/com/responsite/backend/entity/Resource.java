package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category; // Food, Medicine
    private int quantity;
    private String unit; // packs, boxes
    private String location; // Warehouse A
    private String status; // AVAILABLE, LOW_STOCK
}