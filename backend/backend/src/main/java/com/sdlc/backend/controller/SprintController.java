package com.sdlc.backend.controller;

import com.sdlc.backend.dto.CreateSprintRequest;
import com.sdlc.backend.dto.SprintResponseDTO;
import com.sdlc.backend.service.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprints")
@RequiredArgsConstructor
public class SprintController {

    private final SprintService sprintService;

    @PostMapping
    public SprintResponseDTO createSprint(@RequestBody CreateSprintRequest request) {
        return sprintService.createSprint(request);
    }

    @GetMapping("/project/{projectId}")
    public List<SprintResponseDTO> getSprintsByProject(@PathVariable Long projectId) {
        return sprintService.getSprintsByProject(projectId);
    }

    @GetMapping("/{sprintId}")
    public SprintResponseDTO getSprint(@PathVariable Long sprintId) {
        return sprintService.getSprint(sprintId);
    }

    @PatchMapping("/{sprintId}/start")
    public SprintResponseDTO startSprint(@PathVariable Long sprintId) {
        return sprintService.startSprint(sprintId);
    }

    @PatchMapping("/{sprintId}/complete")
    public SprintResponseDTO completeSprint(@PathVariable Long sprintId) {
        return sprintService.completeSprint(sprintId);
    }
}