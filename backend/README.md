# 💻웹 IoT Backend

모든 과정은 IntelliJ 2022.2 기준으로 설명되었습니다.



## 🛠기술스택 및 라이브러리

| Project         | Version | Description |
| --------------- | ------- | ----------- |
| Java            | 11      |             |
| Spring Boot     | 2.7.1   |             |
| Gradle          |         |             |
| Spring Security | 5.7.2   |             |
| MariaDB         | 10.6.8  |             |

- Dependencies
  - spring-boot-starter-web
  - spring-boot-starter-security
  - spring-boot-starter-oauth2-client
  - spring-boot-starter-oauth2-resource-server
  - jjwt-api:0.11.2
  - mybatis-spring-boot-starter:2.1.2
  - mariadb-java-client:2.1.2
  - lombok
  - springfox-swagger-ui:2.9.2
  - springfox-swagger2:2.9.2
  - spring-security-core:5.7.1



## 🖥 서비스 아키텍처

![image-20220815213650352](.\image\backend_structure.png)



## 👷‍♂️개발 환경 구성 및 배포 과정

### 프로젝트 다운로드

1. Gitlab의 레포지토리를 clone합니다.

   ```
   git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12D204.git
   ```

2. backend폴더로 이동합니다.

   ```
   cd S07P12D204/backend
   ```

3. gradle 의존성을 다음과 같이 추가합니다.

   ```
   plugins {
   	id 'org.springframework.boot' version '2.7.1'
   	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
   	id 'java'
   }
   
   group = 'com.yodel.imagnaryPlayground'
   version = '0.0.1-SNAPSHOT'
   sourceCompatibility = '11'
   
   configurations {
   	compileOnly {
   		extendsFrom annotationProcessor
   	}
   }
   
   repositories {
   	mavenCentral()
   }
   
   dependencies {
   	// Spring Boot
   	implementation 'org.springframework.boot:spring-boot-starter-web'
       implementation 'org.springframework.boot:spring-boot-starter-security'
   	implementation 'org.springframework.boot:spring-boot-starter-validation'
   	testImplementation 'org.springframework.boot:spring-boot-starter-test'
   
   	// oauth
   	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
   	implementation 'org.springframework.boot:spring-boot-starter-oauth2-resource-server'
   
   	// Jwt
   	implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
   	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
   	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
   
   	// OAuth
   	implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.2'
   	implementation 'org.mariadb.jdbc:mariadb-java-client:2.1.2'
   	compileOnly 'org.projectlombok:lombok'
   	annotationProcessor 'org.projectlombok:lombok'
   
   	// Swagger
   	implementation group: 'io.springfox', name: 'springfox-swagger-ui', version: '2.9.2'
   	implementation group: 'io.springfox', name: 'springfox-swagger2', version: '2.9.2'
   
   	// mail 인증
   	implementation 'org.springframework.boot:spring-boot-starter-mail'
   
   	// Security
   	implementation group: 'org.springframework.security', name: 'spring-security-core', version: '5.7.1'
   
   	// File upload
   	implementation 'commons-io:commons-io:2.6'
   	implementation group: 'org.json', name: 'json', version: '20220320'
   
   }
   
   tasks.named('test') {
   	useJUnitPlatform()
   }
   ```



### 배포 과정

해당 서비스는 AWS EC2를 이용하여 배포하였습니다.

배포를 하기 위해 다음과 같은 방법으로 실행하였습니다.

1. AWS EC2 인스턴스 생성

