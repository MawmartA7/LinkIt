package com.linkIt.api.domain.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.linkIt.api.domain.exceptions.recaptcha.RecaptchaException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecaptchaService {

    @Value("${recaptcha.secret-key}")
    private String secretKey;

    public boolean verifyRecaptcha(String token) {
        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token;

        WebClient webClient = WebClient.create();

        Map<String, Object> response = webClient.post()
                .uri(url)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response != null) {
            Boolean success = (Boolean) response.get("success");
            Double score = (Double) response.get("score");

            return success != null && success && score != null && score >= 0.5;
        }

        throw new RecaptchaException();
    }
}
