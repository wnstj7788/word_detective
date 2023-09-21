package com.ssafy.backend.service;

import com.ssafy.backend.dto.WordResponseDto;
import com.ssafy.backend.entity.Word;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ErrorCode;
import com.ssafy.backend.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    /**
     * 랜덤 단어 목록 조회
     *
     * @param answer 정답
     * @param cnt    정답의 중복 개수
     * @return 랜덤 단어 목록
     */
    public List<WordResponseDto> getWordByRandom(String answer, Long cnt) {
        Word word = wordRepository.findByName(answer).orElseThrow(
                () -> new CustomException(ErrorCode.WORD_NOT_FOUND)
        );
        final int wordCnt = 8;

        List<WordResponseDto> responseDtos = IntStream.iterate(0, i -> i < cnt, i -> i + 1)
                .mapToObj(i -> WordResponseDto.fromEntity(word))
                .collect(Collectors.toList());
        List<Word> randomWord = wordRepository.findRandomWord(answer, wordCnt - cnt);

        responseDtos.addAll(randomWord.stream().map(WordResponseDto::fromEntity).collect(Collectors.toList()));

        return responseDtos;
    }
}
