package com.ssafy.backend.dto;

import com.ssafy.backend.entity.Word;
import lombok.*;

/**
 * DTO for {@link com.ssafy.backend.entity.Word}
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WordRequestDto {
    Long id;
    String name;
    String url;

    @Builder
    public Word toEntity() {
        return Word.builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }
}