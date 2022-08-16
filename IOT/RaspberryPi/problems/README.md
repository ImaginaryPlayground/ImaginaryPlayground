# ERROR and BUGS

## python 3.9 다운그레이드

라즈베리파이 OS 11인 bullseye의 기본 파이썬 버전은 3.9인데, 이 버전이 라즈베리파이에서는 설치되지 않는 파일이 많았다.

그래서 3.8로 다운그레이드를 하려했는데 라즈베리파이 시스템이 기본적으로 파이썬 3.9를 사용하므로 완전히 3.8로 바꿀수는 없었고(apt install 시에는 어김없이 3.9버전 기준으로 설치가 진행되었다.) 오히려 다운그레이드를 진행하면서 실수로 환경변수나 시스템 변수같은 중요한 변수를 잘못바꿔서 치명적인 문제가 되어 시스템을 복구하는 상황이 많이 있었다.

때문에 파이썬으로 생기는 설치문제를 없애기 위해서 중간부터 아예 OS 버전을 10인 buster로 낮춰서 파이썬 3.7을 사용하였고 3.6이나 3.8보다는 불안정한 버전이긴 하나 잘 진행하게 되었다.

## SHA 에러

pip 설치 중에

<img src='https://user-images.githubusercontent.com/19484971/182136005-d0bfacde-5591-491c-817e-8b2511313e82.png' width=600>

위와 같은 에러가 생겼다면.. 그런데 그 에러가 `www.piwheels.org/simple` 이라는 곳에서 패키지를 가져오는 도중에 생긴 것이라면 아래의 글을 따라하는 것이 효과가 있을 수도 있다.
원인은 위의 서버에서 제공하는 패키지들의 파일이.. 깨지거나 이상하다는 것..   
필자가 sha까지 강제로 맞추면서 다운로드를 해주어도 zip 파일이 잘못되었다는 오류만 볼 수 있었다. (사진 찍어둘껄..)

`pip config -v list` 를 입력하면 pip 설정파일을 볼 수 있다. 본인의 경우 아래와 같다.

<img src='https://user-images.githubusercontent.com/19484971/182135244-c1ec8067-3392-444e-8b86-6afa143f3f08.png' width=600>

도중에 봤던 스택오버플로우(링크는 못 찾겠다)에 따르면 site – user - global 순으로 설정파일을 읽으며 설정이 겹친다면 뒤에 있는 파일에 의해서 덮어 씌워진다(override)고 하였다. 본인의 경우 `/etc/pip.conf` 에만 ‘extra-index-url=https://www.piwheels.org/simple’ 한 줄이 적혀 있었으므로 각자 파일을 확인하고 어떤 설정이 있는지 확인하고 설정을 변경해주자.

