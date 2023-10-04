package com.ssafy.backend.repository;

import com.ssafy.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, Long> {
    /**
     * 단어 이름으로 조회
     *
     * @param name 단어 이름
     * @return 단어
     */
    Optional<Word> findByName(String name);

    /**
     * 카테고리별 단어 조회
     *
     * @param categoryId 카테고리 아이디
     * @return 카테고리별 단어 리스트
     */
    List<Word> findByCategoryIdOrderById(Long categoryId);

    /**
     * 랜덤으로 단어 조회
     *
     * @param name 답
     * @param cnt  정답 개수
     * @return 랜덤으로 단어 리스트
     */
    @Query(value = "select * from word where word_id not in (select word_id from word where name = ?1) order by rand() limit ?2", nativeQuery = true)
    List<Word> findRandomWord(String name, Long cnt);
}