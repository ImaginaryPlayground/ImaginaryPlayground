# 포팅 메뉴얼

## 서버 컴퓨터

서버 컴퓨터의 ip를 192.168.1.201로 고정한다. 터미널에선 [서버 폴더](../frontend/FE_practice/socket.io/socketio/app.js)로 이동한 후 `node app.js`를 입력하여 서버를 실행한다.

[imaginary_playground](../frontend/FE_practice/imaginary_playground/) 폴더로 이동한 `npm i --force` 를 통해 필요한 node_modul을 다운로드 받고 `npm run start`를 입력하여 react를 실행시키면 메인화면을 볼 수 있다.

해당 화면을 연결된 빔 프로젝터를 통해 가로 200, 세로 112의 화면이 보이도록 세팅하고 브라우저의 화면을 ctrl을 클릭한 상태로 휠을 내려 화면비율을 맞춰준다. 해상도 1920*1080화면에서 크롬 브라우저로 67%로 맞추면 된다.

## 아두이노

장비가 있다는 가정하에 작성하겠다.
사용장비는 아래와 같다.

- 아두이노 WeMos D1 Mini (v4.0) 보드 
- WeMos D1 Mini Battery Shield
- 리튬폴리머배터리 (YJ603450)

<img src="https://user-images.githubusercontent.com/19484971/185298704-8e838b95-e6cf-46a9-85de-ec8e948f478f.jpg" width=400>

<img src="https://user-images.githubusercontent.com/19484971/185298707-3b8450af-d376-4951-b039-f5cc8aa96f7d.jpg" width=400>

사용하는 보드 & 라이브러리

- LOLIN(WEMOS) D1 mini (보드)
- ArduinoJson
- WebSockets (by Markus Sattler)

필자의 경우 [해당 링크](https://glorlfy.tistory.com/4)를 보고 보드 기본 설정을 따라하였고 라이브러리는 위의 목록의 것을 보드 매니저에서 다운로드 받았다.

이후 [코드](../IOT/arduino/codes/WebSocketClientSocketIO_modified/WebSocketClientSocketIO_modified.ino)를 아두이노에 업로드한 후 적절한 위치에서 작동시키면 된다. 업로드할 때 `String num` 변수에 왼쪽 초음파센서부터 순서대로 1, 2, 3, 4 를 넣어주어야 한다.

위와 같이 미리 준비된 코드는 빔 프로젝터의 화면이 가로 200, 세로 112 이고, 가로 1920, 세로 1080의 해상도의 ip가 `192.168.1.201`인 빔 프로젝터와 연결된 컴퓨터라고 가정한 코드이며 크기나 ip가 바뀌면 수정하여 업로드를 진행해주어야 한다.

## 라즈베리파이 

라즈베리파이 이미지가 있으나 60GB로 인하여 깃에 올리지 못하였다.

라즈베리파이의 ip를 192.168.1.202로 고정한다.
우선 사용하는 라즈베리파이 모델명과 OS버전은 다음과 같다.

- 라즈베리파이 모델 : Raspberry Pi 4 Model B Rev 1.2 (8GB)
- Debian version : 10 (buster) 32-bit

라즈베리파이에서 사용하는 라이브러리들 버전 정보는 다음과 같다.
대부분은 검색하여 다운로드해도 문제가 없으나 openCV 이하의 라이브러리들은 [facial_recognition 설치 메뉴얼](https://www.tomshardware.com/how-to/raspberry-pi-facial-recognition)에 따라서 설치하는 것이 쉽다.

- Python : 3.7.3
- pip3 : pip 22.2 (python 3.7)
- node.js : v16.16.0
- npm : 8.11.0
- python-socketio[client] : 1.3.3
- openCV : 3.2.0
- cmake : 3.16.3
- dlib : 19.24.0
- numpy : 1.19.5
- face_recognition : 1.3.0
- facial_recognition : X

[라즈베리파이에 폴더](../frontend/FE_practice/raspPiServerTest/)를 넣고 `node index.js`로 서버를 켠다.
라즈베리파이의 브라우저인 chromium에서 `localhost:3001`로 들어가면 react와 연동하여 자세인식을 하는 화면을 볼 수 있다. react에서 통신이 있기 전까지는 카메라가 켜지지 않는다.

facial_recognition 설치 메뉴얼에 따라 다운로드한 facial_recognition 깃헙 폴더에 [한 파일](../IOT/RaspberryPi/facialRecognition/facial_req_custom.py)을 넣고 `facial_req.py` 대신 `facial_req_custom.py`을 실행하여 위의 파일과 같이 react와 연동하여 사용한다. 마찬가지로 react로 부터의 통신이 있기 전까지는 얼굴인식 기능이 시작되지 않는다.

위의 자세인식과 얼굴인식에는 작동을 수동으로 해주어야 하는 문제점이 있다. 얼굴인식의 경우에는 작동시킨 후 `ctrl+c`로 작동을 멈춰주어야 하며 자세인식은 페이지를 세로고침하거나 뒤로가기 등으로 작동을 멈춰 카메라를 해제시켜주어야 한다.

얼굴인식과 자세인식 모두 카메라를 사용하는 기능이기 때문에 두 기능을 동시에 작동시킬 수 없다.