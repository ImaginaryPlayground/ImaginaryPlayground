# 아두이노

## Wemos D1 mini

기존에 생각하던 초음파센서의 사용법은 라즈베리파이 보드에 직접 초음파센서들을 연결하여 활용하는 방식이었다. 그런데 유선이 아니라 무선으로 초음파센서의 데이터를 받을 수 있는 방법을 컨선턴트님이 제시해 주셨고 이로 인해서 해당 보드의 존재를 알게되었다. 동시에 프로젝트의 방향이 크게 변화하였다.

`무선`이라는 단어 하나에 굉장히 큰 매력을 느껴서 바로 사용하기로 하고 보드를 접했는데, 납땜을.. 해야하는줄 몰랐다. 당근\*\*이나 쿠*을 보면서 인두기를 구하려고 했는데 필자의 본가에 인두기가 있어서 받아서 사용하였다.

<img src="https://user-images.githubusercontent.com/19484971/185759207-1e8e4aca-5f86-47e6-9526-ce8562319377.jpg" width=300>
<img src="https://user-images.githubusercontent.com/19484971/185759204-9261d4ab-5a87-43ec-95bd-c8810fca7f12.jpg" width=300>
> 본가에서 받은 인두기, 잘- 보면 110V 220V 20W 30W 라고 쓰여있고 주의문구가 있다.

