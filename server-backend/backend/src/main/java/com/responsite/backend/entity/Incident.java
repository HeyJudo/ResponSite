package com.responsite.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

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
    private String status; // PENDING, RESOLVED, CANCELLED

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
        if (this.status == null) this.status = "PENDING";
    }
}