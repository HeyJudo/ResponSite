package com.responsite.backend.dto;

import lombok.Data;

@Data
public class ResourceDTO {
    private Long id;
    private String name;
    private String category;
    private int quantity;
    private String unit;
    private String location;
    private String status;
    private int reorderLevel;
}
