package com.responsite.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProcessUpdateRequestDTO {
    private String status;
    private Integer progress;
    private Double budgetSpent;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate adjustedDate;
    private String note;
}