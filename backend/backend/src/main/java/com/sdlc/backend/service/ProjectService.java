package com.sdlc.backend.service;

import com.sdlc.backend.dto.CreateProjectRequest;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.repository.OrganizationRepository;
import com.sdlc.backend.repository.ProjectRepository;
import com.sdlc.backend.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private TeamRepository teamRepository;

    // Get All Projects
    public List<Project> getAllProjects(Long orgId) {
        return projectRepository.findByOrganizationId(orgId);
    }

    // Create Project
    public Project createProject(CreateProjectRequest request, Long orgId) {
        if (orgId == null) {
            throw new RuntimeException("User is not part of any organization");
        }

        Organization organization = organizationRepository.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        Project project = new Project();
        project.setName(request.getName());
        project.setMethodology(request.getMethodology());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setTechStackTags(request.getTechStackTags());
        project.setHealthStatus("On Track");
        project.setOrganization(organization);

        return projectRepository.save(project);
    }

    // Get Project By ID
    public Project getProjectById(Long id, Long orgId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        System.out.println("JWT OrgId = " + orgId);
        System.out.println("Project OrgId = " + project.getOrganization().getId());

        if (!project.getOrganization().getId().equals(orgId)) {
            throw new RuntimeException("Access Denied");
        }

        return project;
    }

    // Update Project
    public Project updateProject(Long id, CreateProjectRequest request, Long orgId) {

        Project project = getProjectById(id, orgId);

        project.setName(request.getName());
        project.setMethodology(request.getMethodology());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setTechStackTags(request.getTechStackTags());

        return projectRepository.save(project);
    }

    // Delete Project
    public void deleteProject(Long id, Long orgId) {

        Project project = getProjectById(id, orgId);

        projectRepository.delete(project);
    }

    // Assign Team to Project
    public Project assignTeam(Long projectId, Long teamId, Long orgId) {

        Project project = getProjectById(projectId, orgId);

        Team team = teamRepository.findByIdAndOrganizationId(teamId, orgId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        project.setTeam(team);

        return projectRepository.save(project);
    }
}