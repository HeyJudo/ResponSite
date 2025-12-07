package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // Road, Bridge
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status; // PLANNED, ONGOING
    private int progress; // 0-100
    private LocalDate startDate;
    private LocalDate targetDate;
    private Double budget;
}
