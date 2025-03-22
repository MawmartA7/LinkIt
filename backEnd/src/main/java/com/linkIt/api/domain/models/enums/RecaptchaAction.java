package com.linkIt.api.domain.models.enums;

public enum RecaptchaAction {
    contact("contact"), login("login"), register("register");

    private final String action;

    RecaptchaAction(String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }

    public static boolean VerifyValue(String value) {
        for (RecaptchaAction action : RecaptchaAction.values()) {
            if (action.getAction().equals(value)) {
                return true;
            }
        }
        return false;
    }
}
