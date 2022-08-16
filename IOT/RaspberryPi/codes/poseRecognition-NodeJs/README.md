# 설명

Teachable Machine을 활용한 Pose Recognition 통신 테스트 파일들

라즈베리파이에 Node.js와 Npm 설치 후 socket.io를 설치하고 진행하였다.

설치는 node.js의 경우 [공식 홈페이지](https://nodejs.org/en/)와 [한 블로그](https://it-jm.tistory.com/19)를 참고하였고 [socket.io는 공식홈페이지](https://socket.io/docs/v4/server-installation/)를 참고하였다.

터미널에서 해당 파일로 이동한 후 `node index.js` 를 명령하면 node서버가 켜진다, 그 상태로 브라우저에서 `http://localhost:3001/` 를 입력하면 웹캠을 통해 자세인식할 수 있는 화면(`tm.html`)을 브라우저에서 볼 수 있다. 하지만 바로 카메라의 이미지가 보이지는 않고 `controll.html`에서 버튼을 눌러 카메라를 업데이트 시켜주어야 볼 수 있다.

카메라를 켜주기 위해 `http://localhost:3001/controll` 을 입력하면 `http://localhost:3001/`의 카메라를 키고 끌 수 있는 간단한 버튼과 송신받은 이미지를 확인할 수 있는 canvas 가 있는 간단한 화면(`controll.html`)을 볼 수 있다.

`poseOn`과 `poseOff`를 하여 카메라 자세인식을 끄고 키면서 통신 테스트를 진행하였다.

<img src="https://user-images.githubusercontent.com/19484971/184528852-cb71503a-8cce-4ae1-a89a-9ce8255f82b5.png" width=300>

사진에서는 포트가 3003이지만 파일에서 사용된 포트는 3001이 맞다. 또한 아직 이미지 전송하는 코드가 진행되지 않아 controll.html 화면에서 이미지가 뜨지 않는다.