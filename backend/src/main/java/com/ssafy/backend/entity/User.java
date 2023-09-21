package com.ssafy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "user_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "picture")
    private Integer picture;

    @Column(name = "word")
    private Integer word;

    @Column(name = "letter")
    private Integer letter;

    @PrePersist
    private void prePersist() {
        this.id = UUID.randomUUID();
        this.picture = 0;
        this.word = 0;
        this.letter = 0;
    }
}