# 아두이노

## Wemos D1 mini

컨설턴트님이 소개해주셔서 사용해보기로 하였다. 

wifi를 통해서 데이터를 주고 받을 수 있다는 이야기를 듣고 구글링을 해보았더니 말씀 그대로 같은 wifi에서 소켓통신을 통해 데이터를 주고 받을 수 있다는 사실을 알게 되었다. 

통신을 할 때 사용하는 라이브러리를 크게 `socket.io`와 `webSocket`로 2가지 있었는데 [한 블로그](https://www.peterkimzz.com/websocket-vs-socket-io/)에서 잘 정리한 글이 있어서 쉽게 이해할 수 있었다. 

나중에 보니 `socket.io` 공식 홈페이지에서도 `webSocket`에 대해서 (서로의 라이브러리로 통신은 불가능하다는) [언급](https://socket.io/docs/v4/#what-socketio-is-not)하기도 한 것을 볼 수 있었다.
<img src="https://user-images.githubusercontent.com/19484971/183301787-c6083664-0132-4a7e-b497-1314a77718f7.png" width=600>

필자가 진행하고 있는 프로젝트는 통신이 간단하기도 하고 빠르게 통신을 해야하기 때문에 이러한 요건을 모두 갖춘 `webSocket`가 딱 맞았다.

빠른 통신을 원하는 이유는 터치 데이터를 송신할 때 통신속도로 인하여 0.2초만 늦게 데이터를 받아도 마치 터치 인식이 엇박자로 느껴질만큼 이상하게 느껴질 수 있기 때문이다. 

### WebSocket 통신

[한 블로그](https://www.hardcopyworld.com/?p=3215)에서 `Wemos D1 mini`와 라즈베리파이 간 `WebSocket`통신을 진행한 코드를 보고 진행하였다. 

문제는 블로그 주인은 ESP32를, 필자는 ESP8266을 사용하였기 때문에 `WiFi.h` 대신 `ESP8266WiFi.h`을 사용하고 파일의 함수명도 바꿀 필요가 없었다.

이를 토대로 필자에게 맞는 [서버 코드](./codes/esp8266_server_test/esp8266_server_test.ino)를 만들었고 무사히 진행할 수 있었다.

