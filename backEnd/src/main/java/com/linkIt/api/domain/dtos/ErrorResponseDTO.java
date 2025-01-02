package com.linkIt.api.domain.dtos;

public record ErrorResponseDTO(Integer statusCode, String code, String message) {

}
