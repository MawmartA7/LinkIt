package com.linkIt.api.domain.models.enums;

public enum ContactSubject {
    QUESTION("question", "Questions about LinkIt"),
    SUGGESTION("suggestion", "Suggestion for improvement"),
    BUG("bug", "Report a bug / error"),
    REMOVAL("removal", "Link removal request"),
    ABUSE_REPORT("abuse-report", "Report abuse or illegal content"),
    OTHER("other", "Other");

    private String value;
    private String message;

    ContactSubject(String value, String message) {
        this.value = value;
        this.message = message;
    }

    public String getValor() {
        return value;
    }

    public String getMessage() {
        return message;
    }

    public static ContactSubject fromValue(String value) {
        for (ContactSubject status : ContactSubject.values()) {
            if (status.getValor().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Valor inválido: " + value);
    }
}
