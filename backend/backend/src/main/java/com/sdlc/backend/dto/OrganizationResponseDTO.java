package com.sdlc.backend.dto;

public class OrganizationResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String industry;
    private String companySize;
    private String status;
    private int teams;
    private int members;
    private int projects;

    public OrganizationResponseDTO(Long id, String name, String description, String industry,
                                    String companySize, String status, int teams, int members, int projects) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.industry = industry;
        this.companySize = companySize;
        this.status = status;
        this.teams = teams;
        this.members = members;
        this.projects = projects;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getIndustry() { return industry; }
    public String getCompanySize() { return companySize; }
    public String getStatus() { return status; }
    public int getTeams() { return teams; }
    public int getMembers() { return members; }
    public int getProjects() { return projects; }
}