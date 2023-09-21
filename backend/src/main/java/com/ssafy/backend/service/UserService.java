package com.ssafy.backend.service;

import com.ssafy.backend.dto.UserResponseDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ErrorCode;
import com.ssafy.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponseDto getUserInfoOrCreate(UUID userId) {
        User user = userId == null ? userRepository.save(new User()) : userRepository.findById(userId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        return UserResponseDto.builder()
                .id(user.getId())
                .picture(user.getPicture())
                .word(user.getWord())
                .letter(user.getLetter())
                .build();
    }
}
