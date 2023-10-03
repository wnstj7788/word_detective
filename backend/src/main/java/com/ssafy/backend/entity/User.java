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
    private Long id;

    @Column(name = "picture")
    private Integer picture;

    @Column(name = "word")
    private Integer word;

    @Column(name = "letter")
    private Integer letter;

    @PrePersist
    private void prePersist() {
        this.picture = 0;
        this.word = 0;
        this.letter = 0;
    }
}