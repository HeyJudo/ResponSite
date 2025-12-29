package com.responsite.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.ProjectFeedback;

public interface ProjectFeedbackRepository extends JpaRepository<ProjectFeedback, Long> {
    List<ProjectFeedback> findByProject(Project project);
}
