package com.responsite.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.responsite.backend.Repository.IncidentRepository;
import com.responsite.backend.Repository.ProjectRepository;
import com.responsite.backend.Repository.ResourceRepository;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.dto.DashboardStatsDTO;
import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.Resource;
import com.responsite.backend.entity.User;

/**
 * Service for Dashboard & Analytics (Module 5)
 * Aggregates statistics from Users, Incidents, and Resources modules.
 */
@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * Get dashboard statistics for the current user.
     * Returns aggregated data from all available modules.
     *
     * @param currentUser The currently logged-in user
     * @return DashboardStatsDTO containing all statistics
     */
    public DashboardStatsDTO getStats(User currentUser) {
        // Admin view: Total Users
        long totalUsers = userRepository.count();

        // Admin view: Total Incidents
        long totalIncidents = incidentRepository.count();

        // Staff view: Pending Incidents (status == "PENDING")
        long pendingIncidents = countPendingIncidents();

        // Staff view: Low Stock Items (status == "LOW_STOCK")
        long lowStockItems = countLowStockItems();

        // Resident view: My Active Reports (reporter == currentUser AND status != "RESOLVED")
        long myActiveReports = countMyActiveReports(currentUser);

        long activeProjects = countActiveProjects();

        return DashboardStatsDTO.builder()
                .totalUsers(totalUsers)
                .totalIncidents(totalIncidents)
                .pendingIncidents(pendingIncidents)
                .lowStockItems(lowStockItems)
                .myActiveReports(myActiveReports)
                .activeProjects(activeProjects)
                .build();
    }

    /**
     * Count incidents with PENDING status.
     */
    private long countPendingIncidents() {
        List<Incident> allIncidents = incidentRepository.findAll();
        return allIncidents.stream()
                .filter(incident -> "PENDING".equalsIgnoreCase(incident.getStatus()))
                .count();
    }

    /**
     * Count resources with LOW_STOCK status.
     */
    private long countLowStockItems() {
        List<Resource> allResources = resourceRepository.findAll();
        return allResources.stream()
                .filter(resource -> "LOW_STOCK".equalsIgnoreCase(resource.getStatus()))
                .count();
    }

    /**
     * Count active reports for the current user.
     * Active reports are incidents where reporter == currentUser AND status != "RESOLVED".
     */
    private long countMyActiveReports(User currentUser) {
        if (currentUser == null || currentUser.getId() == null) {
            return 0L;
        }
        
        List<Incident> myIncidents = incidentRepository.findByReporter(currentUser);
        return myIncidents.stream()
                .filter(incident -> !"RESOLVED".equalsIgnoreCase(incident.getStatus()))
                .count();
    }

    /**
     * Count active infrastructure projects.
     * Treat projects with status COMPLETED/CANCELLED/ARCHIVED as inactive.
     */
    private long countActiveProjects() {
        return projectRepository.findAll()
                .stream()
                .filter(project -> {
                    String status = project.getStatus();
                    if (status == null) return true;
                    String normalized = status.trim().toUpperCase();
                    return !normalized.equals("COMPLETED")
                            && !normalized.equals("CANCELLED")
                            && !normalized.equals("ARCHIVED");
                })
                .count();
    }
}
