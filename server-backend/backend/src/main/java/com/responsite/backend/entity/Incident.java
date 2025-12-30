package com.responsite.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Flood, Fire, etc.
    private String location;
    private String zone;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String severity; // Low, Medium, High
    private String status; // PENDING, IN_PROGRESS, RESOLVED, CANCELLED
    private String assignedTo; // Name of the respondent assigned

    private LocalDateTime timestamp;
    private LocalDateTime inProgressDate; // When the incident moved to IN_PROGRESS
    private LocalDateTime resolvedDate; // When the incident was RESOLVED
    
    @Column(columnDefinition = "TEXT")
    private String resolutionNotes; // Notes about the resolution

    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
        if (this.status == null) this.status = "PENDING";
    }
}