2. 공개키 기반 인증 SSH 접속

   ```
   ssh -i "개인키 경로" ubuntu@i7d204.p.ssafy.io

3. Docker + Jenkins 설치

4. Gitlab Webhook 설정

5. ssl 인증서 적용

6. Jenkins pipeline을 이용하여 자동 배포 구축

7. 백엔드 Spring boot와 프론트엔드 React, Database를 docker image로 빌드

8. Nginx 환경 설정

   ```
   server {
       listen 80;
       listen [::]:80;
   
   	location / {
   		root /usr/share/nginx/html;
   		index index.html;
   		try_files $uri $uri/ /index.html;
       }
   }
   ```

   

## 📂Routes

```
//AdminController
POST     http://localhost:8080/admin/
DELETE   http://localhost:8080/admin/
GET      http://localhost:8080/admin/lookup/unapproved/{page}
GET      http://localhost:8080/admin/lookup/approved/{page}
GET      http://localhost:8080/admin/lookup/all/{mode}
POST     http://localhost:8080/admin/lookup
POST     http://localhost:8080/admin/user/edit

//AnswerController
POST     http://localhost:8080/answer/
PUT      http://localhost:8080/answer/
POST     http://localhost:8080/answer/delete
GET      http://localhost:8080/answer/detail/{question_id}

//HospitalController
GET      http://localhost:8080/hospital/{value}
GET      http://localhost:8080/lookup/{id}

//QuestionController
POST     http://localhost:8080/question/
PUT      http://localhost:8080/question/
DELETE   http://localhost:8080/question/
POST     http://localhost:8080/question/lookup/all
GET      http://localhost:8080/question/lookup/all
GET      http://localhost:8080/question/lookup/{id}

//UserCareController
POST     http://localhost:8080/user/care/
PUT      http://localhost:8080/user/care/
DELETE   http://localhost:8080/user/care/
POST     http://localhost:8080/user/care/lookup/all
POST     http://localhost:8080/user/care/lookup
POST     http://localhost:8080/user/care/data/consult

//UserController
POST     http://localhost:8080/user/register
POST     http://localhost:8080/user/login
GET      http://localhost:8080/user
PUT      http://localhost:8080/user
DELETE   http://localhost:8080/user
POST     http://localhost:8080/user/authEmail/send
POST     http://localhost:8080/user/authEmail/receive
POST     http://localhost:8080/user/token
POST     http://localhost:8080/user/logout
```



## 📁디렉토리 구조

```
java
└── com.yodel.imaginaryPlayground
    └── config
    │	├── SecurityConfing
    │   ├── SwaggerConfig
    │	└── WebConfig
    └── controller
    │	├── AdminController
    │   ├── AnswerController
    │	├── BabyController
    │	├── ClovaFaceController
    │	├── ClovaSpeechController
    │	├── HospitalController
    │	├── QuestionController
    │	├── UserCareController
    │	└── UserController
    └── mapper
    │	├── AdminMapper
    │	├── AnswerMapper
    │	├── HospitalMapper
    │	├── QuestionMapper
    │	├── UserCareMapper
    │	└── UserMapper
    ├── model
    │	├── dto
    │   │   ├── AnswerDto
    │   │	├── BabyDto
    │   │	├── ConsultDto
    │   │	├── HospitalDto
    │   │	├── PageDto
    │   │	├── QuestionDto
    │   │	├── Role
    │   │	└── UserDto
    │	├── jwt
    │   │	├── JwtAuthenticationFilter
    │   │	└── JwtTokenService
    │	├── oauth
    │   │	├── OAuth2SuccessHandler
    │   │	└── OAuthAttributes
    │	└── vo
    │   │	├── BabyVO
    │   │	├── EmailCodeVO
    │   │	├── IdVO
    │   │	└── PasswordVO
    ├── Service
    │   ├── AdminService
    │   ├── AdminServiceImpl
    │   ├── AnswerService
    │   ├── AnswerServiceImpl
    │   ├── EmailService
    │   ├── EmailServiceImpl
    │   ├── HospitalService
    │   ├── HospitalServiceImpl
    │   ├── QuestionService
    │   ├── QuestionServiceImpl
    │   ├── UserCareService
    │   ├── UserCareServiceImpl
    │   ├── UserService
    │   └── UserServiceImpl
    └── ImagnaryPlaygroundApplication
resources
└── mappers
		├── admin.xml
		├── answer.xml
		└── hospital.xml
 		├── question.xml
		├── user.xml
		└── usercare.xml
├── application.properties
└── application-oauth.properties
```

