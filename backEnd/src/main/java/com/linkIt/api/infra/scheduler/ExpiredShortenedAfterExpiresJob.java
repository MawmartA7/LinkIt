package com.linkIt.api.infra.scheduler;

import java.time.LocalDateTime;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.linkIt.api.domain.models.enums.ShortenedStatus;
import com.linkIt.api.domain.repositories.ShortenedRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExpiredShortenedAfterExpiresJob implements Job {

    private final ShortenedRepository repository;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String shortenedCode = context.getJobDetail().getJobDataMap().getString("shortenedCode");

        repository.findById(shortenedCode).ifPresent(shortened -> {
            if (shortened.getExpiredAt().isBefore(LocalDateTime.now())) {
                shortened.setStatus(ShortenedStatus.expired);
                repository.save(shortened);
            }
        });
    }

}
