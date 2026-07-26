package com.sdlc.backend.controller;

import com.sdlc.backend.model.ProjectHealthSnapshot;
import com.sdlc.backend.service.ProjectHealthSnapshotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectHealthSnapshotController {

    @Autowired
    private ProjectHealthSnapshotService projectHealthSnapshotService;

    // Create Health Snapshot
    @PostMapping("/{projectId}/health")
    public ResponseEntity<ProjectHealthSnapshot> createSnapshot(
            @PathVariable Long projectId,
            @RequestParam String healthStatus,
            @RequestParam Integer completionPercentage) {

        return ResponseEntity.ok(
                projectHealthSnapshotService.createSnapshot(
                        projectId,
                        healthStatus,
                        completionPercentage
                )
        );
    }

    // Get Health History
    @GetMapping("/{projectId}/health")
    public ResponseEntity<List<ProjectHealthSnapshot>> getHealthHistory(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                projectHealthSnapshotService.getHealthHistory(projectId)
        );
    }
}