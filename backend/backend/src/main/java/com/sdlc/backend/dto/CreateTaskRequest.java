package com.sdlc.backend.dto;

import com.sdlc.backend.model.Task;
import lombok.Data;

@Data
public class CreateTaskRequest {

    private Long projectId;
    private Long sprintId;
    private String title;
    private String description;
    private Task.Priority priority;
    private Integer storyPoints;
    private Long assigneeId;
    private String labels;
    private String specRequirementRef;
}