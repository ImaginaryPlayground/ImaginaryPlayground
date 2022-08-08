# 라즈베리파이 정리

- [경험한 에러를 정리한 페이지](./problems/README.md)
- [초음파센서](./ultraSonic/README.md)

## Raspberry pi 환경설정

1. 고정 IP 설정 방법
그 강의의 강의장은 와이파이를 통해 데이터를 주고 받는 것을 제한해 두었는데 이 때문에 특정한 IP를 사용하지 않으면 SSH나 VNC를 사용하지 못해서 아래의 블로그를 참고하였다.
https://ansan-survivor.tistory.com/44 참고

2. Raspberry pi 환경설정   
https://sergeswin.com/1268/ 참고.. 하긴 했는데 나중에 보니   
<img src="https://user-images.githubusercontent.com/19484971/182140581-762441bb-2ad3-4aa1-a3c8-dd497d1f3107.png"  width="400">   
설치할 OS를 선택하고 언어와 wifi 자동연결 등 다양한 초기설정을 입력할 수 있는 설정 버튼이 있었다..!!   
<img src="https://user-images.githubusercontent.com/19484971/182141611-fc3d5446-8fdd-4dc5-8cc8-332b26f79ffb.png"  width="400">

## GPIO(General Purpose Input/Output)

```
다용도 입출력(general-purpose input/output, GPIO)은 입력이나 출력을 포함한 동작이 런타임 시에 사용자에 의해 제어될 수 있는, 집적 회로나 전기 회로 기판의 디지털 신호 핀이다.

-위키백과-
```

필자는 단순하게 핀과 GPIO에 대해 아래와 같이 알고 있다.

- 라즈베리파이에는 전력이 공급되는 핀(Power), 전력이 나가는 핀(Ground) 등 다양한 핀이 있다.
- 개발자가 입출력에 사용할 수 있는 핀은 GPIO라고 불린다.
  - 입출력 외에도 다양한 역할을 가지는 경우가 있다. 핀 맵의 괄호의 내용을 보면 알 수 있다.
  - 필자의 기억으로는 특별한 역할을 가진 센서의 핀은 라즈베리파이의 적절한 GPIO에 넣어야지만 작동했던 것 같다. (불확실)

![image](https://user-images.githubusercontent.com/19484971/181657619-1490b328-0a19-4bc7-82bc-157616ac25bf.png)

참고

- [라즈베리파이 GPIO 핀 번호](https://fishpoint.tistory.com/6181)

## SSH를 통해 라즈베리파이 파일을 VisualStudio에서 확인하기

그 강의에서 컨설턴트님이 환경설정에 대해 알려준 내용을 정리한 내용

라즈베리파이의 SSH 설정을 켜주세요. (VNC 아니여도 raspi-config 명령어를 통해 설정 가능)  
<img src="https://user-images.githubusercontent.com/19484971/181669292-722f7fc7-ce79-44bc-b296-47a20e180049.png"  width="400">

VS에서 아래의 Extension을 설치합니다.  
<img src="https://user-images.githubusercontent.com/19484971/181669335-ddf66546-fabe-4e3a-8e0b-d3c2cb86cb40.png"  width="400">

Remote Explorer에 들어가서 ‘+’를 누릅니다.  
<img src="https://user-images.githubusercontent.com/19484971/181669353-16db619e-4e85-4b9d-b020-e1dbaf18eded.png"  width="400">

‘ssh 계정명@ip주소 -A’ 를 입력해줍니다.  
<img src="https://user-images.githubusercontent.com/19484971/181669361-ddcbf029-3c01-4085-aef4-fc1153d17ab8.png"  width="600">

기본 구성파일인 가장 위 선택지를 선택  
<img src="https://user-images.githubusercontent.com/19484971/181669369-d2c490fa-e3c5-46c6-8664-9346b6cc701c.png"  width="600">

왼쪽에 ssh가 추가된 것을 확인(안 생기면 조금 기다려보자)  
해당 호스트로 접속하는 창 생성(이미 접속되었다면 아래와 같이 컴퓨터에 체크 표시가 생성된다.)  
<img src="https://user-images.githubusercontent.com/19484971/181669383-2ac8cf69-6254-4b07-841b-89ee4decc47c.png"  width="400">

계정에 대한 암호 입력  
<img src="https://user-images.githubusercontent.com/19484971/181669397-086c78e5-32b6-488a-ae29-ada1b7ec0233.png"  width="400">

explorer에서 아래의 버튼을 클릭하면  
<img src="https://user-images.githubusercontent.com/19484971/181669429-fcf54054-5878-48f9-8ce2-93c5fb7a5acb.png"  width="400">

원격으로 폴더를 확인할 수 있다.  
<img src="https://user-images.githubusercontent.com/19484971/181669462-25086584-a8b4-4271-bb41-a91de47c32db.png"  width="400">

편하게 VS에서 자신의 코드가 에러나는 것을 확인해보자!  
<img src="https://user-images.githubusercontent.com/19484971/181669814-c98b9afa-259e-4bb5-82a2-e0350dfdd552.png"  width="800">

참고

- https://shshsh.tistory.com/163

## get-apt와 apt의 차이

### pip와 apt-get의 차이

## 라즈베리파이 SD카드 이미지 백업

[한 블로그](https://withcoding.com/99)를 보고 진행하였다.

## JS에서 Python 파일 실행하기

프로젝트 중 라즈베리파이 센서의 값을 웹으로 송신해야하는 경우가 생겨 컨선턴트님께 여쭤보았더니 방법이 있으시다고 하셔서 검색해서 아래와 같이 실습을 해보았다.

잘 작동해서 놀랐다..

test.js 파일

```
var spawn = require("child_process").spawn;

// 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
const result = spawn("python", ["./hello.py"]);

// 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
result.stdout.on("data", function (data) {
  console.log("111", data.toString());
});

// 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
result.stderr.on("data", function (data) {
  console.log("222", data.toString());
});
```

hello.py

```
def getValue():
    print ("value")

if __name__ == '__main__':
  a='a'
  a.toInt()
  getValue()
```

결과 (정상 작동시)

```
[Running] node "c:\Users\IM\Desktop\test.js"
111 value


[Done] exited with code=0 in 0.806 seconds
```

결과 (에러 발생시)

```
[Running] node "c:\Users\IM\Desktop\test.js"
222 Traceback (most recent call last):
  File "./hello.py", line 7, in <module>
    a.toInt()
AttributeError: 'str' object has no attribute 'toInt'


[Done] exited with code=0 in 1.013 seconds
```

참고

- [[Node.js] 자바스크립트로 파이썬 연동 실행 방법(함수 매개변수 전달 호출 : child-process)](https://curryyou.tistory.com/225)
- [자바스크립트에서 Python 파일 실행하기](https://doongdoongeee.tistory.com/148)
