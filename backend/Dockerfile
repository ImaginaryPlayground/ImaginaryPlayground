# backend/Dockerfile
FROM openjdk:11

# 파일 경로
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# 배포용 properties 실행 명령어
ENTRYPOINT ["java","-jar","app.jar","--spring.config.name=application-prod"]

# ENTRYPOINT ["java","-jar","app.jar"]