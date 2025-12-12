package com.responsite.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * DTO for Dashboard Statistics
 * Aggregates data from multiple modules for different user roles.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    
    // Admin view statistics
    private long totalUsers;
    private long totalIncidents;
    
    // Staff view statistics
    private long pendingIncidents;
    private long lowStockItems;
    
    // Resident view statistics
    private long myActiveReports;
    
    // Placeholder for Module 4 (Infrastructure Projects)
    private long activeProjects;
}
