package com.responsite.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProjectFeedbackDTO {
    private Long id;
    private Long projectId;
    private Long userId;
    private String userName;
    private String feedbackType;
    private String subject;
    private String message;
    private boolean anonymous;
    private LocalDateTime timestamp;
}
