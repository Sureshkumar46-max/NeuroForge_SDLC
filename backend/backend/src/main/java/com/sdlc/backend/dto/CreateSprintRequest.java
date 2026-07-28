package com.sdlc.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateSprintRequest {

    private Long projectId;
    private String name;
    private String goal;
    private LocalDate startDate;
    private LocalDate endDate;
}