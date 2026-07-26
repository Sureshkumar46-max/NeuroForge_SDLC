package com.sdlc.backend.repository;

import com.sdlc.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    long countByOrganizationId(Long orgId);

    @Transactional
    @Modifying
    void deleteAllByOrganizationId(Long orgId);
}