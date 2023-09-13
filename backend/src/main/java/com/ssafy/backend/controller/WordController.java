package com.ssafy.backend.controller;

import com.ssafy.backend.dto.WordResponseDto;
import com.ssafy.backend.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/word")
public class WordController {
    private final WordService wordService;

    @GetMapping("/{categoryId}")
    public ResponseEntity<List<WordResponseDto>> getWordByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(wordService.getWordByCategory(categoryId));
    }
}
