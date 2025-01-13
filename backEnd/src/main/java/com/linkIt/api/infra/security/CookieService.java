package com.linkIt.api.infra.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CookieService {

    @Value("${app.environment}")
    private String appEnvironment;

    public void createCookie(HttpServletResponse response, String name, String value, String path, boolean httpOnly,
            int maxAgeInMinutes) {

        String cookie = name + "=" + value +
                "; Path=" + path + ";" + (httpOnly ? "HttpOnly;" : "")
                + (appEnvironment.equals("prod") ? "Secure;" : "") +
                "Max-Age=" + (60 * maxAgeInMinutes) + ";SameSite=" + (appEnvironment.equals("prod") ? "None;" : "Lax;");

        response.addHeader("Set-Cookie", cookie);
    }

    public String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name)) {

                return cookie.getValue();
            }
        }
        return null;
    }

    public void deleteCookie(HttpServletResponse response, String name, String path) {
        this.createCookie(response, name, null, path, true, 0);
    }
}
