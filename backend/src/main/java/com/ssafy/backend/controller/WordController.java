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

    /**
     * 카테고리별 단어 조회
     *
     * @param categoryId 카테고리 아이디
     * @return 카테고리별 단어 리스트
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<List<WordResponseDto>> getWordByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(wordService.getWordByCategory(categoryId));
    }

    /**
     * 랜덤으로 단어 조회
     *
     * @param answer     답
     * @param correctCnt 정답 개수
     * @param randCnt    랜덤 개수
     * @return 랜덤으로 단어 리스트
     */
    @GetMapping("")
    public ResponseEntity<List<WordResponseDto>> getWordByRandom(@RequestParam String answer, @RequestParam Long correctCnt, @RequestParam Long randCnt) {
        return ResponseEntity.ok(wordService.getWordByRandom(answer, correctCnt, randCnt));
    }
}
