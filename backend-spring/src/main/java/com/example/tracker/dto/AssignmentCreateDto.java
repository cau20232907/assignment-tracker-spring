package com.example.tracker.dto;

import java.time.LocalDateTime;

public class AssignmentCreateDto {
    private String title;
    private String description;
    private LocalDateTime dueDate;
    
    // Constructors
    public AssignmentCreateDto() {}
    
    public AssignmentCreateDto(String title, String description, LocalDateTime dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
    
    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
}
