package com.linkIt.api.infra.scheduler;

import java.util.UUID;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.linkIt.api.domain.repositories.EmailConfirmationRepository;
import com.linkIt.api.domain.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DeleteteUserAfterNotConfrmEmailJob implements Job {

    private final UserRepository userRepository;
    private final EmailConfirmationRepository emailConfirmationRepository;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        UUID userId = UUID.fromString(context.getJobDetail().getJobDataMap().getString("userId"));

        userRepository.findById(userId).ifPresent(user -> {
            if (!user.isEmailConfirmed()) {
                userRepository.delete(user);
            }
            emailConfirmationRepository.deleteByEmail(user.getLogin());
        });
        System.out.println("job completed");
    }
}
