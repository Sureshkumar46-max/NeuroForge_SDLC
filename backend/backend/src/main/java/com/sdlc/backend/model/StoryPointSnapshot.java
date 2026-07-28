package com.sdlc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "story_point_snapshots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoryPointSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id", nullable = false)
    private Sprint sprint;

    @Column(name = "snapshot_date", nullable = false)
    private LocalDate snapshotDate;

    @Column(name = "total_points", nullable = false)
    private Integer totalPoints;

    @Column(name = "remaining_points", nullable = false)
    private Integer remainingPoints;
}