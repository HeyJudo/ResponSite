package com.responsite.backend.util;

import java.util.List;
import java.util.stream.Collectors;

import com.responsite.backend.dto.EvacuationCenterDTO;
import com.responsite.backend.dto.FeedbackRequestDTO;
import com.responsite.backend.dto.IncidentRequestDTO;
import com.responsite.backend.dto.IncidentResponseDTO;
import com.responsite.backend.dto.ProjectDTO;
import com.responsite.backend.dto.RegisterRequestDTO;
import com.responsite.backend.dto.ResourceDTO;
import com.responsite.backend.dto.UserResponseDTO;
import com.responsite.backend.entity.EvacuationCenter;
import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.ProjectFeedback;
import com.responsite.backend.entity.Resource;
import com.responsite.backend.entity.User;

/**
 * Manual mapper class for converting between Entity and DTO objects.
 * All methods are static for easy use without dependency injection.
 */
public class EntityMapper {

    // ==================== USER MAPPINGS ====================

    /**
     * Converts a User entity to UserResponseDTO (excludes password).
     */
    public static UserResponseDTO toDto(User user) {
        if (user == null) return null;

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole());
        dto.setContactNumber(user.getContactNumber());
        dto.setAddress(user.getAddress());
        dto.setZone(user.getZone());
        return dto;
    }

    /**
     * Converts RegisterRequestDTO to User entity.
     */
    public static User toEntity(RegisterRequestDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setFullName(dto.getFullName());
        user.setContactNumber(dto.getContactNumber());
        user.setAddress(dto.getAddress());
        user.setZone(dto.getZone());
        user.setEmail(dto.getEmail());
        return user;
    }

    // ==================== INCIDENT MAPPINGS ====================

    /**
     * Converts an Incident entity to IncidentResponseDTO.
     */
    public static IncidentResponseDTO toDto(Incident incident) {
        if (incident == null) return null;

        IncidentResponseDTO dto = new IncidentResponseDTO();
        dto.setId(incident.getId());
        dto.setType(incident.getType());
        dto.setLocation(incident.getLocation());
        dto.setZone(incident.getZone());
        dto.setDescription(incident.getDescription());
        dto.setSeverity(incident.getSeverity());
        dto.setStatus(incident.getStatus());
        dto.setTimestamp(incident.getTimestamp());

        // Get reporter's name safely
        if (incident.getReporter() != null) {
            dto.setReporterName(incident.getReporter().getFullName());
            dto.setReporterPhone(incident.getReporter().getContactNumber());
            dto.setReporterEmail(incident.getReporter().getEmail());
        }
        return dto;
    }

    /**
     * Converts IncidentRequestDTO to Incident entity.
     */
    public static Incident toEntity(IncidentRequestDTO dto) {
        if (dto == null) return null;

        Incident incident = new Incident();
        incident.setType(dto.getType());
        incident.setLocation(dto.getLocation());
        incident.setZone(dto.getZone());
        incident.setDescription(dto.getDescription());
        incident.setSeverity(dto.getSeverity());
        return incident;
    }

    /**
     * Converts a list of Incident entities to a list of IncidentResponseDTOs.
     */
    public static List<IncidentResponseDTO> toIncidentDtoList(List<Incident> incidents) {
        if (incidents == null) return null;

        return incidents.stream()
                .map(EntityMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==================== RESOURCE MAPPINGS ====================

    /**
     * Converts a Resource entity to ResourceDTO.
     */
    public static ResourceDTO toDto(Resource resource) {
        if (resource == null) return null;

        ResourceDTO dto = new ResourceDTO();
        dto.setId(resource.getId());
        dto.setName(resource.getName());
        dto.setCategory(resource.getCategory());
        dto.setQuantity(resource.getQuantity());
        dto.setUnit(resource.getUnit());
        dto.setLocation(resource.getLocation());
        dto.setStatus(resource.getStatus());
        dto.setReorderLevel(resource.getReorderLevel());
        return dto;
    }

    /**
     * Converts ResourceDTO to Resource entity.
     */
    public static Resource toEntity(ResourceDTO dto) {
        if (dto == null) return null;

        Resource resource = new Resource();
        resource.setId(dto.getId());
        resource.setName(dto.getName());
        resource.setCategory(dto.getCategory());
        resource.setQuantity(dto.getQuantity());
        resource.setUnit(dto.getUnit());
        resource.setLocation(dto.getLocation());
        resource.setStatus(dto.getStatus());
        resource.setReorderLevel(dto.getReorderLevel());
        return resource;
    }

    /**
     * Converts a list of Resource entities to a list of ResourceDTOs.
     */
    public static List<ResourceDTO> toResourceDtoList(List<Resource> resources) {
        if (resources == null) return null;

        return resources.stream()
                .map(EntityMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==================== PROJECT MAPPINGS ====================

    /**
     * Converts a Project entity to ProjectDTO.
     */
    public static ProjectDTO toDto(Project project) {
        if (project == null) return null;

        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setType(project.getType());
        dto.setLocation(project.getLocation());
        dto.setDescription(project.getDescription());
        dto.setObjectives(project.getObjectives());
        dto.setStatus(project.getStatus());
        dto.setProgress(project.getProgress());
        dto.setBudget(project.getBudget());
        dto.setBudgetSpent(project.getBudgetSpent());
        dto.setSummaryNote(project.getSummaryNote());
        dto.setStartDate(project.getStartDate());
        dto.setTargetDate(project.getTargetDate());
        dto.setActualStartDate(project.getActualStartDate());
        dto.setAdjustedDate(project.getAdjustedDate());
        dto.setActualEndDate(project.getActualEndDate());
        dto.setCreatedAt(project.getCreatedAt());
        return dto;
    }

    /**
     * Converts ProjectDTO to Project entity.
     */
    public static Project toEntity(ProjectDTO dto) {
        if (dto == null) return null;

        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setType(dto.getType());
        project.setLocation(dto.getLocation());
        project.setDescription(dto.getDescription());
        project.setObjectives(dto.getObjectives());
        project.setStatus(dto.getStatus());
        project.setProgress(dto.getProgress());
        project.setBudget(dto.getBudget());
        project.setBudgetSpent(dto.getBudgetSpent());
        project.setSummaryNote(dto.getSummaryNote());
        project.setStartDate(dto.getStartDate());
        project.setTargetDate(dto.getTargetDate());
        project.setActualStartDate(dto.getActualStartDate());
        project.setAdjustedDate(dto.getAdjustedDate());
        project.setActualEndDate(dto.getActualEndDate());
        // createdAt is managed by the entity lifecycle; do not overwrite if present
        if (dto.getCreatedAt() != null) project.setCreatedAt(dto.getCreatedAt());
        return project;
    }

    /**
     * Converts a list of Project entities to a list of ProjectDTOs.
     */
    public static List<ProjectDTO> toProjectDtoList(List<Project> projects) {
        if (projects == null) return null;

        return projects.stream()
                .map(EntityMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==================== EVACUATION CENTER MAPPINGS ====================

    /**
     * Converts an EvacuationCenter entity to EvacuationCenterDTO.
     */
    public static EvacuationCenterDTO toDto(EvacuationCenter center) {
        if (center == null) return null;

        EvacuationCenterDTO dto = new EvacuationCenterDTO();
        dto.setId(center.getId());
        dto.setName(center.getName());
        dto.setLocation(center.getLocation());
        dto.setCapacity(center.getCapacity());
        dto.setStatus(center.getStatus());
        return dto;
    }

    /**
     * Converts EvacuationCenterDTO to EvacuationCenter entity.
     */
    public static EvacuationCenter toEntity(EvacuationCenterDTO dto) {
        if (dto == null) return null;

        EvacuationCenter center = new EvacuationCenter();
        center.setId(dto.getId());
        center.setName(dto.getName());
        center.setLocation(dto.getLocation());
        center.setCapacity(dto.getCapacity());
        center.setStatus(dto.getStatus());
        return center;
    }

    /**
     * Converts a list of EvacuationCenter entities to a list of EvacuationCenterDTOs.
     */
    public static List<EvacuationCenterDTO> toEvacuationCenterDtoList(List<EvacuationCenter> centers) {
        if (centers == null) return null;

        return centers.stream()
                .map(EntityMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==================== PROJECT FEEDBACK MAPPINGS ====================

    /**
     * Converts FeedbackRequestDTO to ProjectFeedback entity.
     */
    public static ProjectFeedback toEntity(FeedbackRequestDTO dto) {
        if (dto == null) return null;

        ProjectFeedback feedback = new ProjectFeedback();
        feedback.setSubject(dto.getSubject());
        feedback.setMessage(dto.getMessage());
        feedback.setFeedbackType(dto.getFeedbackType());
        feedback.setAnonymous(dto.isAnonymous());
        return feedback;
    }
}
