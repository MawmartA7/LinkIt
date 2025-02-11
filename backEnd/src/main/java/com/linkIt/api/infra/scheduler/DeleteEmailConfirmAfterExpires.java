package com.linkIt.api.infra.scheduler;

import java.time.LocalDateTime;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.linkIt.api.domain.repositories.EmailConfirmationRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DeleteEmailConfirmAfterExpires implements Job {

    private final EmailConfirmationRepository emailConfirmationRepository;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String email = context.getJobDetail().getJobDataMap().getString("email");

        emailConfirmationRepository.findByEmail(email).ifPresent(emailConfirmation -> {
            if (emailConfirmation.getExpiresAt().isBefore(LocalDateTime.now())) {
                emailConfirmationRepository.delete(emailConfirmation);
            }
        });
    }

}
