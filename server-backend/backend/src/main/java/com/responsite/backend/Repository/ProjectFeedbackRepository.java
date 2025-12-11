package com.responsite.backend.Repository;

import com.responsite.backend.entity.Project;
import com.responsite.backend.entity.ProjectFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectFeedbackRepository extends JpaRepository<ProjectFeedback, Long> {
    List<ProjectFeedback> findByProject(Project project);
}
