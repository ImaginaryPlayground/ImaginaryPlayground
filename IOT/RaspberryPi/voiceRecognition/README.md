# 음성인식 서비스

## 장치 선택

일단 마이크부터 찾아야 한다.

라즈베리파이에 간단한 마이크 모듈이나 웹캠에 내장된 마이크도 사용해 보았다.

 마이크 모듈은 너무.. 16비트, 32비트같은 저음질 녹음이 되고 웹캠은 음질은 나쁘지 않지만, 마이크처럼 입 앞에 두고 말해야 할 정도로 음감도가 나빴다.

그 강의에서 나누어준 것 중에서 usb에 연결해서 사용하는 것인 줄은 알았지만 어떤 작업에 쓰이는 것인지 모르겠는 하드웨어가 하나 있었는데.. 마이크였다;

https://www.adafruit.com/product/3367

놀랍게도 본인이 사용하려고 하는 [Google Assistant](https://developers.google.com/assistant/sdk/guides/service/python)에서 추천하는 마이크로 바로 끼워서 녹화, 음질, 음감도 등을 테스트해볼 예정이다.

## Google Assistant API

스마트 기기에 자주 쓰이는 api 중 하나, 스마트 스피커에서 'OK Google!'이라고 부르면 호출되는 것이 바로 이 api 서비스 중 하나이다.

[google assistant 서비스 공식 홈페이지](https://developers.google.com/assistant/sdk/guides/service/python/embed/setup?hardware=rpi)

리뉴얼된 페이지에서 클릭을 잘못하여 해매다가 [참고한 동영상](https://www.youtube.com/watch?v=wavlbH0M1Zg)을 보면서 진행하였다.

**Google Cloud에 로고와 프로젝트 도메인 등 추가정보를 기입해보자.**

도중에 음성인식을 프론트에서 처리하겠다고 하여 멈추었다. 그런데.. 음성인식을 적용하는 이유가 상담 서비스를 구현하려고 적용하는 것인데 tts만 적용한 것 같다. 팀원에게 다시 물어보아야 겠다.
