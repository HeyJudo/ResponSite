package com.responsite.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String type;
    private String location;
    private String description;
    private String status;
    private int progress;
    private Double budget;
    private LocalDate startDate;
    private LocalDate targetDate;
}
