# 웹 IoT Backend

<!-- 필수 항목 -->

## 소개

웹 IoT 프로젝트의 Backend 스켈레톤 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Project        | Version | Description |
| -------------- | ------- | ----------- |
| express.js     | 4.17.1  |             |
| mybatis-mapper | 0.6.5   |             |

<!-- 필수 항목 -->

## 개발 환경 구성

1. 프로젝트 다운로드

   ```
   git clone <repo URL> <folder-name>
   ```

2. backend폴더로 이동

   ```
   cd <folder-name>/backend
   ```

3. 패키지 설치

   ```
   npm install
   ```

4. 프로젝트 실행

   ```
   npm start
   ```

## Routes

```
GET     http://localhost:3001/
GET     http://localhost:3001/base
GET     http://localhost:3001/base/auth/users/:id

POST    http://localhost:3001/base
PUT     http://localhost:3001/base
DELETE  http://localhost:3001/base
```

## 디렉토리 구조

```
/env
    - env.json
/middleware
    - db.js

/route
    /base
	    - auth.js
        - base.js
/sql
    /base
	    - base.xml
- README.md
- server.js
```

