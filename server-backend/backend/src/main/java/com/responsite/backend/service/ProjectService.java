package com.responsite.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.responsite.backend.Repository.ProcessUpdateRepository;
import com.responsite.backend.Repository.ProjectFeedbackRepository;
import com.responsite.backend.Repository.ProjectRepository;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.dto.ProcessUpdateDTO;
import com.responsite.backend.dto.ProcessUpdateRequestDTO;
import com.responsite.backend.dto.ProjectDTO;
import com.responsite.backend.entity.ProcessUpdate;
import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.User;
import com.responsite.backend.util.EntityMapper;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectFeedbackRepository feedbackRepository;

    @Autowired
    private ProcessUpdateRepository processUpdateRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ProjectDTO> getAllProjects() {
        return EntityMapper.toProjectDtoList(projectRepository.findAll());
    }

    public ProjectDTO getProject(Long id) {
        return projectRepository.findById(id)
                .map(EntityMapper::toDto)
                .orElse(null);
    }

    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = EntityMapper.toEntity(dto);
        // Ensure required defaults to satisfy NOT NULL constraints
        if (project.getProgress() == null) {
            project.setProgress(0);
        }
        if (project.getStatus() == null) {
            project.setStatus("Planned");
        }
        Project saved = projectRepository.save(project);
        return EntityMapper.toDto(saved);
    }

    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (dto.getName() != null) project.setName(dto.getName());
        if (dto.getType() != null) project.setType(dto.getType());
        if (dto.getLocation() != null) project.setLocation(dto.getLocation());
        if (dto.getDescription() != null) project.setDescription(dto.getDescription());
        if (dto.getObjectives() != null) project.setObjectives(dto.getObjectives());
        if (dto.getBudget() != null) project.setBudget(dto.getBudget());
        if (dto.getBudgetSpent() != null) {
            Double current = project.getBudgetSpent() != null ? project.getBudgetSpent() : 0.0;
            project.setBudgetSpent(current + dto.getBudgetSpent());
        }
        if (dto.getSummaryNote() != null) project.setSummaryNote(dto.getSummaryNote());
        if (dto.getStartDate() != null) project.setStartDate(dto.getStartDate());
        if (dto.getTargetDate() != null) project.setTargetDate(dto.getTargetDate());
        if (dto.getActualStartDate() != null) project.setActualStartDate(dto.getActualStartDate());
        if (dto.getAdjustedDate() != null) project.setAdjustedDate(dto.getAdjustedDate());
        if (dto.getActualEndDate() != null) project.setActualEndDate(dto.getActualEndDate());
        if (dto.getProgress() != null) project.setProgress(dto.getProgress());

        if (dto.getStatus() != null) {
            String status = dto.getStatus();
            project.setStatus(status);

            if ("In Progress".equalsIgnoreCase(status)) {
                if (dto.getActualStartDate() != null) {
                    project.setActualStartDate(dto.getActualStartDate());
                } else if (project.getActualStartDate() == null) {
                    project.setActualStartDate(java.time.LocalDate.now());
                }
            }

            if ("Planned".equalsIgnoreCase(status)) {
                project.setStartDate(dto.getStartDate() != null ? dto.getStartDate() : java.time.LocalDate.now());
                project.setProgress(0);
            }

            if ("Delayed".equalsIgnoreCase(status) && dto.getAdjustedDate() != null) {
                project.setAdjustedDate(dto.getAdjustedDate());
            }

            if ("Completed".equalsIgnoreCase(status)) {
                if (dto.getActualEndDate() != null) {
                    project.setActualEndDate(dto.getActualEndDate());
                } else {
                    project.setActualEndDate(java.time.LocalDate.now());
                }
                project.setProgress(dto.getProgress() != null ? dto.getProgress() : 100);
            }
        }

        Project saved = projectRepository.save(project);
        return EntityMapper.toDto(saved);
    }

    public ProcessUpdateDTO addProcessUpdate(Long projectId, ProcessUpdateRequestDTO dto, String username) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProcessUpdate update = EntityMapper.toEntity(dto);
        update.setProject(project);
        update.setUser(user);

        ProcessUpdate saved = processUpdateRepository.save(update);
        return EntityMapper.toDto(saved);
    }

    public List<ProcessUpdateDTO> getProcessUpdates(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<ProcessUpdate> updates = processUpdateRepository.findByProjectOrderByTimestampDesc(project);
        return EntityMapper.toProcessUpdateDtoList(updates);
    }
}
