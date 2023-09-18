package com.ssafy.backend.repository;

import com.ssafy.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<Word> findByName(String name);

    List<Word> findByCategoryIdOrderByNameAsc(Long categoryId);

    @Query(value = "select * from word where word_id not in (select word_id from word where name = ?1) order by rand() limit ?2", nativeQuery = true)
    List<Word> findRandomWord(String name, Long cnt);
}