package com.responsite.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String type;
    private String location;
    private String contractorName;
    private String contractorNumber;
    private String contractorEmail;
    private String description;
    private String objectives;
    private String status;
    private Integer progress;
    private Double budget;
    private Double budgetSpent;
    private String summaryNote;
    private LocalDate startDate;
    private LocalDate targetDate;
    private LocalDate actualStartDate;
    private LocalDate adjustedDate;
    private LocalDate actualEndDate;
    private LocalDateTime createdAt;
}
