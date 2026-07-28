package com.sdlc.backend.service;

import com.sdlc.backend.dto.CreateProjectRequest;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.model.User;
import com.sdlc.backend.repository.OrganizationRepository;
import com.sdlc.backend.repository.ProjectRepository;
import com.sdlc.backend.repository.TeamRepository;
import com.sdlc.backend.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

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
        project.setDescription(request.getDescription());
        project.setMethodology(request.getMethodology());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setTechStackTags(request.getTechStackTags());
        project.setPriority(request.getPriority());

        // Defaults for a new project
        project.setStatus("Active");
        project.setHealthStatus("On Track");
        project.setRiskLevel("Low");
        project.setProgress(0);
        project.setBudgetUsed(0);
        project.setSprint("Sprint 1");
        project.setTotalTasks(0);
        project.setCompletedTasks(0);
        project.setPendingTasks(0);
        project.setBugs(0);
        project.setVelocity(0);

        project.setOrganization(organization);

        if (request.getTeamId() != null) {
            Team team = teamRepository.findByIdAndOrganizationId(request.getTeamId(), orgId)
                    .orElseThrow(() -> new RuntimeException("Team not found"));
            project.setTeam(team);
        }

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            project.setProjectManager(manager);
        }

        return projectRepository.save(project);
    }

    // Get Project By ID
    public Project getProjectById(Long id, Long orgId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOrganization().getId().equals(orgId)) {
            throw new RuntimeException("Access Denied");
        }

        return project;
    }

    // Update Project
    public Project updateProject(Long id, CreateProjectRequest request, Long orgId) {

        Project project = getProjectById(id, orgId);

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setMethodology(request.getMethodology());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setTechStackTags(request.getTechStackTags());
        project.setPriority(request.getPriority());

        if (request.getTeamId() != null) {
            Team team = teamRepository.findByIdAndOrganizationId(request.getTeamId(), orgId)
                    .orElseThrow(() -> new RuntimeException("Team not found"));
            project.setTeam(team);
        }

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            project.setProjectManager(manager);
        }

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