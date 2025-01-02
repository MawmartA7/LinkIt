package com.linkIt.api.infra.scheduler;

import java.sql.Date;
import java.time.Instant;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserSchedulerService {

    private final Scheduler scheduler;

    public void scheduleUserUpdate(String userId, Instant date) {
        try {
            JobDetail jobDetail = JobBuilder.newJob(DeleteteUserAfterNotConfrmEmailJob.class)
                    .withIdentity("DeleteteUserAfterNotConfrmEmailJob-" + userId, "DeleteteUserAfterNotConfrmEmail")
                    .usingJobData("userId", userId)
                    .build();

            System.out.println(Date.from(date));

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("deleteUserTrigger-" + userId, "DeleteteUserAfterNotConfrmEmail")
                    .startAt(Date.from(date))
                    .build();

            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to schedule execute the job", e);
        }
    }
}
