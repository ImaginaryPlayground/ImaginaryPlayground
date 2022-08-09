```
# 참고
https://ragu.notion.site/Docker-Jenkins-12dc3d52a0a54b03946dd132d9ef6f1e
```

```
# 공개키 기반 인증 SSH 접속
# ssh -i "개인키 경로" USER@IP
```



- root 비밀번호, ubuntu 초기 비밀번호 설정

  https://serina-the-best.tistory.com/16



- 필수 패키지 설치

```
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

- docker 설치
```
$ sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
```
- docker 설치 확인
```
$ docker -v
```

- 도커 관리자 권한 문제

  현재 사용자 docker 명령어 사용 허용

  기본적으로 root 권한을 사용하여(sudo 명령어) docker 명령어를 사용해야한다.

  하지만 매번 명령어를 사용할 때마다 sudo를 입력하기 번거롭다.

  (아래 명령어 입력 후 재접속해줘야함)

  ```
  $ sudo usermod -aG docker $USER
  ```



🐬Docker에서 Image란?

어떠한 개발 환경을 구축하기 위해 필요한 라이브러리 및 패키지를 모아 하나의 파일로 만든 것

Docker Image: 사용자가 base image를 사용하여 그 위에 프로그램, 라이브러리, 소스를 설치한 뒤 하나의 파일로 만든 것

- Jenkins image 다운

```
docker pull jenkins/jenkins
```

>https://hub.docker.com/r/jenkins/jenkins

- image 확인

```
$ docker images
$ docker image ls   → 로컬에 있는 모든 도커 이미지 확인
```

- 특정 image 삭제

```
$ docker rmi [option] imagename [imagename... (여러 개 삭제 시) ]
```



🐬Docker에서 Container란?

이미지가 실행된 형태로써, 컨테이너 레벨에 저장되며 호스트와 이미지엔 아무런 영향을 주지 않고 Docker 엔진에서 독립적으로 실행된다.

- Container 목록 확인

```
$ docker ps

$ docker ps -a  → Jenkins가 실행 중임을 확인, 컨테이너 확인
```

- Container 중지

```
$ docker stop [container name OR container ID]
```

- Container 삭제(컨테이너가 중지된 상태여야 한다.)

```
# 컨테이너 이름 or ID로 중지
$ docker rm [container name OR container ID]

# 컨테이너 강제 삭제
$ docker rm -f [container name OR container ID]

# 모든 컨테이너 삭제
$ docker container prune
```



- Jenkins 계정으로 Jenkins 컨테이너에 접속

```
$ docker exec -it -u jenkins jenkins bash
```



- Gitlab과 Jenkins 연동

```
# 참고
https://not-to-be-reset.tistory.com/336?category=916741
```

