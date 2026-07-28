package com.sdlc.backend.dto;

import com.sdlc.backend.model.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {

    private Long id;
    private Long sprintId;
    private Long projectId;
    private String title;
    private String description;
    private Task.TaskStatus status;
    private Task.Priority priority;
    private Integer storyPoints;
    private Long assigneeId;
    private String assigneeName;
    private String labels;
    private String specRequirementRef;

    public static TaskResponseDTO fromEntity(Task task) {
        return TaskResponseDTO.builder()
                .id(task.getId())
                .sprintId(task.getSprint() != null ? task.getSprint().getId() : null)
                .projectId(task.getProject().getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .storyPoints(task.getStoryPoints())
                .assigneeId(task.getAssignee() != null ? task.getAssignee().getId() : null)
                .assigneeName(task.getAssignee() != null ? task.getAssignee().getName() : null)
                .labels(task.getLabels())
                .specRequirementRef(task.getSpecRequirementRef())
                .build();
    }
}