추가로 본인 설정파일이 user에 2개 global에 2개 있는 이유는 각각의 아래의 파일이 legacy로 남아있는 설정파일이라서 그렇다고 한다.    (https://pip.pypa.io/en/stable/topics/configuration/#per-command-section 참고)   
어쨌든 본인은 /etc/pip.conf 파일의 내용을 아래와 같이 작성하였다.

```
[global]
index-url=http://ftp.daumkakao.com/pypi/simple
#extra-index-url=https://www.piwheels.org/simple
trusted-host=ftp.daumkakao.com
no-cache-dir=true
```

index url은 pip를 통해 패키지를 가져올 mirror(?) 서버의 url을 적으면 된다. 일반적으로 한국에서는 카카오 mirror 서버를 사용하는 것 같은데 원한다면 다른 서버를 써도 된다. Pip install 시에 속도가 확실하게(필자는 1000배 정도) 체감될 정도로 빨라지는 부차적인 효과도 있다.   
trusted-host 의 경우에는 https이지 않아서 위험하다는 경고를 무시해주는 효과가 있다.   
no-cache-dir=true 설정의 경우에는 본인이 사용하고 싶어서 넣은 것이므로 사용하지 않아도 된다.

이후 `pip3 install` 패키지 혹은 `pip install` 패키지 등의 명령어에서 에러로 인해 설치를 못하는 상황이 사라지게 되었다! 끼-----야----호---!

참고 사이트
+ https://kjk92.tistory.com/83 (pip.conf 설정)
+ https://foxybearkim.tistory.com/14 (mirror 서버 설정 및 trusted-host 설정)

### `–no-cache-dir` 옵션

해시값 에러에는 `–no-cache-dir` 옵션을 사용하면 된다는 말이 지배적이었으나 안 되서 pip 업데이트 시도도 해보았으나 업데이트에도 어김없이 sha 에러가 생겼다.

<img src='https://user-images.githubusercontent.com/19484971/182135615-fe9eaed5-70c5-4c8e-883e-e09e0f04ddeb.png' width=600>

해시값 강제로 맞춰서 설치를 명령했더니

<img src='https://user-images.githubusercontent.com/19484971/182136264-a95e05af-aa30-4ba7-8c0b-bd1249a01d2f.png' width=600>

<img src='https://user-images.githubusercontent.com/19484971/182136275-b2203302-4cec-4a8d-bc3a-464af4c3d39c.png' width=600>

다운로드한.. 파일이.. 잘못되었다는 에러..?

저 화면을 본 이후 도저히 못하겠어서 압축파일 다운로드해서 직접 빌드 명령어와 설치 명령어로 설치하거나 하였다.

이후 경로 `pip config -v list`으로 pip 설정파일에 대한 파일 리스트를 볼 수 있다는 글을 보고 `/etc/pip.conf`에 작성된 설정파일 때문에 문제가 생긴것을 알게되어 해결이 가능했다. 이전에 봤던 블로그는 `/.pip/pip.conf` 폴더만 알려주어서 해맷는데 좀 슬프다..

## cryptography 에러

[google assistant 서비스 공식 홈페이지](https://developers.google.com/assistant/sdk/guides/service/python/embed/setup?hardware=rpi)와 [참고하는 동영상](https://www.youtube.com/watch?v=wavlbH0M1Zg)을 보면서 라즈베리에 google assistant 서비스를 적용해보려고 했다.

### 에러 1

그런데 설치 중 `python -m pip install --upgrade google-assistant-sdk[samples]
` 명령어에 아래와 같은 버그가 발생하였다.

```
... 생략
          =============================DEBUG ASSISTANCE=============================
      
      error: can't find Rust compiler
      
      If you are using an outdated pip version, it is possible a prebuilt wheel is available for this package but pip is not able to install from it. Installing from the wheel would avoid the need for a Rust compiler.
      
      To update pip, run:
      
          pip install --upgrade pip
      
      and then retry package installation.
      
      If you did intend to build this package from source, try installing a Rust compiler from your system package manager and ensure it is on the PATH during installation. Alternatively, rustup (available at https://rustup.rs) is the recommended way to download and update the Rust compiler toolchain.
      
      This package requires Rust >=1.41.0.
      [end of output]
  
  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for cryptography
Successfully built CFFI
Failed to build cryptography
ERROR: Could not build wheels for cryptography, which is required to install pyproject.toml-based projects
```

`error: Can not find Rust compiler`와 `ERROR: Failed building wheel for cryptography`가 키워드라고 생각하여 해당 문장을 위주로 검색해보니 아래의 가이드를 볼 수 있었다.

[cryptography 공식홈페이지의 FQA](https://cryptography.io/en/35.0.0/faq/#installing-cryptography-fails-with-error-can-not-find-rust-compiler)

다양한 에러 중에서 원하던 키워드 `error: Can not find Rust compiler`을 찾을 수 있었고 안내하는 링크를 따라 Rust를 설치하여 해결하였다.

### 에러 2

대충 긴 에러가 나왔는데 중요한 부분은 아래의 에러였다.

ImportError: /lib/arm-linux-gnueabihf/libc.so.6: version `GLIBC_2.33' not found

구글링하다가 아래의 글을 봤는데 해결이 되어서 그대로 진행하였다.

https://groups.google.com/g/grpc-io/c/T91EyO81c8I?pli=1

참고로 numpy를 다운로드받거나 다른 것을 다운로드 받으라는 글도 있었는데, 그것들은 다운로드 받을 때 다른 에러가 났다;

동영상은 16분인데.. 나는 왜 4시간이나.. ^ㅠ^