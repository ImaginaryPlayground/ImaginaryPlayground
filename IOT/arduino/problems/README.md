# ERROR and BUGS

## Wemos D1 mini 보드 납땜

Wemos D1 mini 보드에 초음파 센서가 작동하는지 확인하고 wifi로 통신하는 것을 보려고 했으나..

[설정](https://glorlfy.tistory.com/4
)과 [회로도](http://www.esp8266learning.com/wemos-mini-hc-sr04-ultrasonic-sensor.php)를 구글링해서 잘 적용한 것 같은데도 너무 안되서 진행이 막혔다..

값이 0만 뜨고있다..

납땜을 작업할 도구가 없어 납땜없이 wemos D1 mini 보드만을 사용했는데 이 때문에 보드와 전선이 잘 연결이 되지 않아 값이 0만 측정되는 것이었다..

정확히 하루 날렸다.

## WebSocket 통신 고정 IP

WebSocket에서 고정 IP를 설정할 수 있다고 많이 [작성](https://blog.naver.com/smserial/221310020331)되어있는데.. config하면 false만 반환되어 적용이 안되고 있다.