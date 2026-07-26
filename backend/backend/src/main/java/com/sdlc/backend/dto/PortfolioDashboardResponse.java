package com.sdlc.backend.dto;

public class PortfolioDashboardResponse {

    private long totalProjects;
    private long onTrack;
    private long atRisk;
    private long delayed;

    public PortfolioDashboardResponse() {
    }

    public PortfolioDashboardResponse(long totalProjects,
                                      long onTrack,
                                      long atRisk,
                                      long delayed) {
        this.totalProjects = totalProjects;
        this.onTrack = onTrack;
        this.atRisk = atRisk;
        this.delayed = delayed;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getOnTrack() {
        return onTrack;
    }

    public void setOnTrack(long onTrack) {
        this.onTrack = onTrack;
    }

    public long getAtRisk() {
        return atRisk;
    }

    public void setAtRisk(long atRisk) {
        this.atRisk = atRisk;
    }

    public long getDelayed() {
        return delayed;
    }

    public void setDelayed(long delayed) {
        this.delayed = delayed;
    }
}