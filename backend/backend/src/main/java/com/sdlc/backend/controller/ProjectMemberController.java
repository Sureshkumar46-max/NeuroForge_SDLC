package com.sdlc.backend.controller;

import com.sdlc.backend.model.ProjectMember;
import com.sdlc.backend.service.ProjectMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectMemberController {

    @Autowired
    private ProjectMemberService projectMemberService;

    // Add Member
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @PostMapping("/{projectId}/members")
    public ResponseEntity<ProjectMember> addMember(
            @PathVariable Long projectId,
            @RequestParam Long userId,
            @RequestParam String projectRole) {

        return ResponseEntity.ok(
                projectMemberService.addMember(projectId, userId, projectRole)
        );
    }

    // Get Members
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER','DEVELOPER','QA_TESTER','CLIENT')")
    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<ProjectMember>> getMembers(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                projectMemberService.getMembers(projectId)
        );
    }

    // Remove Member
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ORG_ADMIN','PROJECT_MANAGER')")
    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<String> removeMember(
            @PathVariable Long memberId) {

        projectMemberService.removeMember(memberId);

        return ResponseEntity.ok("Member removed successfully");
    }
}