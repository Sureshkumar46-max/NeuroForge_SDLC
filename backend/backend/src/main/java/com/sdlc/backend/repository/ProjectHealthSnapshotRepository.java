package com.sdlc.backend.repository;

import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.ProjectHealthSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectHealthSnapshotRepository
        extends JpaRepository<ProjectHealthSnapshot, Long> {

    List<ProjectHealthSnapshot> findByProject(Project project);
}