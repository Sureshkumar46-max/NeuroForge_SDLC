package com.sdlc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponseDTO {

    private Long sprintId;
    private String sprintName;
    private List<TaskResponseDTO> todo;
    private List<TaskResponseDTO> inProgress;
    private List<TaskResponseDTO> codeReview;
    private List<TaskResponseDTO> testing;
    private List<TaskResponseDTO> done;
}