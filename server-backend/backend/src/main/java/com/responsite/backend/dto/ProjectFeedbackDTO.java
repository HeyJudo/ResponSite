package com.responsite.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectFeedbackDTO {
    private Long id;
    private Long projectId;
    private Long userId;
    private String userName;
    private String feedbackType;
    private String subject;
    private String message;
    private LocalDateTime timestamp;
}
