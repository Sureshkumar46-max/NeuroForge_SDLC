package com.sdlc.backend.service;

import com.sdlc.backend.dto.CreateOrganizationRequest;
import com.sdlc.backend.dto.CreateTeamRequest;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Team;
import com.sdlc.backend.model.User;
import com.sdlc.backend.repository.OrganizationRepository;
import com.sdlc.backend.repository.TeamRepository;
import com.sdlc.backend.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;



import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OrgTeamService {

    private final OrganizationRepository orgRepo;
    private final TeamRepository teamRepo;
    private final UserRepository userRepo;

    public OrgTeamService(
            OrganizationRepository orgRepo,
            TeamRepository teamRepo,
            UserRepository userRepo) {

        this.orgRepo = orgRepo;
        this.teamRepo = teamRepo;
        this.userRepo = userRepo;
    }

    // Create Organization
    public Organization createOrganization(
            CreateOrganizationRequest req,
            String creatorEmail) {

        User creator = userRepo.findByEmail(creatorEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + creatorEmail));

        Organization org = new Organization();
        org.setName(req.getName());
        org.setDescription(req.getDescription());
        org.setIndustry(req.getIndustry());
        org.setCompanySize(req.getCompanySize());
        org.setStatus("Active");
        org.setCreatedBy(creator.getId());

        return orgRepo.save(org);
    }

    // Get All Organizations
    public List<Organization> getAllOrganizations() {
        return orgRepo.findAll();
    }

    // Get Organization By Id
    public Organization getOrganization(Long orgId) {
        return orgRepo.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
    }

    // Update Organization
    public Organization updateOrganization(
            Long orgId,
            CreateOrganizationRequest req) {

        Organization org = getOrganization(orgId);

        org.setName(req.getName());
        org.setDescription(req.getDescription());
        org.setIndustry(req.getIndustry());
        org.setCompanySize(req.getCompanySize());

        return orgRepo.save(org);
    }

    // Delete Organization
    @Transactional
    public void deleteOrganization(Long orgId) {

        Organization org = getOrganization(orgId);

        // 1. Delete users
        userRepo.deleteAllByOrganizationId(orgId);

        // 2. Delete teams
        teamRepo.deleteByOrganizationId(orgId);

        // 3. Delete organization
        orgRepo.delete(org);
    }

    // Create Team
    public Team createTeam(
            Long orgId,
            CreateTeamRequest req) {

        Organization org = getOrganization(orgId);

        Team team = new Team();
        team.setName(req.getName());
        team.setOrganization(org);

        return teamRepo.save(team);
    }

    // Get Teams
    public List<Team> getTeamsForOrg(Long orgId) {
        return teamRepo.findByOrganizationId(orgId);
    }

    // Update Team
    public Team updateTeam(
            Long teamId,
            CreateTeamRequest req) {

        Team team = teamRepo.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setName(req.getName());

        return teamRepo.save(team);
    }

    // Delete Team
    public void deleteTeam(Long teamId) {

        Team team = teamRepo.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        teamRepo.delete(team);
    }

    // Member Count
    public int getMemberCount(Long orgId) {
        return (int) userRepo.countByOrganizationId(orgId);
    }
}