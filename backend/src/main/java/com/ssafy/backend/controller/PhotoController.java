package com.ssafy.backend.controller;

import com.ssafy.backend.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/photo")
@RequiredArgsConstructor
public class PhotoController {
    private final S3Service s3Service;

    /**
     * 사진 url 조회
     *
     * @param userId 유저 아이디
     * @param wordId 단어 아이디
     * @return 사진 url
     */
    @GetMapping("{wordId}")
    public ResponseEntity<String> getPhotoUrl(
            @RequestParam("userId") UUID userId,
            @PathVariable("wordId") Long wordId) {
        return ResponseEntity.ok(s3Service.getPhotoUrl(userId, wordId));
    }

    /**
     * 사진 업로드
     *
     * @param userId 유저 아이디
     * @param wordId 단어 아이디
     * @param file   사진 파일
     * @return 사진 url
     * @throws IOException 파일 입출력 예외
     */
    @PostMapping()
    public ResponseEntity<String> uploadFile(
            @RequestParam("userId") UUID userId,
            @RequestParam("wordId") Long wordId,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(s3Service.uploadFile(userId, wordId, file));
    }
}
