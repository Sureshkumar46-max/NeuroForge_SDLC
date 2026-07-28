package com.sdlc.backend.service;

import com.sdlc.backend.dto.*;
import com.sdlc.backend.model.*;
import com.sdlc.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskStatusHistoryRepository taskStatusHistoryRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public TaskResponseDTO createTask(CreateTaskRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Sprint sprint = null;
        if (request.getSprintId() != null) {
            sprint = sprintRepository.findById(request.getSprintId())
                    .orElseThrow(() -> new RuntimeException("Sprint not found"));
        }

        User assignee = null;
        if (request.getAssigneeId() != null) {
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new RuntimeException("Assignee not found"));
        }

        Task task = Task.builder()
                .project(project)
                .sprint(sprint)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority() != null ? request.getPriority() : Task.Priority.MEDIUM)
                .storyPoints(request.getStoryPoints())
                .assignee(assignee)
                .labels(request.getLabels())
                .specRequirementRef(request.getSpecRequirementRef())
                .status(Task.TaskStatus.TODO)
                .build();

        Task saved = taskRepository.save(task);
        broadcastBoardUpdate(saved);
        return TaskResponseDTO.fromEntity(saved);
    }

    public List<TaskResponseDTO> getBacklog(Long projectId) {
        return taskRepository.findByProjectIdAndSprintIsNull(projectId).stream()
                .map(TaskResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public BoardResponseDTO getBoard(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
        List<Task> tasks = taskRepository.findBySprintId(sprintId);

        return BoardResponseDTO.builder()
                .sprintId(sprint.getId())
                .sprintName(sprint.getName())
                .todo(filterByStatus(tasks, Task.TaskStatus.TODO))
                .inProgress(filterByStatus(tasks, Task.TaskStatus.IN_PROGRESS))
                .codeReview(filterByStatus(tasks, Task.TaskStatus.CODE_REVIEW))
                .testing(filterByStatus(tasks, Task.TaskStatus.TESTING))
                .done(filterByStatus(tasks, Task.TaskStatus.DONE))
                .build();
    }

    public TaskResponseDTO updateTaskStatus(Long taskId, UpdateTaskStatusRequest request, Authentication authentication) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Task.TaskStatus from = task.getStatus();
        Task.TaskStatus to = request.getStatus();

        if (to == Task.TaskStatus.DONE && !canMoveToDone(authentication)) {
            throw new RuntimeException("Only QA can move a task to Done");
        }

        task.setStatus(to);
        Task saved = taskRepository.save(task);

        User changedBy = userRepository.findByEmail(authentication.getName()).orElse(null);
        TaskStatusHistory history = TaskStatusHistory.builder()
                .task(saved)
                .fromStatus(from)
                .toStatus(to)
                .changedBy(changedBy)
                .build();
        taskStatusHistoryRepository.save(history);

        broadcastBoardUpdate(saved);
        return TaskResponseDTO.fromEntity(saved);
    }

    private boolean canMoveToDone(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(a -> {
                    String role = a.getAuthority();
                    return role.contains("QA_TESTER")
                            || role.contains("PROJECT_MANAGER")
                            || role.contains("ORG_ADMIN")
                            || role.contains("SUPER_ADMIN");
                });
    }

    private List<TaskResponseDTO> filterByStatus(List<Task> tasks, Task.TaskStatus status) {
        return tasks.stream()
                .filter(t -> t.getStatus() == status)
                .map(TaskResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private void broadcastBoardUpdate(Task task) {
        if (task.getSprint() == null) return;
        BoardResponseDTO board = getBoard(task.getSprint().getId());
        messagingTemplate.convertAndSend("/topic/sprint/" + task.getSprint().getId() + "/board", board);
    }
}