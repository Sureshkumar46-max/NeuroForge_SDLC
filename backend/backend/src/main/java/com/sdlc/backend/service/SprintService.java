package com.sdlc.backend.service;

import com.sdlc.backend.dto.CreateSprintRequest;
import com.sdlc.backend.dto.SprintResponseDTO;
import com.sdlc.backend.model.Project;
import com.sdlc.backend.model.Sprint;
import com.sdlc.backend.model.Task;
import com.sdlc.backend.repository.SprintRepository;
import com.sdlc.backend.repository.ProjectRepository;
import com.sdlc.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SprintService {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public SprintResponseDTO createSprint(CreateSprintRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Sprint sprint = Sprint.builder()
                .project(project)
                .name(request.getName())
                .goal(request.getGoal())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(Sprint.SprintStatus.PLANNED)
                .build();

        Sprint saved = sprintRepository.save(sprint);
        return withStats(saved);
    }

    public List<SprintResponseDTO> getSprintsByProject(Long projectId) {
        return sprintRepository.findByProjectId(projectId).stream()
                .map(this::withStats)
                .collect(Collectors.toList());
    }

    public SprintResponseDTO getSprint(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
        return withStats(sprint);
    }

    public SprintResponseDTO startSprint(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
        sprint.setStatus(Sprint.SprintStatus.ACTIVE);
        return withStats(sprintRepository.save(sprint));
    }

    public SprintResponseDTO completeSprint(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
        sprint.setStatus(Sprint.SprintStatus.COMPLETED);
        return withStats(sprintRepository.save(sprint));
    }

    private SprintResponseDTO withStats(Sprint sprint) {
        List<Task> tasks = taskRepository.findBySprintId(sprint.getId());

        int totalTasks = tasks.size();
        int completedTasks = (int) tasks.stream()
                .filter(t -> t.getStatus() == Task.TaskStatus.DONE)
                .count();
        int totalPoints = tasks.stream()
                .mapToInt(t -> t.getStoryPoints() != null ? t.getStoryPoints() : 0)
                .sum();
        int completedPoints = tasks.stream()
                .filter(t -> t.getStatus() == Task.TaskStatus.DONE)
                .mapToInt(t -> t.getStoryPoints() != null ? t.getStoryPoints() : 0)
                .sum();

        SprintResponseDTO dto = SprintResponseDTO.fromEntity(sprint);
        dto.setTotalTasks(totalTasks);
        dto.setCompletedTasks(completedTasks);
        dto.setTotalStoryPoints(totalPoints);
        dto.setCompletedStoryPoints(completedPoints);
        return dto;
    }
}