package com.ssafy.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * CORS 설정
     *
     * @param registry CORS 설정
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // cors를 적용할 URL 패턴 정의
                .allowedOriginPatterns("*") // 모든 ip에 대해서 허용
                .allowedMethods("*"); // 허용할 http method 지정

    }
}
