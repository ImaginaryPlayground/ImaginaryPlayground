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

컨설턴트님이 말씀하시기를.. 두 방식은 속도에 있어서 크게 차이가 없다고 말씀하셨다. 참고한 오버플로우의 글은 10년전의 글이므로 컨설턴트님의 말씀을 믿기로 하고 `socket.io` 라이브러리를 사용하기로 바꾸었다.


### WebSocket 통신

[한 블로그](https://www.hardcopyworld.com/?p=3215)에서 `Wemos D1 mini`와 라즈베리파이 간 `WebSocket`통신을 진행한 코드를 보고 진행하였다. 아두이노 [esp8266에서 사용하는 websocket 라이브러리](https://github.com/morrissinger/ESP8266-Websocket)와 [라즈베리파이에서 사용하는 websocket 라이브러리](https://github.com/websocket-client/websocket-client) 고하였다고 한다.

esp8266에서의 기본 라이브러리인 [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html)도 사용해야 하므로 공식홈페이지도 조금 읽어보고 진행하였다.

문제는 블로그 주인은 ESP32를, 필자는 ESP8266을 사용하였기 때문에 `WiFi.h` 대신 `ESP8266WiFi.h`을 사용하고 파일의 함수명도 바꿀 필요가 없었다.

이를 토대로 필자에게 맞는 [서버 코드](./codes/esp8266_server_test/esp8266_server_test.ino)를 만들었고 무사히 진행할 수 있었다.

websocket은 server 코드로 작성하였다. 하지만 이후 사용할 socket.io에서는 client를 넣을 예정이다.

### Socket.io

진행중..

### 전원 공급

wifi를 통해 초음파 센서의 값을 `무선으로` 라즈베리파이 혹은 노트북에 전송한다는 것은 전원도 배터리를 사용해야한다는 의미이다. 그런데 그것을 생각하지 못하다가 벽에 붙일 생각을 하고나서야 배터리를 구할 생각을 하게 되었다.

원래는 리튬폴리머배터리 1000mAh 가지고 있는 빵판의 크기(5cm * 3.5cm)와 비슷한 것으로 구하려고 하였으나, 해당 배터리의 충전 단자와 케이블과 어댑터 등등이 없어서 단순히 AA배터리홀더를 주문하고 약간의 작업을 통해 전원 공급을 할 배터리를 만들게 되었다.

필자의 회로도를 보신 컨설턴트님이 회로도의 이상함을 느껴 이야기하다가[ESP8266 WeMos D1 Mini 스펙](https://diyi0t.com/esp8266-wemos-d1-mini-tutorial/)을 보게되었다. 단순히 3V의 전원으로는 

스펙을 알아야 된다고 알고는 있었지만, 기능 구현에 급해서 찾아야 된다는 생각 자체를 못했던것 같다; 매일 컨설턴트님에게 열심히 질문하다가 알아차려서 다행이었다 @,.@

이해가 안되어서 찾아보게된 [동영상](https://www.youtube.com/watch?v=z6Vgy1cY0XU)을 통해서 어떻게 만들어야할지 알게되었다. 추가로 납땜을 더 해야한다는 사실에 (현재 가진 인두기 성능이 너무 안좋아서) 인두기와 납을 새로 사야할 것 같다... 