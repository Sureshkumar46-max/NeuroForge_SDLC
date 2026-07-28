package com.sdlc.backend.dto;

import java.util.List;

public class AnalyticsOverviewResponse {

    private List<TaskSliceDTO> taskDistribution;
    private List<ProjectHealthDTO> healthByProject;

    public AnalyticsOverviewResponse() {
    }

    public AnalyticsOverviewResponse(List<TaskSliceDTO> taskDistribution, List<ProjectHealthDTO> healthByProject) {
        this.taskDistribution = taskDistribution;
        this.healthByProject = healthByProject;
    }

    public List<TaskSliceDTO> getTaskDistribution() {
        return taskDistribution;
    }

    public void setTaskDistribution(List<TaskSliceDTO> taskDistribution) {
        this.taskDistribution = taskDistribution;
    }

    public List<ProjectHealthDTO> getHealthByProject() {
        return healthByProject;
    }

    public void setHealthByProject(List<ProjectHealthDTO> healthByProject) {
        this.healthByProject = healthByProject;
    }
}