package com.ssafy.backend.controller;

import com.ssafy.backend.service.S3Service;
import lombok.Getter;
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

    @GetMapping("{wordId}")
    public ResponseEntity<String> getPhotoUrl(
            @RequestParam("userId") UUID userId,
            @PathVariable("wordId") Long wordId) {
        return ResponseEntity.ok(s3Service.getPhotoUrl(userId, wordId));
    }
    @PostMapping()
    public ResponseEntity<String> uploadFile(
            @RequestParam("userId") UUID userId,
            @RequestParam("wordId") Long wordId,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(s3Service.uploadFile(userId, wordId, file));
    }
}
