# ERROR and BUGS

## Wemos D1 mini 보드 납땜

Wemos D1 mini 보드에 초음파 센서가 작동하는지 확인하고 wifi로 통신하는 것을 보려고 했으나..

[설정](https://glorlfy.tistory.com/4
)과 [회로도](http://www.esp8266learning.com/wemos-mini-hc-sr04-ultrasonic-sensor.php)를 구글링해서 잘 적용한 것 같은데도 너무 안되서 진행이 막혔다..

값이 0만 뜨고있다..

납땜을 작업할 도구가 없어 납땜없이 wemos D1 mini 보드만을 사용했는데 이 때문에 보드와 전선이 잘 연결이 되지 않아 값이 0만 측정되는 것이었다..

정확히 하루 날렸다.

### 인두 문제

그 후 납땜을 진행해보려고 하는데, 인두에는 이미 납이 묻어있고 온도도 110도와 220도만 설정할 수 있어서 불안했다.   
가지고 있는 것이 인두와 납 밖에 없고 부가적인 장비가 없어서 유튜브에서 납땜하는 동영상이나 팁을 보고 진행하게 되었다.

참고한 동영상
- https://www.youtube.com/watch?v=H8R8x8BKjII
- https://www.youtube.com/watch?v=TAKn4N3bdKI

가지고 있던 인두의 와트가 20W인 것도 있지만.. 인두 끝부분에 납이 묻어있는 수준이 아니라, 태운것이었다.   
때문에 끝부분으로는 열이 잘 가해지지 않아서 인두 중간부분에서 납을 녹이고 녹인 납이 식기 전에 기판에 옮기는 이상한 방식으로 겨우겨우 납땜을 진행하였다. 그래도 열이 강한 인두는 아닌지 기판이 상하지는 않았다.

너무너무 납이 안 녹아서 사용하는 핀에만 납을 녹이고 다른 부분은 녹이지 않았다.

## WebSocket 통신 고정 IP

WebSocket에서 고정 IP를 설정할 수 있다고 많이 [작성](https://blog.naver.com/smserial/221310020331)되어있는데.. config하면 false만 반환되어 적용이 안되고 있다.

[유투브 동영상](https://www.youtube.com/watch?v=1BrsD2fxSpc)을 참고해서 서브넷과 게이트웨이를 맞춰주었고 설정도 추가로 변경해보았지만 변경되지 않았다.