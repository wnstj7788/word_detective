package com.ssafy.backend.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

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

    @Column(name = "email", nullable = false, length = 330)
    private String email;

    @Column(name = "picture")
    private Integer picture;

    @Column(name = "word")
    private Integer word;

    @Column(name = "letter")
    private Integer letter;

    @Column(name = "password", nullable = false)
    private String password;
}