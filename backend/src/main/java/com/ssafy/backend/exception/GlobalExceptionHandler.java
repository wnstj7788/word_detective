package com.ssafy.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;

@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * CustomException 처리
     *
     * @param e       CustomException
     * @param request 요청
     * @return 에러 응답
     */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(e.getErrorCode().getCode(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * IOException 처리
     *
     * @param e       IOException
     * @param request 요청
     * @return 에러 응답
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> handleIOException(IOException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.FILE_NOT_FOUND.getCode(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
