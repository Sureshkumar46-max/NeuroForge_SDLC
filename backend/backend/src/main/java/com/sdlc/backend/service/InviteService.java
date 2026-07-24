package com.sdlc.backend.service;

import com.sdlc.backend.model.Invite;
import com.sdlc.backend.model.Organization;
import com.sdlc.backend.model.Role;
import com.sdlc.backend.model.User;
import com.sdlc.backend.repository.InviteRepository;
import com.sdlc.backend.repository.OrganizationRepository;
import com.sdlc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InviteService {

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private static final int EXPIRY_DAYS = 7;

    // Create Invite
    public Invite createInvite(Long orgId,
                               Long teamId,
                               String invitedEmail,
                               String role,
                               Long invitedBy) {

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusDays(EXPIRY_DAYS);

        Invite invite = new Invite(
                orgId,
                teamId,
                invitedEmail,
                role,
                token,
                expiry,
                invitedBy
        );

        inviteRepository.save(invite);

        // Send Email
        emailService.sendInviteEmail(invitedEmail, token);

        System.out.println("Invite Email Sent Successfully");
        System.out.println("Invite Token : " + token);

        return invite;
    }

    // Get Invites
    public List<Invite> getInvitesForOrg(Long orgId) {
        return inviteRepository.findByOrgId(orgId);
    }

    // Verify Invite
    public boolean isInviteValid(String token) {

        Optional<Invite> inviteOpt = inviteRepository.findByToken(token);

        if (inviteOpt.isEmpty()) {
            return false;
        }

        Invite invite = inviteOpt.get();

        return !invite.isAccepted() && !invite.isExpired();
    }

    // Accept Invite
    public boolean acceptInvite(String token,
                                String name,
                                String password) {

        Optional<Invite> inviteOpt = inviteRepository.findByToken(token);

        if (inviteOpt.isEmpty()) {
            return false;
        }

        Invite invite = inviteOpt.get();

        if (invite.isAccepted() || invite.isExpired()) {
            return false;
        }

        Optional<Organization> orgOpt =
                organizationRepository.findById(invite.getOrgId());

        if (orgOpt.isEmpty()) {
            return false;
        }

        Optional<User> existingUser =
                userRepository.findByEmail(invite.getInvitedEmail());

        User user;

        if (existingUser.isPresent()) {

            user = existingUser.get();

        } else {

            user = new User();
            user.setEmail(invite.getInvitedEmail());
            user.setName(name);
            user.setPassword(passwordEncoder.encode(password));
        }

        user.setRole(Role.valueOf(invite.getRole().trim().toUpperCase()));
        user.setOrganization(orgOpt.get());

        userRepository.save(user);

        invite.setAccepted(true);
        inviteRepository.save(invite);

        return true;
    }
}