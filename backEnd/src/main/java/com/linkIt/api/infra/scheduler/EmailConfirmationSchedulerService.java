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
public class EmailConfirmationSchedulerService {

    private final Scheduler scheduler;

    public void scheduleEmailConfirmExpired(String email, Instant date) {
        try {
            JobDetail jobDetail = JobBuilder.newJob(DeleteEmailConfirmAfterExpires.class)
                    .withIdentity("DeleteEmailConfirmAfterExpiresJob-" + email, "DeleteEmailConfirmAfterExpires")
                    .usingJobData("email", email)
                    .build();

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("DeleteEmailConfirmation-" + email, "DeleteEmailConfirmAfterExpires")
                    .startAt(Date.from(date))
                    .build();

            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to schedule execute the job", e);
        }
    }

}