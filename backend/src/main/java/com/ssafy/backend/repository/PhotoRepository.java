package com.ssafy.backend.repository;

import com.ssafy.backend.entity.Photo;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Optional<Photo> findByUserAndWord(User user, Word word);
    void deleteByUserAndWord(User user, Word word);
}