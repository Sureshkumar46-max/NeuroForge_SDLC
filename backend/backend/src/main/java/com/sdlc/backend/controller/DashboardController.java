package com.sdlc.backend.controller;

import com.sdlc.backend.config.JwtUtil;
import com.sdlc.backend.dto.PortfolioDashboardResponse;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.repository.ProjectRepository;
import com.sdlc.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // 1. Dashboard Stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    // 2. Get All Projects
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    // 3. Create Project
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    // 4. Portfolio Dashboard
    @GetMapping("/portfolio")
    public ResponseEntity<PortfolioDashboardResponse> getPortfolioDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7); // Remove "Bearer "
        Long orgId = jwtUtil.extractOrgId(token);

        return ResponseEntity.ok(
                dashboardService.getPortfolioDashboard(orgId)
        );
    }
}