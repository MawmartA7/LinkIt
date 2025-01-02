package com.linkIt.api.domain.exceptions;

import java.util.Map;

public record ValidationErrorMessageDTO(Integer statusCode, String code, Map<String, String> errors) {
}
