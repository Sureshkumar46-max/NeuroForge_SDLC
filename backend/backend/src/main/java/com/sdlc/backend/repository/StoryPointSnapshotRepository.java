package com.sdlc.backend.repository;

import com.sdlc.backend.model.StoryPointSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryPointSnapshotRepository extends JpaRepository<StoryPointSnapshot, Long> {

    List<StoryPointSnapshot> findBySprintIdOrderBySnapshotDateAsc(Long sprintId);
}