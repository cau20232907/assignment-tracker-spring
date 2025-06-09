package com.example.tracker.controller;

import com.example.tracker.dto.AssignmentCreateDto;
import com.example.tracker.model.Assignment;
import com.example.tracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @GetMapping("/")
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }
    
    @PostMapping("/")
    public Assignment createAssignment(@RequestBody AssignmentCreateDto assignmentDto) {
        Assignment assignment = new Assignment(
            assignmentDto.getTitle(),
            assignmentDto.getDescription(),
            assignmentDto.getDueDate()
        );
        return assignmentRepository.save(assignment);
    }
    
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Assignment> completeAssignment(@PathVariable Long id) {
        Optional<Assignment> optionalAssignment = assignmentRepository.findById(id);
        
        if (optionalAssignment.isPresent()) {
            Assignment assignment = optionalAssignment.get();
            assignment.setCompleted(true);
            Assignment updatedAssignment = assignmentRepository.save(assignment);
            return ResponseEntity.ok(updatedAssignment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        if (assignmentRepository.existsById(id)) {
            assignmentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
