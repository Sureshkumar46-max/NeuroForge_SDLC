package com.sdlc.backend.repository;

import com.sdlc.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Get all projects by organization
    List<Project> findByOrganizationId(Long orgId);

    // Portfolio Dashboard Counts
    long countByHealthStatus(String healthStatus);

    long countByOrganizationId(Long orgId);

    long countByOrganizationIdAndHealthStatus(Long orgId, String healthStatus);
}