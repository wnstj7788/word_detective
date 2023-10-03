package com.ssafy.backend.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.backend.entity.Photo;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.Word;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ErrorCode;
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

    /**
     * 사진 업로드
     *
     * @param userId 유저 아이디
     * @param wordId 단어 아이디
     * @param file   사진 파일
     * @return 사진 url
     * @throws IOException 파일 입출력 예외
     */
    @Transactional
    public String uploadFile(Long userId, Long wordId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        Word word = wordRepository.findById(wordId).orElseThrow(
                () -> new CustomException(ErrorCode.WORD_NOT_FOUND)
        );
        Photo prePhoto = photoRepository.findByUserAndWord(user, word).orElse(null);

        if (prePhoto != null) { // 이미 사진이 있으면 삭제
            photoRepository.deleteByUserAndWord(user, word);
            fileDelete(prePhoto.getUrl());
        }

        String fileName = file.getOriginalFilename();
        String fileUrl = null;
        if (fileName != null) { // 파일 이름이 없으면 랜덤으로 생성
            fileUrl = "https://" + bucket + ".s3." + region + ".amazonaws.com/" + fileName.replaceAll(" ", "");
        }
        ObjectMetadata metadata = new ObjectMetadata(); // 메타데이터 설정
        metadata.setContentType(file.getContentType()); // 파일 타입
        metadata.setContentLength(file.getSize()); // 파일 크기

        amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata); // S3에 파일 업로드

        photoRepository.save(Photo.builder()
                .url(fileUrl)
                .user(user)
                .word(word)
                .build());

        return fileUrl;
    }

    /**
     * 사진 삭제
     *
     * @param fileUrl 사진 url
     */
    private void fileDelete(String fileUrl) throws SdkClientException {
        String key = fileUrl.substring(58); // url에서 파일 이름만 추출
        AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(region).build(); // S3 클라이언트 생성

        s3.deleteObject(bucket, key); // S3에서 파일 삭제
    }

    /**
     * 사진 url 조회
     *
     * @param userId 유저 아이디
     * @param wordId 단어 아이디
     * @return 사진 url
     */
    public String getPhotoUrl(Long userId, Long wordId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        Word word = wordRepository.findById(wordId).orElseThrow(
                () -> new CustomException(ErrorCode.WORD_NOT_FOUND)
        );

        Photo photo = photoRepository.findByUserAndWord(user, word).orElseThrow(
                () -> new CustomException(ErrorCode.FILE_NOT_FOUND)
        );

        return photo.getUrl();
    }
}
