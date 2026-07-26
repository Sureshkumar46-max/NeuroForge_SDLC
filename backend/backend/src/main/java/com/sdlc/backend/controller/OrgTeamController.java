package com.sdlc.backend.controller;

import com.sdlc.backend.dto.CreateOrganizationRequest;
import com.sdlc.backend.dto.CreateTeamRequest;
import com.sdlc.backend.dto.OrganizationResponseDTO;
import com.sdlc.backend.dto.TeamResponseDTO;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.service.OrgTeamService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orgs")
public class OrgTeamController {

    private final OrgTeamService orgTeamService;

    public OrgTeamController(OrgTeamService orgTeamService) {
        this.orgTeamService = orgTeamService;
    }

    // Create Organization
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping
    public OrganizationResponseDTO createOrg(
            @RequestBody CreateOrganizationRequest req,
            Authentication authentication) {

        String email = authentication.getName();
        Organization org = orgTeamService.createOrganization(req, email);
        return mapToDTO(org);
    }

    // Get All Organizations
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping
    public List<OrganizationResponseDTO> getAllOrgs() {
        return orgTeamService.getAllOrganizations()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get Organization
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @GetMapping("/{orgId}")
    public OrganizationResponseDTO getOrganization(@PathVariable Long orgId) {
        Organization org = orgTeamService.getOrganization(orgId);
        return mapToDTO(org);
    }

    // Update Organization
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @PutMapping("/{orgId}")
    public OrganizationResponseDTO updateOrg(
            @PathVariable Long orgId,
            @RequestBody CreateOrganizationRequest req) {

        Organization org = orgTeamService.updateOrganization(orgId, req);
        return mapToDTO(org);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @DeleteMapping("/{orgId}")
    public String deleteOrg(@PathVariable Long orgId) {
        orgTeamService.deleteOrganization(orgId);
        return "Organization deleted successfully";
    }

    // Create Team
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @PostMapping("/{orgId}/teams")
    public TeamResponseDTO createTeam(
            @PathVariable Long orgId,
            @RequestBody CreateTeamRequest req) {

        Team team = orgTeamService.createTeam(orgId, req);
        return mapToDTO(team);
    }

    // Get Teams
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @GetMapping("/{orgId}/teams")
    public List<TeamResponseDTO> getTeams(@PathVariable Long orgId) {
        return orgTeamService.getTeamsForOrg(orgId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Update Team
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @PutMapping("/teams/{teamId}")
    public TeamResponseDTO updateTeam(
            @PathVariable Long teamId,
            @RequestBody CreateTeamRequest req) {

        Team team = orgTeamService.updateTeam(teamId, req);
        return mapToDTO(team);
    }

    // Delete Team
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('ORG_ADMIN')")
    @DeleteMapping("/{orgId}/teams/{teamId}")
    public String deleteTeam(
            @PathVariable Long orgId,
            @PathVariable Long teamId) {

        orgTeamService.deleteTeam(teamId);
        return "Team deleted successfully";
    }

    private OrganizationResponseDTO mapToDTO(Organization org) {
        int teamCount = orgTeamService.getTeamsForOrg(org.getId()).size();
        int memberCount = orgTeamService.getMemberCount(org.getId());

        return new OrganizationResponseDTO(
                org.getId(),
                org.getName(),
                org.getDescription(),
                org.getIndustry(),
                org.getCompanySize(),
                org.getStatus(),
                teamCount,
                memberCount,
                0 // projects — Module 3 vandhaprm wire pannalam
        );
    }

    private TeamResponseDTO mapToDTO(Team team) {
        return new TeamResponseDTO(
                team.getId(),
                team.getName(),
                team.getOrganization().getId(),
                team.getOrganization().getName());
    }
}