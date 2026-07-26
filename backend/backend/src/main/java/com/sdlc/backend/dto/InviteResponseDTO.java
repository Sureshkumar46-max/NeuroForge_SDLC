package com.sdlc.backend.dto;

import java.time.LocalDateTime;

public class InviteResponseDTO {
    private Long id;
    private Long orgId;
    private Long teamId;
    private String invitedEmail;
    private String role;
    private LocalDateTime expiryDate;
    private Long invitedBy;
    private boolean accepted;
    private boolean expired;

    public InviteResponseDTO(Long id, Long orgId, Long teamId, String invitedEmail,
                              String role, LocalDateTime expiryDate, Long invitedBy,
                              boolean accepted, boolean expired) {
        this.id = id;
        this.orgId = orgId;
        this.teamId = teamId;
        this.invitedEmail = invitedEmail;
        this.role = role;
        this.expiryDate = expiryDate;
        this.invitedBy = invitedBy;
        this.accepted = accepted;
        this.expired = expired;
    }

    public Long getId() { return id; }
    public Long getOrgId() { return orgId; }
    public Long getTeamId() { return teamId; }
    public String getInvitedEmail() { return invitedEmail; }
    public String getRole() { return role; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public Long getInvitedBy() { return invitedBy; }
    public boolean isAccepted() { return accepted; }
    public boolean isExpired() { return expired; }
}