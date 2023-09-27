package com.ssafy.backend.controller;

import com.ssafy.backend.dto.UserResponseDto;
import com.ssafy.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    /**
     * 유저 정보 조회 또는 생성
     *
     * @param userId 유저 아이디
     * @return 유저 정보
     */
    @GetMapping("")
    public ResponseEntity<UserResponseDto> getUserInfoOrCreate(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(userService.getUserInfoOrCreate(userId));
    }
}