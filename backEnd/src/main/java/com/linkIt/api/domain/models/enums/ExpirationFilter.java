package com.linkIt.api.domain.models.enums;

public enum ExpirationFilter {
    all("all"), expired("expired"), active("active");

    private final String filter;

    ExpirationFilter(String filter) {
        this.filter = filter;
    }

    public String getFilter() {
        return filter;
    }

}
