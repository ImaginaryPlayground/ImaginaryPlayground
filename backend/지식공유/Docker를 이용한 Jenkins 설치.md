> 전체적인 흐름 참고
https://dev-overload.tistory.com/40
https://postlude.github.io/2020/12/26/docker-in-docker/
https://choseongho93.tistory.com/m/303

- 도커 설치
```
$ sudo snap install docker
```
- 도커 버전 확인
```
$ docker -v
```

- 도커 관리자 권한 문제
```
1. 보통 docker group이 생겼을테지만, 없으면 생성
$ sudo groupadd docker
2. 해당 그룹에 유저 추가
$ sudo usermod -aG docker $USER
3. 로그아웃 후 다시 로그인하거나 다음 명령어를 실행시켜야 적용이 된다.
$ newgrp docker
```



- root 비밀번호, ubuntu 초기 비밀번호 설정

  https://serina-the-best.tistory.com/16

  

- docker-compose install

```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose

$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

$ docker-compose --version
```



- 도커 파일 생성

```
$ mkdir apache-dockerfile && cd apache-dockerfile

//편집기 열기
$ vi Dockerfile
```



- Jenkins 이미지 다운

```
docker pull jenkins/jenkins
```

>https://hub.docker.com/r/jenkins/jenkins

- image 확인

```
$ docker images
$ docker image ls   → 로컬에 있는 모든 도커 이미지 확인
```

- 컨테이너 확인

```
$ docker ps

$ docker ps -a  → Jenkins가 실행 중임을 확인, 컨테이너 확인
```

- Jenkins 상태 확인

```
systemctl status jenkins.service  → jenkins 상태 확인('활성'이어야함)
```

