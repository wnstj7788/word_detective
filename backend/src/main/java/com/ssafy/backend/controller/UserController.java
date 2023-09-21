package com.ssafy.backend.controller;

import com.ssafy.backend.dto.UserResponseDto;
import com.ssafy.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<UserResponseDto> getUserInfoOrCreate(@RequestParam(required = false) UUID userId) {
        return ResponseEntity.ok(userService.getUserInfoOrCreate(userId));
    }
}