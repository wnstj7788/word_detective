package com.ssafy.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 서비스 에러 : 서버 내부 에러
    SERVICE_ERROR("SERVICE_ERROR", "서비스 에러"),
    // 검증 에러 : 클라이언트 요청값 검증 에러
    VALIDATION_ERROR("VALIDATION_ERROR", "검증 에러"),
    // 해당 값이 없을때
    NOT_FOUND("NOT_FOUND", "해당 값이 없음"),
    // 이미 존재할때
    ALREADY_EXIST("ALREADY_EXIST", "이미 존재함"),
    // 권한이 없을때
    UNAUTHORIZED("UNAUTHORIZED", "권한 없음");

    private final String code;
    private final String description;
}
