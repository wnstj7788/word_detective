package com.ssafy.backend.controller;

import com.ssafy.backend.dto.UserRequestDto;
import com.ssafy.backend.dto.UserResponseDto;
import com.ssafy.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * 유저 스테이지 클리어
     *
     * @param userId         유저 아이디
     * @param userRequestDto 유저 정보
     */
    @PostMapping("stage/{userId}")
    public ResponseEntity<UserResponseDto> updateClear(
            @PathVariable("userId") Long userId,
            @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.updateClear(userId, userRequestDto));
    }
}