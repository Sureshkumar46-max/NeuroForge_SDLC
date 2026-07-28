package com.sdlc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BurndownPointDTO {

    private LocalDate date;
    private Integer totalPoints;
    private Integer remainingPoints;
}