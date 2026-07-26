package com.sdlc.backend.service;

import com.sdlc.backend.dto.PortfolioDashboardResponse;
import com.sdlc.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private ProjectRepository projectRepository;

    // Existing Dashboard
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("activeSprints", 3);
        stats.put("openIssues", 42);
        stats.put("pipelineHealth", "98.4%");
        stats.put("deploymentVelocity", "4.2/day");

        return stats;
    }

    // Portfolio Dashboard
    public PortfolioDashboardResponse getPortfolioDashboard(Long orgId) {

        long totalProjects =
                projectRepository.countByOrganizationId(orgId);

        long onTrackCount =
                projectRepository.countByOrganizationIdAndHealthStatus(
                        orgId, "On Track");

        long atRiskCount =
                projectRepository.countByOrganizationIdAndHealthStatus(
                        orgId, "At Risk");

        long delayedCount =
                projectRepository.countByOrganizationIdAndHealthStatus(
                        orgId, "Delayed");

        return new PortfolioDashboardResponse(
                totalProjects,
                onTrackCount,
                atRiskCount,
                delayedCount
        );
    }
}