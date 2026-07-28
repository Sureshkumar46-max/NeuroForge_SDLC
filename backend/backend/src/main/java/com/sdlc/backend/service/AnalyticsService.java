package com.sdlc.backend.service;

import com.sdlc.backend.dto.AnalyticsOverviewResponse;
import com.sdlc.backend.dto.ProjectHealthDTO;
import com.sdlc.backend.dto.TaskSliceDTO;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private ProjectRepository projectRepository;

    public AnalyticsOverviewResponse getOverview(Long orgId) {

        List<Project> projects = projectRepository.findByOrganization_Id(orgId);

        long totalBugs = 0;
        long totalCompleted = 0;
        long totalPending = 0;
        long totalInProgress = 0;

        List<ProjectHealthDTO> healthByProject = new ArrayList<>();

        for (Project p : projects) {
            int total = p.getTotalTasks() != null ? p.getTotalTasks() : 0;
            int completed = p.getCompletedTasks() != null ? p.getCompletedTasks() : 0;
            int pending = p.getPendingTasks() != null ? p.getPendingTasks() : 0;
            int bugs = p.getBugs() != null ? p.getBugs() : 0;
            int inProgress = Math.max(total - completed - pending - bugs, 0);

            totalBugs += bugs;
            totalCompleted += completed;
            totalPending += pending;
            totalInProgress += inProgress;

            healthByProject.add(new ProjectHealthDTO(
                    p.getName(),
                    p.getProgress() != null ? p.getProgress() : 0
            ));
        }

        List<TaskSliceDTO> taskDistribution = List.of(
                new TaskSliceDTO("Bugs", totalBugs, "#EF4444"),
                new TaskSliceDTO("Completed", totalCompleted, "#3B82F6"),
                new TaskSliceDTO("In Progress", totalInProgress, "#10B981"),
                new TaskSliceDTO("Pending", totalPending, "#F59E0B")
        );

        return new AnalyticsOverviewResponse(taskDistribution, healthByProject);
    }
}