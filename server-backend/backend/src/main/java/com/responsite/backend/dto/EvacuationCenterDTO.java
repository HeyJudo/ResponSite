package com.responsite.backend.dto;

import lombok.Data;

@Data
public class EvacuationCenterDTO {
    private Long id;
    private String name;
    private String location;
    private int capacity;
    private String status;
}
