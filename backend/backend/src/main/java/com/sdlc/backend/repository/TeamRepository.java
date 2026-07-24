package com.sdlc.backend.repository;

import com.sdlc.backend.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findByOrganizationId(Long orgId);

    Optional<Team> findByIdAndOrganizationId(Long teamId, Long orgId);

    @Transactional
    @Modifying
    void deleteByOrganizationId(Long orgId);
}