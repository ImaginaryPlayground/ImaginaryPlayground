# [facial_recognition](https://github.com/carolinedunn/facial_recognition)

face recognition을 시도하다가 scikit-learn 설치가 정체된 도중에 시도해본 라이브러리이다.

[가이드](https://www.tomshardware.com/how-to/raspberry-pi-facial-recognition)에 따라서 설치하는 문제없이 설치되어서 진행하게 되었다.

그런데.. 팀원들 얼굴사진을 넣고 실행해보니 너무 구분을 못해서 슬프다.. 컨설턴트님이 어떻게하면 정답률을 높일 수 있는지에 관해 아시고 있는 듯 하여 도움을 받아 진행해보려고 한다.

...

알고보니 본인이 `encodig`을 잘못 이해하여서 해매고 있던 것이다. `encoding`은 얼굴 임베딩(facial embedding)을 하기 위해 사용하는 용어인데 단순히 얼굴이미지의 크기를 줄여주는 기능이라고 오해하여 기능을 눈 앞에 두고 활용하지 못한 것..!

## 얼굴 인식 과정

face_recognition 라이브러리와 얼굴인식 모델링과 관련된 pickle이라는 라이브러리만으로 얼굴인식을 하고있는 facial_recogniton의 라이브러리 코드를 보면서 의아해하고 있던 중에 face_recognition의 얼굴인식 과정을 알게되었다.

1. 해당 라이브러리에는 이미 얼굴인식을 하는 AI가 포함되어있다. 이 AI를 활용하여 많은 물체 중에서도 사람의 얼굴만을 구별해낸다.
2. 1번에서 추출한 사람의 얼굴을 `encoding`하여 얼굴 임베딩(facial embedding)을 진행한다.
    + embedding(임베딩) : 이미지나 음성과 같은 비정형적인 데이터를 기계가 알아볼 수 있도록 수치화, 벡터화하는 과정
3. 2번에서 각 얼굴을 `encoding`한 결과를 저장하는 모델을 만든다.
4. 카메라를 통해서 보이는 얼굴과 모델에 저장된 `encoding`한 얼굴과 유사도(라이브러리에서는 `face_distance`라는 이름으로 불림)를 비교하여 가장 비슷한 얼굴을 가진 사람의 이름을 적용시킨다.

## 모델 생성 방법

1. facialRecognition 폴더의 dataset에 구별하기 원하는 사람의 폴더(폴더명은 라벨이 된다.)를 만들고 해당 사람의 얼굴 사진을 넣는다. 각 사람마다 폴더를 만들고 사진을 넣어주어야 한다.
2. [train_model.py](./train_model.py)를 실행하여 `encodings.pickle`을 생성한다.

## 얼굴 인식

위의 모델 생성 방법을 통해 모델을 생성했다면 단순하다. [facial_req_custom.py](./facial_req_custom.py)를 실행하면 모델을 생성할 때 데이터로 들어간 사람들의 얼굴이 카메라에 비추면 사각형 박스와 함께 라벨이 보인다.

참고로 `facial_req_custom.py`는 facialRecognition에서 기본적으로 제공하는 `facial_req.py`를 조금 바꾼 파일로, 기본적으로 제공하는 파일의 알고리즘이 아무리봐도 이상해서 직접 바꾸었다.