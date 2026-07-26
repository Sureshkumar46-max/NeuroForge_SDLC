package com.sdlc.backend.controller;

import com.sdlc.backend.model.Milestone;
import com.sdlc.backend.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    // Create Milestone
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PostMapping("/projects/{projectId}/milestones")
    public ResponseEntity<Milestone> createMilestone(
            @PathVariable Long projectId,
            @RequestBody Milestone milestone) {

        return ResponseEntity.ok(
                milestoneService.createMilestone(projectId, milestone)
        );
    }

    // Get All Milestones
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER','DEVELOPER','QA_TESTER','CLIENT')")
    @GetMapping("/projects/{projectId}/milestones")
    public ResponseEntity<List<Milestone>> getMilestones(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                milestoneService.getMilestones(projectId)
        );
    }

    // Update Milestone
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PutMapping("/milestones/{id}")
    public ResponseEntity<Milestone> updateMilestone(
            @PathVariable Long id,
            @RequestBody Milestone milestone) {

        return ResponseEntity.ok(
                milestoneService.updateMilestone(id, milestone)
        );
    }

    // Delete Milestone
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @DeleteMapping("/milestones/{id}")
    public ResponseEntity<String> deleteMilestone(
            @PathVariable Long id) {

        milestoneService.deleteMilestone(id);

        return ResponseEntity.ok("Milestone deleted successfully");
    }
}