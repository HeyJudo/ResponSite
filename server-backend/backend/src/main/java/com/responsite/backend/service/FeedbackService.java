package com.responsite.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.responsite.backend.Repository.ProjectFeedbackRepository;
import com.responsite.backend.Repository.ProjectRepository;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.dto.FeedbackRequestDTO;
import com.responsite.backend.dto.ProjectFeedbackDTO;
import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.ProjectFeedback;
import com.responsite.backend.entity.User;
import com.responsite.backend.util.EntityMapper;

@Service
public class FeedbackService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectFeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    public ProjectFeedbackDTO submitFeedback(Long projectId, FeedbackRequestDTO dto, String username) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectFeedback feedback = EntityMapper.toEntity(dto);
        feedback.setProject(project);

        // Only set user if not anonymous
        if (!dto.isAnonymous()) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            feedback.setUser(user);
        }

        ProjectFeedback saved = feedbackRepository.save(feedback);
        return toDto(saved);
    }

    public List<ProjectFeedbackDTO> getFeedbacks(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return feedbackRepository.findByProject(project)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ProjectFeedbackDTO toDto(ProjectFeedback feedback) {
        ProjectFeedbackDTO dto = new ProjectFeedbackDTO();
        dto.setId(feedback.getId());
        if (feedback.getProject() != null) dto.setProjectId(feedback.getProject().getId());
        if (feedback.getUser() != null) {
            dto.setUserId(feedback.getUser().getId());
            dto.setUserName(feedback.getUser().getFullName());
        } else {
            dto.setUserName("Anonymous");
        }
        dto.setFeedbackType(feedback.getFeedbackType());
        dto.setSubject(feedback.getSubject());
        dto.setMessage(feedback.getMessage());
        dto.setAnonymous(feedback.isAnonymous());
        dto.setTimestamp(feedback.getTimestamp());
        return dto;
    }
}
