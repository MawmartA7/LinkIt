package com.linkIt.api.domain.services;

import java.net.URI;
import java.net.URISyntaxException;

public class UrlService {

    public static String getDomainFromUrl(String url) {
        try {
            URI uri = new URI(url);
            String domain = uri.getHost();
            if (domain != null && domain.startsWith("www.")) {
                domain = domain.substring(4);
            }
            return domain;
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("URL inválida: " + url, e);
        }
    }

}