# ERROR and BUGS

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

### 해결과정

해시값 에러에는 –no-cache-dir 옵션을 사용하면 된다는 말이 지배적이었으나 안 되서 pip 업데이트 시도도 해보았으나 업데이트에도 어김없이 sha 에러가 생겼다.

<img src='https://user-images.githubusercontent.com/19484971/182135615-fe9eaed5-70c5-4c8e-883e-e09e0f04ddeb.png' width=600>

해시값 강제로 맞춰서 설치를 명령했더니

<img src='https://user-images.githubusercontent.com/19484971/182136264-a95e05af-aa30-4ba7-8c0b-bd1249a01d2f.png' width=600>

<img src='https://user-images.githubusercontent.com/19484971/182136275-b2203302-4cec-4a8d-bc3a-464af4c3d39c.png' width=600>

다운로드한.. 파일이.. 잘못되었다는 에러..?

저 화면을 본 이후 도저히 못하겠어서 압축파일 다운로드해서 직접 빌드 명령어와 설치 명령어로 설치하거나 하였다.

이후 경로 `pip config -v list`으로 pip 설정파일에 대한 파일 리스트를 볼 수 있다는 글을 보고 `/etc/pip.conf`에 작성된 설정파일 때문에 문제가 생긴것을 알게되어 해결이 가능했다. 이전에 봤던 블로그는 `/.pip/pip.conf` 폴더만 알려주어서 해맷는데 좀 슬프다..

## 
