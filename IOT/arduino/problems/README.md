# ERROR and BUGS

## Wemos D1 mini 보드 납땜

Wemos D1 mini 보드에 초음파 센서가 작동하는지 확인하고 wifi로 통신하는 것을 보려고 했으나..

[설정](https://glorlfy.tistory.com/4
)과 [회로도](http://www.esp8266learning.com/wemos-mini-hc-sr04-ultrasonic-sensor.php)를 구글링해서 잘 적용한 것 같은데도 너무 안되서 진행이 막혔다..

값이 0만 뜨고있다..

납땜을 작업할 도구가 없어 납땜없이 wemos D1 mini 보드만을 사용했는데 이 때문에 보드와 전선이 잘 연결이 되지 않아 값이 0만 측정되는 것이었다..

정확히 하루 날렸다.

그 후 납땜을 진행해보려고 하는데, 인두에는 이미 납이 묻어있고 온도도 110도와 220도만 설정할 수 있어서 불안했다.   
가지고 있는 것이 인두와 납 밖에 없고 부가적인 장비가 없어서 유튜브에서 납땜하는 동영상이나 팁을 보고 진행하게 되었다.

참고한 동영상
- https://www.youtube.com/watch?v=H8R8x8BKjII
- https://www.youtube.com/watch?v=TAKn4N3bdKI

## WebSocket 통신 고정 IP

WebSocket에서 고정 IP를 설정할 수 있다고 많이 [작성](https://blog.naver.com/smserial/221310020331)되어있는데.. config하면 false만 반환되어 적용이 안되고 있다.

[유투브 동영상](https://www.youtube.com/watch?v=1BrsD2fxSpc)을 참고해서 서브넷과 게이트웨이를 맞춰주었고 설정도 추가로 변경해보았지만 변경되지 않았다.