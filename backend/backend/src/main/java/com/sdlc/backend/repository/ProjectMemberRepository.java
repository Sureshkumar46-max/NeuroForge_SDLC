package com.sdlc.backend.repository;

import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.ProjectMember;
import com.sdlc.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    List<ProjectMember> findByProject(Project project);

    Optional<ProjectMember> findByProjectAndUser(Project project, User user);
}