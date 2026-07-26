package com.sdlc.backend.repository;

import com.sdlc.backend.model.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InviteRepository extends JpaRepository<Invite, Long> {

    Optional<Invite> findByToken(String token);

    List<Invite> findByOrgId(Long orgId);

    List<Invite> findByInvitedEmail(String invitedEmail);
}