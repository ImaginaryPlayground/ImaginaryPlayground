# 포팅 메뉴얼

요들팀의 상상놀이터 작동방법은 매우 수동적으로 돌아가므로 마음의 준비를 하고 볼 것을 권장한다.

병원시연과 더불어 팀의 역할분배는 크게 디자인 2명(권성호, 박소정), 프론트엔드 1명(유지홍), 백엔드 2명(양요셉, 김성령), IOT 2.5명(임영선, 권성호, 유상진 컨설턴트) 으로 이루어져 완성에 초점을 두어 프로젝트를 진행하여 효율성이나 자동화는 전혀 손을 쓰지 못했다는 것을 유념하면서 진행할 것을 추천한다.

## 서버 컴퓨터

빔 프로젝터와 연결된 서버 컴퓨터의 ip를 `192.168.1.201`로 고정한다. 터미널에선 [서버 폴더](../frontend/FE_practice/socket.io/socketio/app.js)로 이동한 후 `npm i --force` 를 통해 필요한 node_modul을 다운로드 받고 `node app.js`를 입력하여 서버를 실행한다.

아래와 같은 메시지를 확인하면 잘 켜진 것이다.

<img src="https://user-images.githubusercontent.com/19484971/188256943-f3221709-44e0-472f-a80f-ddcf2cc448f5.png" width=600>

[imaginary_playground](../frontend/FE_practice/imaginary_playground/) 폴더로 이동한 다음 `npm i --force` 를 통해 필요한 node_modul을 다운로드 받고 `npm run start`를 입력하여 react를 실행시키면 메인화면을 볼 수 있다.

아래와 같은 메시지와 함께 메인화면이 보이면 된다.

<img src="https://user-images.githubusercontent.com/19484971/188255501-a961d9ce-5ee9-440d-ad9c-08c28d20165e.png" width=600>

<img src="https://user-images.githubusercontent.com/19484971/188256969-4ae68474-4b51-4bda-b908-c11f41f4cb35.PNG" width=600>

메인화면이 빔 프로젝터를 통해 가로 200, 세로 112의 화면이 보이도록 세팅하고 브라우저의 화면을 ctrl을 클릭한 상태로 휠을 내려 화면비율을 맞춰준다. 해상도 1920*1080 화면에서 크롬 브라우저로 67%로 맞추고 F11로 전체화면으로 두면 된다.

비율을 맞춰주지 않으면.. 이미지의 위치가 맞지 않거나 크기가 맞지 않아 어색한 화면이 보인다.

## 무선터치센서

터치(물체감지) 데이터를 서버에 송신하는  위해 사용한다.장비가 있다는 가정하에 작성하겠다.

사용장비는 아래와 같다.

- 아두이노 WeMos D1 Mini
- WeMos D1 Mini Battery Shield
- 리튬폴리머배터리 (YJ603450)

<img src="https://user-images.githubusercontent.com/19484971/185298704-8e838b95-e6cf-46a9-85de-ec8e948f478f.jpg" width=400>

<img src="https://user-images.githubusercontent.com/19484971/185298707-3b8450af-d376-4951-b039-f5cc8aa96f7d.jpg" width=400>

사용하는 보드 & 라이브러리

- LOLIN(WEMOS) D1 mini (보드)
- ESP8266 (by ESP8266 Community)
- ArduinoJson
- WebSockets (by Markus Sattler)

