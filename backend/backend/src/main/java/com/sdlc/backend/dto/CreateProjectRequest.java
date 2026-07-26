package com.sdlc.backend.dto;

import java.time.LocalDate;

public class CreateProjectRequest {
    private String name;
    private String methodology;
    private LocalDate startDate;
    private LocalDate endDate;
    private String techStackTags;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMethodology() { return methodology; }
    public void setMethodology(String methodology) { this.methodology = methodology; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getTechStackTags() { return techStackTags; }
    public void setTechStackTags(String techStackTags) { this.techStackTags = techStackTags; }
}