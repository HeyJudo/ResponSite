package com.responsite.backend.service;

import com.responsite.backend.Repository.ProjectFeedbackRepository;
import com.responsite.backend.Repository.ProjectRepository;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.dto.ProjectDTO;
import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.User;
import com.responsite.backend.util.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectFeedbackRepository feedbackRepository;

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
        Project saved = projectRepository.save(project);
        return EntityMapper.toDto(saved);
    }

    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setName(dto.getName());
        project.setType(dto.getType());
        project.setLocation(dto.getLocation());
        project.setDescription(dto.getDescription());
        project.setStatus(dto.getStatus());
        project.setProgress(dto.getProgress());
        project.setBudget(dto.getBudget());
        project.setStartDate(dto.getStartDate());
        project.setTargetDate(dto.getTargetDate());

        Project saved = projectRepository.save(project);
        return EntityMapper.toDto(saved);
    }
}
