package com.sdlc.backend.controller;

import com.sdlc.backend.config.JwtUtil;
import com.sdlc.backend.dto.CreateProjectRequest;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JwtUtil jwtUtil;

    // Get All Projects
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER','DEVELOPER','QA_TESTER','CLIENT')")
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(
            @RequestHeader("Authorization") String authHeader) {

        Long orgId = extractOrgId(authHeader);

        return ResponseEntity.ok(projectService.getAllProjects(orgId));
    }

    // Create Project
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PostMapping
    public ResponseEntity<?> createProject(
            @RequestBody CreateProjectRequest request,
            @RequestHeader("Authorization") String authHeader) {

        try {
            Long orgId = extractOrgId(authHeader);
            Project created = projectService.createProject(request, orgId);
            return ResponseEntity.ok(created);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Project By ID
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER','DEVELOPER','QA_TESTER','CLIENT')")
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        Long orgId = extractOrgId(authHeader);

        return ResponseEntity.ok(projectService.getProjectById(id, orgId));
    }

    // Update Project
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody CreateProjectRequest request,
            @RequestHeader("Authorization") String authHeader) {

        Long orgId = extractOrgId(authHeader);

        return ResponseEntity.ok(
                projectService.updateProject(id, request, orgId)
        );
    }

    // Delete Project
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        Long orgId = extractOrgId(authHeader);

        projectService.deleteProject(id, orgId);

        return ResponseEntity.ok("Project deleted successfully");
    }

    // Assign Team to Project
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PutMapping("/{projectId}/team/{teamId}")
    public ResponseEntity<Project> assignTeam(
            @PathVariable Long projectId,
            @PathVariable Long teamId,
            @RequestHeader("Authorization") String authHeader) {

        Long orgId = extractOrgId(authHeader);

        return ResponseEntity.ok(
                projectService.assignTeam(projectId, teamId, orgId)
        );
    }

    private Long extractOrgId(String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer "
        return jwtUtil.extractOrgId(token);
    }
}