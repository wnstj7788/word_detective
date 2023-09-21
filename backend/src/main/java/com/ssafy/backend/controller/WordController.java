package com.ssafy.backend.controller;

import com.ssafy.backend.dto.WordResponseDto;
import com.ssafy.backend.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public ResponseEntity<List<WordResponseDto>> getWordByRandom(@RequestParam String answer, @RequestParam Long correctCnt, @RequestParam Long randCnt) {
        return ResponseEntity.ok(wordService.getWordByRandom(answer, correctCnt, randCnt));
    }
}
