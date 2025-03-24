package com.linkIt.api.domain.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.linkIt.api.domain.exceptions.recaptcha.RecaptchaException;
import com.linkIt.api.domain.models.enums.RecaptchaAction;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecaptchaService {

    @Value("${recaptcha.secret-key}")
    private String secretKey;

    public boolean verifyRecaptcha(String token, RecaptchaAction currentAction) {

        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token;

        WebClient webClient = WebClient.create();

        Map<String, Object> response = webClient.post()
                .uri(url)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response != null && (Boolean) response.get("success")) {
            if (!RecaptchaAction.VerifyValue((String) response.get("action"))
                    && currentAction.equals((RecaptchaAction) response.get("action"))) {
                throw new RecaptchaException("Invalid action");
            }

            Double score = (Double) response.get("score");

            return score != null && score >= 0.5;
        }

        throw new RecaptchaException();
    }
}
