package com.sdlc.backend.Scheduler;

import com.sdlc.backend.model.Sprint;
import com.sdlc.backend.model.StoryPointSnapshot;
import com.sdlc.backend.model.Task;
import com.sdlc.backend.repository.SprintRepository;
import com.sdlc.backend.repository.StoryPointSnapshotRepository;
import com.sdlc.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BurndownSnapshotScheduler {

    private final SprintRepository sprintRepository;
    private final TaskRepository taskRepository;
    private final StoryPointSnapshotRepository storyPointSnapshotRepository;

    @Scheduled(cron = "0 0 1 * * *")
    public void takeNightlySnapshot() {
        List<Sprint> activeSprints = sprintRepository.findAll().stream()
                .filter(s -> s.getStatus() == Sprint.SprintStatus.ACTIVE)
                .toList();

        for (Sprint sprint : activeSprints) {
            List<Task> tasks = taskRepository.findBySprintId(sprint.getId());

            int totalPoints = tasks.stream()
                    .mapToInt(t -> t.getStoryPoints() != null ? t.getStoryPoints() : 0)
                    .sum();

            int remainingPoints = tasks.stream()
                    .filter(t -> t.getStatus() != Task.TaskStatus.DONE)
                    .mapToInt(t -> t.getStoryPoints() != null ? t.getStoryPoints() : 0)
                    .sum();

            StoryPointSnapshot snapshot = StoryPointSnapshot.builder()
                    .sprint(sprint)
                    .snapshotDate(LocalDate.now())
                    .totalPoints(totalPoints)
                    .remainingPoints(remainingPoints)
                    .build();

            storyPointSnapshotRepository.save(snapshot);
        }
    }
}