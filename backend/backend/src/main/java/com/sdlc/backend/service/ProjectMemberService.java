package com.sdlc.backend.service;

import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.ProjectMember;
import com.sdlc.backend.model.User;
import com.sdlc.backend.repository.ProjectMemberRepository;
import com.sdlc.backend.repository.ProjectRepository;
import com.sdlc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectMemberService {

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    // Add Member
    public ProjectMember addMember(Long projectId, Long userId, String projectRole) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(user);
        member.setProjectRole(projectRole);

        return projectMemberRepository.save(member);
    }

    // Get Members
    public List<ProjectMember> getMembers(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return projectMemberRepository.findByProject(project);
    }

    // Remove Member
    public void removeMember(Long memberId) {

        ProjectMember member = projectMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        projectMemberRepository.delete(member);
    }
}