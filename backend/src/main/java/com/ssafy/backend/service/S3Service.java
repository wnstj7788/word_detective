package com.ssafy.backend.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.backend.entity.Photo;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.Word;
import com.ssafy.backend.repository.PhotoRepository;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;

    @Transactional
    public String uploadFile(Long userId, Long wordId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 없습니다.")
        );

        Word word = wordRepository.findById(wordId).orElseThrow(
                () -> new IllegalArgumentException("해당 단어가 없습니다.")
        );
        Photo prePhoto = photoRepository.findByUserAndWord(user, word).orElse(null);

        if (prePhoto != null) {
            photoRepository.deleteByUserAndWord(user, word);
            fileDelete(prePhoto.getUrl());
        }

        String fileName = file.getOriginalFilename();
        String fileUrl = null;
        if (fileName != null) {
            fileUrl = "https://" + bucket + ".s3." + region + ".amazonaws.com/" + fileName.replaceAll(" ", "");
        }
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);

        photoRepository.save(Photo.builder()
                .url(fileUrl)
                .user(user)
                .word(word)
                .build());

        return fileUrl;
    }

    private void fileDelete(String fileUrl) {
        try {
            String key = fileUrl.substring(58);
            AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(region).build();

            try {
                s3.deleteObject(bucket, key);
            } catch (AmazonServiceException e) {
                e.printStackTrace();
            }
        } catch (Exception exception) {
            throw new IllegalArgumentException("해당 파일이 없습니다.");
        }
    }
}
