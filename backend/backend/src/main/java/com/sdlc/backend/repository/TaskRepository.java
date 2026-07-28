package com.sdlc.backend.repository;

import com.sdlc.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findBySprintId(Long sprintId);

    List<Task> findByProjectId(Long projectId);

    List<Task> findBySprintIdAndStatus(Long sprintId, Task.TaskStatus status);

    List<Task> findByAssigneeId(Long assigneeId);

    List<Task> findByProjectIdAndSprintIsNull(Long projectId);
}