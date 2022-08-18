# [facial_recognition](https://github.com/carolinedunn/facial_recognition)

face recognition을 시도하다가 scikit-learn 설치가 정체된 도중에 시도해본 라이브러리이다.

[가이드](https://www.tomshardware.com/how-to/raspberry-pi-facial-recognition)에 따라서 설치하는 문제없이 설치되어서 진행하게 되었다.

그런데.. 팀원들 얼굴사진을 넣고 실행해보니 너무 구분을 못해서 슬프다.. 컨설턴트님이 어떻게하면 정답률을 높일 수 있는지에 관해 아시고 있는 듯 하여 도움을 받아 진행해보려고 한다.

## 얼굴 인식 과정

face_recognition 라이브러리와 얼굴인식 모델링과 관련된 pickle이라는 라이브러리만으로 얼굴인식을 하고있는 facial_recogniton의 라이브러리 코드를 보면서 의아해하고 있던 중에 face_recognition의 얼굴인식 과정을 알게되었다.

1. 