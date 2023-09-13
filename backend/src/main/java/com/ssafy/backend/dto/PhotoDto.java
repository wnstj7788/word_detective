package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * DTO for {@link com.ssafy.backend.entity.Photo}
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoDto {
    private MultipartFile multipartFile;
    private Long wordId;
    private Long userId;
}