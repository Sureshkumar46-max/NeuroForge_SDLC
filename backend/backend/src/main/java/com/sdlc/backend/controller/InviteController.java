package com.sdlc.backend.controller;

import com.sdlc.backend.dto.InviteResponseDTO;
import com.sdlc.backend.model.Invite;
import com.sdlc.backend.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class InviteController {

    @Autowired
    private InviteService inviteService;

    @PostMapping("/orgs/{orgId}/invites")
    public ResponseEntity<Map<String, String>> createInvite(
            @PathVariable Long orgId,
            @RequestBody Map<String, Object> body) {

        Map<String, String> response = new HashMap<>();

        String email = (String) body.get("email");
        String role = (String) body.get("role");
        Long teamId = body.get("teamId") != null ? Long.valueOf(body.get("teamId").toString()) : null;
        Long invitedBy = body.get("invitedBy") != null ? Long.valueOf(body.get("invitedBy").toString()) : null;

        if (email == null || email.trim().isEmpty()) {
            response.put("message", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }
        if (role == null || role.trim().isEmpty()) {
            response.put("message", "Role is required");
            return ResponseEntity.badRequest().body(response);
        }

        inviteService.createInvite(orgId, teamId, email, role, invitedBy);

        response.put("message", "Invite sent successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orgs/{orgId}/invites")
    public ResponseEntity<List<InviteResponseDTO>> getInvites(@PathVariable Long orgId) {
        List<Invite> invites = inviteService.getInvitesForOrg(orgId);
        List<InviteResponseDTO> dtos = invites.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private InviteResponseDTO mapToDTO(Invite invite) {
        return new InviteResponseDTO(
                invite.getId(),
                invite.getOrgId(),
                invite.getTeamId(),
                invite.getInvitedEmail(),
                invite.getRole(),
                invite.getExpiryDate(),
                invite.getInvitedBy(),
                invite.isAccepted(),
                invite.isExpired()
        );
    }

    @GetMapping("/invites/verify")
    public ResponseEntity<Map<String, Object>> verifyInvite(@RequestParam String token) {
        Map<String, Object> response = new HashMap<>();
        boolean valid = inviteService.isInviteValid(token);
        response.put("valid", valid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/invites/accept")
    public ResponseEntity<Map<String, String>> acceptInvite(@RequestBody Map<String, String> body) {
        Map<String, String> response = new HashMap<>();

        String token = body.get("token");
        String name = body.get("name");
        String password = body.get("password");

        if (token == null || name == null || password == null) {
            response.put("message", "Token, name and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        boolean success = inviteService.acceptInvite(token, name, password);

        if (!success) {
            response.put("message", "Invalid or expired invite");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Invite accepted, account created");
        return ResponseEntity.ok(response);
    }
}