package com.sdlc.backend.service;

import com.sdlc.backend.model.Milestone;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.repository.MilestoneRepository;
import com.sdlc.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // Create Milestone
    public Milestone createMilestone(Long projectId, Milestone milestone) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        milestone.setProject(project);

        if (milestone.getStatus() == null || milestone.getStatus().isEmpty()) {
            milestone.setStatus("Pending");
        }

        return milestoneRepository.save(milestone);
    }

    // Get All Milestones
    public List<Milestone> getMilestones(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return milestoneRepository.findByProject(project);
    }

    // Update Milestone
    public Milestone updateMilestone(Long id, Milestone updatedMilestone) {

        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));

        milestone.setTitle(updatedMilestone.getTitle());
        milestone.setDueDate(updatedMilestone.getDueDate());
        milestone.setStatus(updatedMilestone.getStatus());

        return milestoneRepository.save(milestone);
    }

    // Delete Milestone
    public void deleteMilestone(Long id) {

        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));

        milestoneRepository.delete(milestone);
    }
}