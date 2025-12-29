package com.responsite.backend.dto;

import lombok.Data;

@Data
public class FeedbackRequestDTO {
    private String subject;
    private String message;
    private String feedbackType;
    private boolean anonymous;
}
