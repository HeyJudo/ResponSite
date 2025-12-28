package com.responsite.backend.dto;

import lombok.Data;

@Data
public class IncidentRequestDTO {
    private String type;
    private String location;
    private String zone;
    private String description;
    private String severity;
}
