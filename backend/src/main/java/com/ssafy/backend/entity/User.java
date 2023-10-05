package com.ssafy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "picture")
    private Integer picture;

    @Column(name = "word")
    private Integer word;

    @Column(name = "letter")
    private Integer letter;

    @Column(name = "camera_picture")
    private Integer cameraPicture;

    @Column(name = "camera_word")
    private Integer cameraWord;

    @Column(name = "camera_letter")
    private Integer cameraLetter;

    @PrePersist
    private void prePersist() {
        this.picture = 0;
        this.word = 0;
        this.letter = 0;
        this.cameraPicture = 0;
        this.cameraWord = 0;
        this.cameraLetter = 0;
    }
}