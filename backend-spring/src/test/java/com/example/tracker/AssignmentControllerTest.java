package com.example.tracker;

import com.example.tracker.controller.AssignmentController;
import com.example.tracker.dto.AssignmentCreateDto;
import com.example.tracker.model.Assignment;
import com.example.tracker.repository.AssignmentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AssignmentController.class)
public class AssignmentControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testCreateAssignment() throws Exception {
        // Mock 데이터 준비
        Assignment savedAssignment = new Assignment("Test Assignment", "Test Description", 
            LocalDateTime.of(2024, 12, 31, 23, 59));
        savedAssignment.setId(1L);
        savedAssignment.setCreatedAt(LocalDateTime.now());
        
        when(assignmentRepository.save(any(Assignment.class))).thenReturn(savedAssignment);
        
        AssignmentCreateDto dto = new AssignmentCreateDto(
            "Test Assignment",
            "Test Description",
            LocalDateTime.of(2024, 12, 31, 23, 59)
        );
          mockMvc.perform(post("/api/assignments/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Assignment"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.completed").value(false));
    }
    
    @Test
    void testGetAllAssignments() throws Exception {
        // Mock 데이터 준비
        Assignment assignment1 = new Assignment("Test Assignment 1", "Description 1", null);
        assignment1.setId(1L);
        assignment1.setCreatedAt(LocalDateTime.now());
        
        Assignment assignment2 = new Assignment("Test Assignment 2", "Description 2", null);
        assignment2.setId(2L);
        assignment2.setCreatedAt(LocalDateTime.now());
        
        when(assignmentRepository.findAll()).thenReturn(Arrays.asList(assignment1, assignment2));
        
        mockMvc.perform(get("/api/assignments/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].title").value("Test Assignment 1"))
                .andExpect(jsonPath("$[1].title").value("Test Assignment 2"));
    }
    
    @Test
    void testCompleteAssignment() throws Exception {
        // Mock 데이터 준비
        Assignment assignment = new Assignment("Test Assignment", "Description", null);
        assignment.setId(1L);
        assignment.setCreatedAt(LocalDateTime.now());
        assignment.setCompleted(false);
        
        Assignment completedAssignment = new Assignment("Test Assignment", "Description", null);
        completedAssignment.setId(1L);
        completedAssignment.setCreatedAt(LocalDateTime.now());
        completedAssignment.setCompleted(true);
        
        when(assignmentRepository.findById(1L)).thenReturn(Optional.of(assignment));
        when(assignmentRepository.save(any(Assignment.class))).thenReturn(completedAssignment);
        
        mockMvc.perform(patch("/api/assignments/1/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }
}
