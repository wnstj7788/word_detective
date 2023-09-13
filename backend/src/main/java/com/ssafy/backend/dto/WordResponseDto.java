package com.ssafy.backend.dto;

import com.ssafy.backend.entity.Word;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for {@link com.ssafy.backend.entity.Word}
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WordResponseDto {
    Long id;
    String name;
    String url;

    public static WordResponseDto fromEntity(Word word) {
        return WordResponseDto.builder()
                .id(word.getId())
                .name(word.getName())
                .url(word.getUrl())
                .build();
    }
}