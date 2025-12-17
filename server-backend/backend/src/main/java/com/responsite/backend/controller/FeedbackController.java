package com.responsite.backend.controller;

import com.responsite.backend.dto.FeedbackRequestDTO;
import com.responsite.backend.dto.ProjectFeedbackDTO;
import com.responsite.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/{projectId}")
    @PreAuthorize("hasRole('LGU_STAFF')")
    public ResponseEntity<ProjectFeedbackDTO> submitFeedback(@PathVariable Long projectId, @RequestBody FeedbackRequestDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ProjectFeedbackDTO result = feedbackService.submitFeedback(projectId, dto, username);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{projectId}")
    @PreAuthorize("hasRole('LGU_STAFF')")
    public ResponseEntity<List<ProjectFeedbackDTO>> getFeedbacks(@PathVariable Long projectId) {
        List<ProjectFeedbackDTO> list = feedbackService.getFeedbacks(projectId);
        return ResponseEntity.ok(list);
    }
}
