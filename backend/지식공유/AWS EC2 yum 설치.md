# AWS pem 연결

> https://velog.io/@jee1818/AWS-EC2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-Jenkins-%EC%84%A4%EC%B9%98
> 
> 
> jenkins JAVA11: https://velog.io/@qf9ar8nv/jenkins-%EC%84%A4%EC%A0%95
> 
> 
> https://blog.h2f.kr/posts/200725-jenkins-eb-a1-9c-spring-boot-ec-84-9c-eb-b2-84-ec-9e-90-eb-8f-99-eb-b0-b0-ed-8f-ac-ed-95-98-ea-b8-b0-1-eb-8f-84-ec-bb-a4-ec-99-80-ec-a0-a0-ed-82-a8-ec-8a-a4-ec-84-a4-ec-b9-98/

<br>

![](assets/2022-08-03-15-07-35-image.png)

### 1. pem키를 저장하고 터미널에서 저장된 곳으로 이동

```bash
$ cd {pemkey가 존재하는 directory경로}
```

<br>

### 2. pem키가 있는 위치에서 AWS로의 ssh 연결 시도

```bash
$ ssh -i I7D204T.pem ubuntu@i7d204.p.ssafy.io
```

![](assets/2022-08-03-14-54-37-image.png)

<br>

### 3.  yum 명령어가 ubuntu 내에 없는 경우

```bash
$ sudo apt-get update # apt-get 최신화
$ sudo apt-get install yum
```

```bash
$ sudo apt update # apt-get 최신화
$ sudo apt install yum
```

* 위 방식으로 안된다면 해당 원인은 ubuntu에서 package를 다운받지 못하여서 그렇다.  /etc/apt 위치로 이동해 주어 sources.list를 수정해주어야 한다.

* 다음 위치로 이동해서 패키지 경로를 설치해준다.
  
  ```bash
  $ cd /etc/apt/
  $ sudo cp sources.list sources.list.back
  ```

* 편집기 열기
  
  ```bash
  $ sudo vi sources.list # 무조건 sudo 모드에서 편집해야 빠져나오기 가능
  ```

* 맨 아래 패키지 경로 추가
  
  ```bash
  deb http://archive.ubuntu.com/ubuntu bionic main restricted universe multiverse
  deb http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse
  deb http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse
  ```

* 그 이후에도 yum install시 오류가 발생했다면 다음 패키지들을 꼭 순서대로 설치
  
  ![](assets/2022-08-03-16-15-12-image.png)
  
  ```bash
  $ sudo apt install python-lzma
  $ sudo apt install python-sqlitecachec
  $ sudo apt install python-pycurl
  $ sudo apt install python-urlgrabber
  ```

* yum 설치.
  
  ```bash
  $ sudo apt install yum
  ```
  
  ![](assets/2022-08-03-16-56-09-image.png)

<br>

### 4. yum update

```bash
$ sudo yum update -y
```


