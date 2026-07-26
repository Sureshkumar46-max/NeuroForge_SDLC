package com.sdlc.backend.dto;

public class TeamResponseDTO {
    private Long id;
    private String name;
    private Long organizationId;
    private String organizationName;

    public TeamResponseDTO(Long id, String name, Long organizationId, String organizationName) {
        this.id = id;
        this.name = name;
        this.organizationId = organizationId;
        this.organizationName = organizationName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getOrganizationId() { return organizationId; }
    public void setOrganizationId(Long organizationId) { this.organizationId = organizationId; }

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }
}