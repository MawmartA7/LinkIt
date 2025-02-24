package com.linkIt.api.domain.models.enums;

public enum ShortenedSortable {
    clicks("clicks"), expiredAt("expiredAt");

    private final String fieldName;

    ShortenedSortable(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }
}
