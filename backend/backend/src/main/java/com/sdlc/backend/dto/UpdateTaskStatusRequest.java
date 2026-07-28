package com.sdlc.backend.dto;

import com.sdlc.backend.model.Task;
import lombok.Data;

@Data
public class UpdateTaskStatusRequest {

    private Task.TaskStatus status;
}