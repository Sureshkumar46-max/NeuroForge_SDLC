package com.sdlc.backend.service;

import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.ProjectHealthSnapshot;
import com.sdlc.backend.repository.ProjectHealthSnapshotRepository;
import com.sdlc.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectHealthSnapshotService {

    @Autowired
    private ProjectHealthSnapshotRepository snapshotRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // Create Health Snapshot
    public ProjectHealthSnapshot createSnapshot(
            Long projectId,
            String healthStatus,
            Integer completionPercentage) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectHealthSnapshot snapshot = new ProjectHealthSnapshot();
        snapshot.setProject(project);
        snapshot.setHealthStatus(healthStatus);
        snapshot.setCompletionPercentage(completionPercentage);
        snapshot.setCreatedAt(LocalDateTime.now());

        return snapshotRepository.save(snapshot);
    }

    // Get Health History
    public List<ProjectHealthSnapshot> getHealthHistory(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return snapshotRepository.findByProject(project);
    }
}