# IOT

- [RaspberryPi](./RaspberryPi/README.md)
- [arduino(무선 터치 센서)](./arduino/README.md)

## 기능

### 터치감지

아무것도 없는 벽에 빔 프로젝터를 쏘아 보이는 화면을 마치 터치하는 것과 같은 효과를 줄 수 있도록 초음파 센서를 활용하여 물체를 감지한다. 물체를 감지하면 아두이노 wifi 모듈은 물체까지의 거리 데이터를 node.js 서버를 통해 React(화면)으로 송신하여 마치 마우스로 해당 위치를 클릭하는 것과 같은 기능을 수행한다.

해당 기능을 하는 장비를 `무선 터치 센서`라고 불렀다.

[무선터치센서 readme](./arduino/README.md)
[아두이노 wifi 모듈 코드](./arduino/codes/WebSocketClientSocketIO_modified/WebSocketClientSocketIO_modified.ino)

발표 직전까지 자체적으로 만들 알고리즘(`touchPos` 함수)을 적용시킬지 말지 고민하다가 터치 속도상의 문제로 제외시켜서 사용하지 않는 코드 부분이 많다.

#### 사용장비

+ 초음파 센서 (HC-SR04, HC-SR04P)
+ 아두이노 wifi 모듈 (Wemos D1 mini)
+ 아두이노 wifi 모듈 배터리 쉴드 (WeMos D1 Mini Battery Shield)
+ 리튬폴리머배터리 (lithium polymer battery YJ603450)

`HC-SR04` 초음파센서를 사용하다가 도중에 `HC-SR04P`로 바꾸었지만, 정확도가 높아져서 오히려 벽면을 탐지해버리는 바람에 다시 `HC-SR04P`로 바꾸었다.

#### 사용기술

+ ESP8266WiFi (아두이노 wifi 통신)
+ Socket.io (소켓 통신)

#### 회로도

아두이노 wifi 모듈 esp8266(wemos D1 mini)와 WeMos D1 Mini Battery Shield, 리튬폴리머배터리, 초음파 센서 회로도

<img src="https://user-images.githubusercontent.com/19484971/184803510-7229079e-b84e-4d62-8690-20519ad8d866.png" width=400>

> with [fritzing](https://fritzing.org/)

#### 실재 사진

파란색 불빛은 아두이노가 전원이 켜져있다는 의미이다.

<img src="https://user-images.githubusercontent.com/19484971/185298704-8e838b95-e6cf-46a9-85de-ec8e948f478f.jpg" width=400>

<img src="https://user-images.githubusercontent.com/19484971/185298707-3b8450af-d376-4951-b039-f5cc8aa96f7d.jpg" width=400>

#### 작동확인

위에 붙어있는 4개의 상자가 무선 터치 센서를 담고있는 상자이다.

<img src="./video/ultrasonic_test1.gif" width=500>

<img src="./video/ultrasonic_test2.gif" width=500>

### 얼굴인식

웹캠 이미지를 face_recognition을 통해 사람의 얼굴을 탐지하고 학습이 된 사람이라면 누구인지 식별한다. 

식별된 사람들의 이름은 라즈베리파이의 node.js 서버를 통해서 React에 전달된다.

[얼굴인식 readme](./RaspberryPi/facialRecognition/README.md)

#### 사용장비

+ Raspberry Pi
+ webcam

#### 사용기술

+ openCV (머신러닝을 위한 실시간 이미지 처리)
+ dlib (머신러닝 알고리즘 모던 C++ toolkit)
+ face_recognition (openCV와 dlib를 활용한 얼굴인식 라이브러리)
+ imutils (이미지 크기 조정, 로테이션 등의 기본적인 이미지 처리 라이브러리)
+ pickle (파이썬 객체 직렬화/역직렬화 모듈 - 별도의 변환없이 파이썬 객체 저장)
+ facial_recognition (imutils와 pickle을 활용하여 face_recognition을 쉽게 활용한 라이브러리)
+ Socket.io (소켓 통신)
+ Node.js (통신 서버)

위 기술 중 직접 코딩을 한 부분은 `face_recognition`, `Socket.io`, `Node.js`이다.

#### 작동확인

<img src="https://user-images.githubusercontent.com/19484971/203593807-58da646a-c295-4f60-9777-1b97ea229bc9.gif" width=500>

<img src="./video/face_test1.gif" width=500>

### 자세인식

Google에서 개발한 Teachable Machine 을 활용하여 간단한 자세를 인식하는 모델을 만들고 이를 통해 웹캠의 사람의 자세를 인식한다. 

특정한 자세를 취하면 해당 자세를 인식하고 인식한 자세와 자세의 인식율을 라즈베리파이의 node.js 서버를 통해서 React에 전달한다.

[자세인식 readme](./RaspberryPi/README.md#teachable-machine-library---pose)

#### 사용장비

+ Raspberry Pi
+ webcam

#### 사용기술

+ [Teachable Machine](https://teachablemachine.withgoogle.com/)
+ Socket.io (소켓 통신)
+ Node.js (통신 서버)

#### 작동확인

<img src="https://user-images.githubusercontent.com/19484971/203600419-587ec019-8bd9-4872-93c3-2887c7543e34.gif" width=500>

팀원이던 지홍님의 자세인식 테스트

## 통신 흐름도

<img src="https://user-images.githubusercontent.com/19484971/185294578-ad6241b8-ab41-41b2-bb18-1790a4928d9e.png" width=500>

> with [draw.io](https://www.draw.io/)

## 느낀점

라즈베리파이에 기능을 추가하기 위해서 다양한 라이브러리를 설치하는 도중(porting 작업) [굉장히 다양한 에러](./RaspberryPi/problems/README.md)와 무선 터치 센서를 만드는 도중 봐야했던 알 수 없는 스팩(specification)을 읽고 컨설턴트님의 도움을 받아 만들었던 것이 가장 힘들었다.

정작 급하게 만든 자세인식이나 얼굴인식은 적용이 어렵지는 않았으나, 너무 늦게 기능을 추가하여 모든 기능이 수동으로 진행하던 점이 너무 아쉬웠다.