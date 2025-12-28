package com.responsite.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class IncidentResponseDTO {
    private Long id;
    private String type;
    private String location;
    private String zone;
    private String description;
    private String severity;
    private String status;
    private LocalDateTime timestamp;
    private String reporterName;
    private String reporterPhone;
    private String reporterEmail;
}
