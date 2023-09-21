# 1단계: 애플리케이션 빌드
FROM gradle:8.2.1-jdk11 AS builder

# 작업 디렉토리를 설정
WORKDIR /app

# Gradle 의존성 캐시를 위한 빈 의존성 파일을 복사
COPY build.gradle settings.gradle ./
COPY src ./src/

# Gradle clean 및 bootJar를 실행하여 애플리케이션을 빌드
RUN gradle clean
RUN gradle bootJar

# 2단계: JRE를 사용하여 애플리케이션 실행
FROM adoptopenjdk/openjdk11

# 작업 디렉토리를 설정
WORKDIR /app

# 1단계에서 빌드한 JAR 파일을 가져옴
COPY --from=builder /app/build/libs/*.jar app.jar

# 컨테이너가 실행될 포트를 설정
EXPOSE 9999

# 컨테이너가 시작될 때 Spring Boot 애플리케이션을 실행합니다.
CMD ["java", "-jar", "app.jar"]