보드를 납땜한 후에 바로 사용할 수는 없었고 보드 설정을 해야 코드 업로드가 가능하였다. 그 과정을 [한 블로그의 글](https://glorlfy.tistory.com/4)을 보고 진행하였다.

### 통신 선택

wifi를 통해서 데이터를 주고 받을 수 있다는 이야기를 듣고 구글링을 해보았더니 말씀 그대로 같은 wifi에서 소켓통신을 통해 데이터를 주고 받을 수 있다는 사실을 알게 되었다. 통신을 할 때 사용하는 라이브러리를 크게 `socket.io`와 `webSocket`로 2가지 있었는데 [한 블로그](https://www.peterkimzz.com/websocket-vs-socket-io/)에서 잘 정리한 글이 있어서 쉽게 이해할 수 있었다. 

나중에 보니 `socket.io` 공식 홈페이지에서도 `webSocket`에 대해서 (서로의 라이브러리로 통신은 불가능하다는) [언급](https://socket.io/docs/v4/#what-socketio-is-not)하기도 한 것을 볼 수 있었다.
<img src="https://user-images.githubusercontent.com/19484971/183301787-c6083664-0132-4a7e-b497-1314a77718f7.png" width=600>

필자가 진행하고 있는 프로젝트는 통신이 간단하기도 하고 빠르게 통신을 해야하기 때문에 이러한 요건을 모두 갖춘 `webSocket`가 딱 맞았다.

빠른 통신을 원하는 이유는 터치 데이터를 송신할 때 통신속도로 인하여 0.2-3초만 늦게 데이터를 받아도 마치 터치 인식이 엇박자로 느껴질만큼 이상하게 느껴질 수 있기 때문이다. 

**그런데**

컨설턴트님이 말씀하시기를.. 두 방식은 속도에 있어서 크게 차이가 없다고 말씀하셨다. 참고한 오버플로우의 글은 10년전의 글이므로 컨설턴트님의 말씀을 믿기로 하고 후에는 `socket.io` 라이브러리를 사용하기로 바꾸었다.

ps. 두 통신 방식을 직접 모두 구현하고 시간을 확인하기에는 너무 촉박했다.

#### WebSocket

[한 블로그](https://www.hardcopyworld.com/?p=3215)에서 `Wemos D1 mini`와 라즈베리파이 간 `WebSocket`통신을 진행한 코드를 보고 진행하였다. 아두이노 [esp8266에서 사용하는 websocket 라이브러리](https://github.com/morrissinger/ESP8266-Websocket)와 [라즈베리파이에서 사용하는 websocket 라이브러리](https://github.com/websocket-client/websocket-client) 고하였다고 한다.

esp8266에서의 기본 라이브러리인 [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html)도 사용해야 하므로 공식홈페이지도 조금 읽어보고 진행하였다.

문제는 블로그 주인은 ESP32를, 필자는 ESP8266을 사용하였기 때문에 `WiFi.h` 대신 `ESP8266WiFi.h`을 사용하고 파일의 함수명도 바꿀 필요가 없었다. 이를 토대로 필자에게 맞는 [서버 코드](./codes/esp8266_server_test/esp8266_server_test.ino)를 만들었고 무사히 진행할 수 있었다.

하지만 이후, Socket.io로 라이브러리를 바꾸고 아두이노는 데이터를 송신하기만 하는 역할이기 때문에 Server가 아닌 Client의 역할이 맞다고 생각하여 SocketClient 코드를 넣을 예정이다.

팀원도 필자도 많이 힘들었는지, 왜 아두이노에 Server를 넣는 것이 맞다고 했는지 기억이 잘 안난다.

#### Socket.io

라즈베리파이에서는 3D캐릭터의 로딩이 잘 되지 않는 다는 점을 뒤늦게 알아차리고 라즈베리파이 대신 노트북의 node.js 서버와 조금 더 원활하게 통신하기 위해서 socket.io 통신으로 바꾸게 되었다. 속도에 대한 걱정이 있었으나, 컨설턴트님이 말씀하시길 큰 속도차이가 있는 것이 아니라고 하셔서 고민없이 변경하였다.

arduino에서 사용할 수 있는 [예제코드](https://github.com/timum-viw/socket.io-client)를 참고하여 권성호 팀원이 기본적인 통신코드를 작성하였고 필자가 위에서 만들었던 WebSocket 코드의 초음파 알고리즘만을 잘 끼워넣어 node.js로 초음파를 통한 물체 거리 데이터를 송신하는 코드[socket.io client 코드](./codes/WebSocketClientSocketIO/WebSocketClientSocketIO.ino)를 작성하였다.

이 때 사용하는 라이브러리는 다음과 같다.
+ SpacebrewYun.h
+ Arduino.h
+ ESP8266WiFi.h
+ ESP8266WiFiMulti.h
+ ArduinoJson.h
+ WebSocketsClient.h
+ SocketIOclient.h
+ Hash.h

esp8266과 관련된 라이브러리는 esp8266 (by ESP8266 Community / v3.0.2)   
ArduinoJson은 ArduinoJson (by Benoit Blanchon / v6.19.4)   
WebSocketsClient와 SocketIOclient는 WebSockets (by Markus Sattler / v2.3.6)   
나머지는 아두이노를 설치하면 기본적으로 설치되는지 문제가 되지 않았다.

이후 프론트엔드의 유지홍 팀원과 같이 위에서 작성한 [코드를 개선](./codes/WebSocketClientSocketIO_modified/WebSocketClientSocketIO_modified.ino)하였고 정상적으로 화면 터치가 되는것을 확인하였다.

<img src="../video/ultrasonic_test1.gif" width=500>

위의 예제코드를 사용하기 위해서는 일단 잘 설정된(드라이버가 설치된 컴퓨터와 보드 설정이 되어있는) Wemos D1 mini에 코드를 넣어야 한다. 해당 모델에 대해 검색하면 설정하는 방법을 기술한 블로그 중 하나를 보고 설정하여 진행하였다.

## WeMos D1 Mini Battery Shield

필자는 다이소에 있는 알카라인 쉴드 배터리1.5V 2~3개정도 직렬로 끼우고 연결하면 되는 줄 알았는데.. 아니였다. 회로도를 그리고 컨설턴트님께 작동가능한 설계도인지 물어보았는데, 그 때 존재를 알게되었다. 

단순히 핸드폰 배터리, 리모컨의 알카라인 건전지를 갈아끼우기만 하고 보통의 배터리 충전기와는 너무나도 다른 외견에 쉴드 배터리가 눈앞에 있어도 무엇을 하는 기기인지 몰라서 사용할 생각을 못하였다.

여기에서 작성된 배터리 쉴드는 아래와 같은 기능은 한다.

- 3.7V 리튬 이온 배터리를 승압하여 5V로 만듦
- 아두이노에 안정적인 전원 공급
- 연결된 배터리의 잔량을 체크하여 알람 인터럽트 등을 보냄
- 연결된 배터리를 USB 케이블을 이용하여 충전

필자가 사용한 리튬이온 배터리는 특성상 배터리를 방전할 때까지 사용하면 배터리의 수명이 줄어들고 배터리의 충전량에 따라서 전압이 소폭 달라질 수 있다고 하기에 신경써서 충전해주며 프로젝트를 진행해주었다.

### 결과

wemos D1 mini와 WeMos D1 Mini Battery Shield, 리튬폴리머배터리, 초음파 센서를 활용하여 포터블 터치 IOT를 제작하였다.

<img src="https://user-images.githubusercontent.com/19484971/185298704-8e838b95-e6cf-46a9-85de-ec8e948f478f.jpg" width=400>

<img src="https://user-images.githubusercontent.com/19484971/185298707-3b8450af-d376-4951-b039-f5cc8aa96f7d.jpg" width=400>
