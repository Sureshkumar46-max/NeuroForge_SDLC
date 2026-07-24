package com.sdlc.backend.Scheduler;

import com.sdlc.backend.model.Project;
import com.sdlc.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class ProjectHealthScheduler {

    @Autowired
    private ProjectRepository projectRepository;

    // Testing: Every 30 seconds
    // Production:
    // @Scheduled(cron = "0 0 0 * * ?")
    @Scheduled(fixedRate = 30000)
    public void updateProjectHealth() {

        System.out.println("===== Project Health Scheduler Started =====");

        List<Project> projects = projectRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Project project : projects) {

            // Skip if dates are not available
            if (project.getStartDate() == null || project.getEndDate() == null) {
                System.out.println("Project: " + project.getName() + " -> Missing dates");
                continue;
            }

            long daysRemaining = ChronoUnit.DAYS.between(today, project.getEndDate());

            // Calculate Health Status
            if (today.isAfter(project.getEndDate())) {

                project.setHealthStatus("Delayed");

            } else if (daysRemaining <= 7) {

                project.setHealthStatus("At Risk");

            } else {

                project.setHealthStatus("On Track");
            }

            projectRepository.save(project);

            System.out.println(
                    "Project: " + project.getName()
                            + " | Health: " + project.getHealthStatus()
                            + " | Days Remaining: " + daysRemaining
            );
        }

        System.out.println("===== Project Health Scheduler Finished =====");
    }
}