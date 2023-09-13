package com.ssafy.backend.service;

import com.ssafy.backend.dto.WordResponseDto;
import com.ssafy.backend.entity.Word;
import com.ssafy.backend.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    /**
     * 카테고리별 단어 목록 조회
     *
     * @param categoryId 카테고리 ID
     * @return 카테고리별 단어 목록
     */
    public List<WordResponseDto> getWordByCategory(Long categoryId) {
        List<Word> words = wordRepository.findByCategoryIdOrderByNameAsc(categoryId);
        return words.stream().map(WordResponseDto::fromEntity).collect(Collectors.toList());
    }
}
