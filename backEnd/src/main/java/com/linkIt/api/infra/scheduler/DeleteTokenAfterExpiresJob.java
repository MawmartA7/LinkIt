package com.linkIt.api.infra.scheduler;

import java.util.UUID;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.linkIt.api.domain.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DeleteTokenAfterExpiresJob implements Job {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        UUID tokenId = UUID.fromString(context.getJobDetail().getJobDataMap().getString("tokenId"));

        refreshTokenRepository.findById(tokenId).ifPresent(token -> {
            refreshTokenRepository.delete(token);
        });
    }

}
