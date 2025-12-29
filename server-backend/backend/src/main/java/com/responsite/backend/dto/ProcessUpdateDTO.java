package com.responsite.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProcessUpdateDTO {
    private Long id;
    private Long projectId;
    private Long userId;
    private String userName;
    private String status;
    private Integer progress;
    private Double budgetSpent;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate adjustedDate;
    private String note;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timestamp;
}