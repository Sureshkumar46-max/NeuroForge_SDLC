package com.sdlc.backend.dto;

import com.sdlc.backend.model.Sprint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SprintResponseDTO {

    private Long id;
    private Long projectId;
    private String name;
    private String goal;
    private LocalDate startDate;
    private LocalDate endDate;
    private Sprint.SprintStatus status;
    private int totalTasks;
    private int completedTasks;
    private int totalStoryPoints;
    private int completedStoryPoints;

    public static SprintResponseDTO fromEntity(Sprint sprint) {
        return SprintResponseDTO.builder()
                .id(sprint.getId())
                .projectId(sprint.getProject().getId())
                .name(sprint.getName())
                .goal(sprint.getGoal())
                .startDate(sprint.getStartDate())
                .endDate(sprint.getEndDate())
                .status(sprint.getStatus())
                .build();
    }
}