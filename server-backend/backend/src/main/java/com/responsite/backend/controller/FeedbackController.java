package com.responsite.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.responsite.backend.dto.FeedbackRequestDTO;
import com.responsite.backend.dto.ProjectFeedbackDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.FeedbackService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // RESTRICTED: RESIDENT only - Submit feedback for a project
    @PostMapping("/{projectId}")
    public ResponseEntity<?> submitFeedback(
            @PathVariable Long projectId,
            @RequestBody FeedbackRequestDTO dto,
            HttpSession session) {
        
        // Manual Session Auth Check
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
        }
        if (!user.getRole().equals("RESIDENT")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only Residents can submit feedback");
        }

        ProjectFeedbackDTO result = feedbackService.submitFeedback(projectId, dto, user.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // RESTRICTED: RESIDENT, STAFF or ADMIN only - View all feedbacks for a project
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getFeedbacks(@PathVariable Long projectId, HttpSession session) {
        // Manual Session Auth Check
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
        }
        if (!user.getRole().equals("RESIDENT") && !user.getRole().equals("STAFF") && !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        List<ProjectFeedbackDTO> list = feedbackService.getFeedbacks(projectId);
        return ResponseEntity.ok(list);
    }
}
