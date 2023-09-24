package com.ssafy.backend.repository;

import com.ssafy.backend.entity.Photo;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    /**
     * 유저와 단어로 사진 조회
     *
     * @param user 유저
     * @param word 단어
     * @return 사진
     */
    Optional<Photo> findByUserAndWord(User user, Word word);

    /**
     * 유저와 단어로 사진 삭제
     *
     * @param user 유저
     * @param word 단어
     */
    void deleteByUserAndWord(User user, Word word);
}