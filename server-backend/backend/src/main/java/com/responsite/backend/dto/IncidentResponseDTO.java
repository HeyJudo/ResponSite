package com.responsite.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class IncidentResponseDTO {
    private Long id;
    private String type;
    private String location;
    private String description;
    private String severity;
    private String status;
    private LocalDateTime timestamp;
    private String reporterName;
}
