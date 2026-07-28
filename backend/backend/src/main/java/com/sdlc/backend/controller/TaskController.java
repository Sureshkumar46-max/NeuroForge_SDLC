package com.sdlc.backend.controller;

import com.sdlc.backend.dto.*;
import com.sdlc.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponseDTO createTask(@RequestBody CreateTaskRequest request) {
        return taskService.createTask(request);
    }

    @GetMapping("/backlog/{projectId}")
    public List<TaskResponseDTO> getBacklog(@PathVariable Long projectId) {
        return taskService.getBacklog(projectId);
    }

    @GetMapping("/board/{sprintId}")
    public BoardResponseDTO getBoard(@PathVariable Long sprintId) {
        return taskService.getBoard(sprintId);
    }

    @PatchMapping("/{id}/status")
    public TaskResponseDTO updateStatus(@PathVariable Long id,
                                         @RequestBody UpdateTaskStatusRequest request,
                                         Authentication authentication) {
        return taskService.updateTaskStatus(id, request, authentication);
    }
}