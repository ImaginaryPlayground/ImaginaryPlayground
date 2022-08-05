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

