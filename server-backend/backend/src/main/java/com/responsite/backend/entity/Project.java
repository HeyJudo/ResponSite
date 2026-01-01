package com.responsite.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // Road, Bridge
    private String location;

    private String contractorName;
    private String contractorNumber;
    private String contractorEmail;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    private String status; // PLANNED, ONGOING
    private Integer progress; // 0-100
    private LocalDate startDate;
    private LocalDate targetDate;
    private Double budget;
    private Double budgetSpent;
    private String summaryNote;
    private LocalDate actualStartDate;
    private LocalDate adjustedDate;
    private LocalDate actualEndDate;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