필자의 경우 [해당 링크](https://glorlfy.tistory.com/4)를 보고 보드 기본 설정을 따라하였고 라이브러리는 위의 목록의 것을 보드 매니저에서 다운로드 받았다.

이후 [코드](../IOT/arduino/codes/WebSocketClientSocketIO_modified/WebSocketClientSocketIO_modified.ino)를 아두이노에 업로드한 후 적절한 위치에서 작동시키면 된다. 업로드할 때 `String num` 변수에 왼쪽 무선터치센서부터 순서대로 1, 2, 3, 4 를 넣어주어야 한다. 또한 벽면에 설치할 때도 아래의 그림에 따라서 순서에 따라서 적절한 간격으로 배치해주어야 한다.

<img src="https://user-images.githubusercontent.com/19484971/188360970-02eb4180-198a-4b0f-8b93-39a9b58dc362.png" width=400>

필자의 경우 무선터치센서 바닥에 구멍을 뚫어 몇 번째의 센서인지 표시를 해놓았다.

코드가 잘 업로드 되었다면 아두이노를 켰을 때 설정한 서버 컴퓨터에 터치데이터를 송신하게 되며 빔 프로젝터로 보이는 크기나 서버 컴퓨터의 ip가 바뀌면 수정하여 업로드를 진행해주어야 한다.

만약 잘 통신이 되었다면 아래와 같은 데이터를 컴퓨터의 서버에서 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/19484971/188257067-3705433b-5c6e-4b22-818a-056f6d63c0a1.PNG" width=600>

`hoNew client connected`는 리액트가 연결되었을 때, `distance: num width height`는 무선터치센서가 서버에 터치 데이터를 송신할 때 출력된다.

참고로 (가끔 멋대로 터치가 되었다고 인식하여 생각하지도 않은 맵에 들어가는 경우가 있어서) 메인화면에서는 강제 클릭 이벤트를 넣어주지 않았기 때문에 맵을 이동할 경우에는 마우스를 이용해야 한다.

- 무선 터치 센서 켜는법
    1. 5핀 단자로 충전을 한다. (충전 중인 경우에는 빨간불, 완전 충전이 되면 초록불)
    <img src="https://user-images.githubusercontent.com/19484971/188360634-574dac51-847b-4dc5-bc11-51307d68326e.jpg" width=300>
    2. 배터리 쉴드를 보드 위에 맞춰 끼우면 바로 작동한다. (전원 공급이 되면 파란불)
    <img src="https://user-images.githubusercontent.com/19484971/188360605-f31d9b53-61a9-48cd-a3ec-9563462d7e01.jpg" width=400>
    <img src="https://user-images.githubusercontent.com/19484971/188360614-bb1dedd1-bcc1-450c-a13a-fbeff7e67b39.jpg" width=400>
    3. 무선 터치 센서를 다 사용했다면 배터리 쉴드와 보드를 분해해주면 된다.
    <img src="https://user-images.githubusercontent.com/19484971/188360630-ad51aabe-fd07-41a7-9eff-5358baa91205.jpg" width=400>

- 전압계와 같은 장비가 없어 유지시간은 정확히 모르겠지만 4시간 이상 작동하는 것을 2번 확인

## 라즈베리파이 

라즈베리파이 이미지가 있으나 크기가 60GB나 되므로 깃에 올리지 못하였다. 라즈베리파이는 자세인식과 얼굴인식 기능을 사용하기 위해서 사용해야 한다.

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

[라즈베리파이에 폴더](../frontend/FE_practice/raspPiServerTest/)를 넣고 `node index.js`로 서버를 켠다. (`npm i --force` 를 통해 필요한 node_modul을 다운로드 받는 것 잊지말자.)

아래와 같이 서버가 켜진다.

<img src="https://user-images.githubusercontent.com/19484971/188258821-4106b90e-df2a-4f59-99ea-3b37635f9ad9.PNG" width=500>

라즈베리파이의 브라우저인 chromium에서 `localhost:3001`로 들어가면 react와 연동하여 자세인식을 하는 화면을 볼 수 있다. **react에서 통신이 있기 전까지는 카메라가 켜지지 않으며 꼭 해당 화면을 react가 자세인식을 활용하는 놀이(정글맵 동요 이후)를 시작하기 전에 켜야 기능이 활성화**된다.

순서에 맞게 잘 켰다면 아래와 같이 라즈베리파이에 연결한 웹캠을 통한 이미지를 확인할 수 있으며 특정 조건에 맞는 자세를 취하면 `자세명 1.00`과 같은 데이터가 송신되는 것을 볼 수 있다.

<img src="https://user-images.githubusercontent.com/19484971/188258813-23f80e53-5db3-4150-a647-6272f81bd37f.PNG" width=500>
<img src="https://user-images.githubusercontent.com/19484971/188258817-86b3fc10-d11b-4078-96a0-d2e17ac0cd1a.PNG" width=500>

아래와 같이 화면을 떠나도 카메라는 켜지고 있기 때문에 `ctrl+c`로 꼭 꺼주어야 한다.

<img src="https://user-images.githubusercontent.com/19484971/188258819-6c3e6a89-a436-4d48-818a-53238ce82a4c.PNG" width=500>

facial_recognition 설치 메뉴얼에 따라 다운로드한 facial_recognition 깃헙 폴더에 [한 파일](../IOT/RaspberryPi/facialRecognition/facial_req_custom.py)을 넣고 `facial_req.py` 대신 `facial_req_custom.py`을 실행하여 위의 파일과 같이 react와 연동하여 사용한다. 마찬가지로 **react로 부터의 통신이 있기 전까지는 얼굴인식 기능이 시작되지 않으며 얼굴인식을 활용하는 맵(크리스마스 맵)을 들어가기 전에 켜주어야** 한다.

크리스마스 맵에 들어갈 때는 준비된 아이디 `jimdac.naver.com`과 비밀번호 `wlaekr123`을 입력한다. 해당 아이디는 요들팀의 팀원들의 정보(사진)가 미리 입력되어있다.

순서대로 잘 진행하였다면 라즈베리파이의 카메라가 켜지며 얼굴인식하는 기능이 시작되며 인식한 얼굴은 서버 컴퓨터로 이름(라벨)을 송신한다.

<img src="https://user-images.githubusercontent.com/19484971/188258825-659ea47f-10c9-4529-8777-121251b0bad2.PNG" width=500>

기능 사용이 끝났다면 `ctrl+c`로 프로그램을 끝내어 카메라를 해제해준다.

<img src="https://user-images.githubusercontent.com/19484971/188258826-59dbefd2-8f82-4699-9cb0-cba8140d3235.PNG" width=400>

얼굴인식과 자세인식 모두 카메라를 사용하는 기능이기 때문에 두 기능을 동시에 작동시킬 수 없다. 또한 아래의 로그인 방식 때문에 직접 원하는 얼굴인식을 넣는 것은 현재 손이 많이간다.

### 로그인

현재 로그인은 병원 관계자라는 것을 증빙하기 위해서 재적 증명서를 등록하고 담당자(현재는 유지홍 팀원)의 승인을 받아야 가입이 완료되고 가입 후에 환자를 등록하여 진행할 수 있다. 이 때 등록한 환자들의 이미지 3장이 크리스마스 맵에서 보이게 된다.

위에서 알려준 아이디인 `jimdac@naver.com`을 사용하여 크리스마스 맵에 들어가면 아래와 같이 보인다.

<img src="https://user-images.githubusercontent.com/19484971/188259261-f635dd35-8bf1-4e0e-9041-5a2253dbb565.png" width=400>

(현재 특화프로젝트 진행으로 인해서 ip 주소가 꼬였는지 고정 ip를 사용하면 인터넷이 끊겨 로그인을 하지 못해 실재 해당 페이지에서 얼굴인식이 되는지 확인을 못했다. 하지만 시연 이후에 readme 파일을 제외하고 바꾼 파일은 없으므로 잘 될 것이라고 생각한다.)