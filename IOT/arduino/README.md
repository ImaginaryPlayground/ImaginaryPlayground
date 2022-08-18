# 아두이노

## Wemos D1 mini

컨설턴트님이 소개해주셔서 사용해보기로 하였다. 

wifi를 통해서 데이터를 주고 받을 수 있다는 이야기를 듣고 구글링을 해보았더니 말씀 그대로 같은 wifi에서 소켓통신을 통해 데이터를 주고 받을 수 있다는 사실을 알게 되었다. 

통신을 할 때 사용하는 라이브러리를 크게 `socket.io`와 `webSocket`로 2가지 있었는데 [한 블로그](https://www.peterkimzz.com/websocket-vs-socket-io/)에서 잘 정리한 글이 있어서 쉽게 이해할 수 있었다. 

나중에 보니 `socket.io` 공식 홈페이지에서도 `webSocket`에 대해서 (서로의 라이브러리로 통신은 불가능하다는) [언급](https://socket.io/docs/v4/#what-socketio-is-not)하기도 한 것을 볼 수 있었다.
<img src="https://user-images.githubusercontent.com/19484971/183301787-c6083664-0132-4a7e-b497-1314a77718f7.png" width=600>

필자가 진행하고 있는 프로젝트는 통신이 간단하기도 하고 빠르게 통신을 해야하기 때문에 이러한 요건을 모두 갖춘 `webSocket`가 딱 맞았다.

빠른 통신을 원하는 이유는 터치 데이터를 송신할 때 통신속도로 인하여 0.2초만 늦게 데이터를 받아도 마치 터치 인식이 엇박자로 느껴질만큼 이상하게 느껴질 수 있기 때문이다. 

**그런데**

컨설턴트님이 말씀하시기를.. 두 방식은 속도에 있어서 크게 차이가 없다고 말씀하셨다. 참고한 오버플로우의 글은 10년전의 글이므로 컨설턴트님의 말씀을 믿기로 하고 후에는 `socket.io` 라이브러리를 사용하기로 바꾸었다.

### WebSocket 통신

[한 블로그](https://www.hardcopyworld.com/?p=3215)에서 `Wemos D1 mini`와 라즈베리파이 간 `WebSocket`통신을 진행한 코드를 보고 진행하였다. 아두이노 [esp8266에서 사용하는 websocket 라이브러리](https://github.com/morrissinger/ESP8266-Websocket)와 [라즈베리파이에서 사용하는 websocket 라이브러리](https://github.com/websocket-client/websocket-client) 고하였다고 한다.

esp8266에서의 기본 라이브러리인 [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html)도 사용해야 하므로 공식홈페이지도 조금 읽어보고 진행하였다.

문제는 블로그 주인은 ESP32를, 필자는 ESP8266을 사용하였기 때문에 `WiFi.h` 대신 `ESP8266WiFi.h`을 사용하고 파일의 함수명도 바꿀 필요가 없었다.

이를 토대로 필자에게 맞는 [서버 코드](./codes/esp8266_server_test/esp8266_server_test.ino)를 만들었고 무사히 진행할 수 있었다.

websocket은 server 코드로 작성하였다. 하지만 이후 사용할 socket.io에서는 client를 넣을 예정이다.

### Socket.io 통신

라즈베리파이에서는 3D캐릭터의 로딩이 잘 되지 않는 다는 점을 뒤늦게 알아차리고 라즈베리파이 대신 노트북의 아니라 node.js 서버와 통신하기 위해서 socket.io 통신으로 바꾸게 되었다. 동시에 이전에 잘못 생각하여 만들었던 아두이노가 socketServer 를 socketClient로 변

arduino에서 사용할 수 있는 [예제코드](https://github.com/timum-viw/socket.io-client)를 참고하여 권성호 팀원이 기본적인 통신코드를 작성하였고 필자가 위에서 만들었던 코드의 초음파 알고리즘만을 추가하여 node.js로 송신하는 [socket.io client 코드](./codes/WebSocketClientSocketIO/WebSocketClientSocketIO.ino)를 작성하였다.

이후 프론트엔드의 유지홍 팀원과 같이 위에서 작성한 [코드를 개선](./codes/WebSocketClientSocketIO_modified/WebSocketClientSocketIO_modified.ino)하였고 정상적으로 화면 터치가 되는것을 확인하였다.

<img src="https://user-images.githubusercontent.com/19484971/185301267-ec0ad0b2-dc8b-4008-9fc1-4b8dfbdf1c14.png
" width=800>

### 결과

wemos D1 mini와 WeMos D1 Mini Battery Shield, 리튬폴리머배터리, 초음파 센서를 활용하여 포터블 터치 IOT를 제작하였다.

<img src="https://user-images.githubusercontent.com/19484971/185298704-8e838b95-e6cf-46a9-85de-ec8e948f478f.jpg" width=400>

<img src="https://user-images.githubusercontent.com/19484971/185298707-3b8450af-d376-4951-b039-f5cc8aa96f7d.jpg" width=400>
