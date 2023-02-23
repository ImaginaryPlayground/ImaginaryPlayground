# 🎪 상상놀이터(소아병동 아이들을 위한 IoT 서비스)


</br>

<img src="https://user-images.githubusercontent.com/86208370/221011200-8c427844-fdcc-4aaa-a182-99d1e56e39d6.png" width="880" height="400"/>

![image](https://user-images.githubusercontent.com/86208370/215335715-0c07eada-696f-49dd-a87f-68177e5bd1eb.png)


💡 `어디서도 아이들의 상상력이 멈추지 않도록`✨

상상놀이터는 소아병동 아이들을 위한 교육 및 놀이 통합형 `IoT 웹 서비스`입니다.

병원이라는 제한적인 공간에서 희귀 난치 질병으로 장기 입원하는 환아에게 다양한 경험을 선물해주고 싶어 기획하게 되었습니다. 
또한 힘든 치료와 장기입원으로 인해 또래들보다 신체적 및 정서적 발달이 늦은 아이들에게 놀이를 통해 도움을 주고자 하였습니다. <br>
`Three.js와 다양한 인공지능 기술을 웹 리액트와 결합`하여 환아들이 게임을 즐길 수 있도록 제작하였습니다. <br>
<br>

`아래의 링크를 클릭하면 이동합니다` <br>
💌 [Notion 회고록 및 트러블슈팅](https://quill-peripheral-d93.notion.site/ed5a71762fd1428097710fd05e435e20) - 프로젝트를 진행하며 서비스 관리 및 회고 등 정리하였습니다. <br>
💻 [Web nelify 배포](https://common-test-0808.netlify.app/) - 상상놀이터의 Front-End를 확인할 수 있는 공간입니다. <br>
로컬에서는 빠르게 작동하지만 Blender로 3D 캐릭터를 제작할 때 파일이 무거워  Three.js가 로딩 속도가 다소 느립니다.  <br>
📻 [Youtube](https://www.youtube.com/watch?v=zck0G1kbDmA&t=189s) - SSAFY 공식 유튜브에 업로드된 저의 인터뷰 및 프로젝트 소개 영상입니다. <br>
🎞 [UCC](https://www.youtube.com/watch?v=CdfojzqRaxo&t=29s) - 팀에서 제작한 경북대학교 어린이병원 시연 영상입니다. <br>
🎁 [PPT](https://drive.google.com/drive/folders/1BbnMu3ADYH5gcATDYuoL8bo7R-f7JtOk?usp=sharing) 프로젝트 지역 발표, 삼성전자 임원 발표 PPT(권성호 제작)입니다.


<br>
<br>

## 💁‍♀️ 프로젝트 소개

- **개요**
  - 소아병동 아이들을 위한 교육 및 놀이 통합형 IoT 서비스
  - 실시간 참여할 수 있는 IT 놀이공간

* **주요 기능**

  * 4개의 테마(정글, 우주, 바다, 크리스마스)로 다양한 체험 제공
  * 아이들의 정서적 및 신체적 발달을 위한 간단한 놀이 제공
  * Blender 로 3D 동물 캐릭터 제작 및 Three.js로 실행
  * 회원 담당 환자등록 서비스
  * 회원관리 및 1대1 문의 서비스
  * 빔 프로젝터, 키오스크 등 확장 가능한 IoT & 웹 서비스

* **주요 기술**

  - React (Single Page Application)
  - Raspberry Pi
  - REST API

* **프로젝트 기간**

  - `2022.07.11 ~ 2022.08.19 (7주)`
  - 2022.08.16 : 칠곡 경북대학교 어린이병원에서 소아암 환아 3명에게 [상상놀이터] 시연

* **팀 구성**

  - 총 6인으로 구성
  - BE : 2명
  - FE : 3명
  - IoT : 1명 (FE 멤버 권성호 프로젝트 중순 이후 추가 합류)


</br>

## ✔ 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :black_square_button: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :white_check_mark: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :white_check_mark: IoT | :black_square_button: C# | :black_square_button: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :white_check_mark: ​Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

<br>

## 👨‍👧‍👧 요들(요셉과 아이들)팀 소개 <br>
<br>
🦉 팀장 양요셉

- Back-end
- 서버 API 개발
- DB 관리
- CI/CD 구축

👿 `부팀장 권성호`

- Front-end
- 전반적인 게임 작동방식 구현
- 캐릭터 디자인
- 3D 캐릭터 제작
- 라즈베리파이와 프론트엔드 통신 담당

🦝 **팀원 임영선**

* IoT 담당
* 초음파 센서를 이용한 터치기능 구현
* openCV, face_recognition을 이용한 얼굴인식 기능 구현

💘 **팀원 유지홍**

- Front-end

* 웹 페이지 제작
* 게임 작동방식 구현
* 라즈베리파이와 프론트엔드 통신 담당

**🐨 팀원 김성령**

* Back-end
* 서버 API 개발
* DB 관리
* CI/CD 구축

🎄 **팀원 박소정**

* Front-end
* 전반적인 게임 작동방식 구현
* 테마맵 디자인
* css 스타일링

</br>



</br>

## 🎁 서비스 화면
💻 [Web 배포](https://common-test-0808.netlify.app/) - 상상놀이터의 Front-End를 확인할 수 있는 공간입니다. <br>
로컬에서는 빠르게 작동하지만 Blender로 3D 캐릭터를 제작할 때 파일이 무거워  Three.js가 로딩 속도가 다소 느립니다. (nelify 배포) <br> 
💌 [Notion 회고록 및 트러블슈팅](https://quill-peripheral-d93.notion.site/ed5a71762fd1428097710fd05e435e20) - 프로젝트를 진행하며 서비스 관리 및 회고 등 정리하였습니다. 
```
대상 고객: (병원에 장기 입원하는 희귀질병) 소아병동의 4~7세 아이들
목적: 능동적인 게임 참여를 통한 환아들의 사회성, 신체, 인지 발달
시연 장소 : 경북대학교 어린이병원
맵 : 각기 다른 기술(음성인식, 얼굴인식, 터치, 동작인식) 을 적용한 4가지 테마 (우주, 크리스마스, 정글, 바다)
```
### 1. **`상상놀이터 메인 테마맵`** <br>
<img src="https://user-images.githubusercontent.com/86208370/215336829-5d18c876-e5cc-436f-a92f-a9a56268773b.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220974903-34601481-211d-45e7-aa45-227bc3093227.png" width="800" height="400"/>



</br>

### 2. **게임 테마 - 정글 `<우가우가숲>` : 음성인식** <br>
```
게임 목적 : 병원의 특성상 동물원에 가기 어려운 환경이므로 3D 동물들과 교감하고 희망적 메시지(퇴원) 전달 
react-speech-kit을 활용하여 음성을 인식하는 기술을 통해 아이들의 음성을 판별할 수 있습니다.
환아들이 정글의 동물 이름을 말하면서 게임이 진행됩니다.
동물 친구들과 만나 인사하고 동물 친구들이 희망의 메시지를 외치는 시간입니다. 
음성인식 정답 : [원숭이] -> [화이팅] -> [사자] -> [할수있다] -> [늑대] -> [건강하자] -> [코끼리] -> [약속한다]
```
<img src="https://user-images.githubusercontent.com/86208370/215336728-be0eac38-09f8-445a-bd32-38b95032c94d.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220940588-bd3b1b78-f6d6-49d4-a817-c3c1165f061f.gif" width="800" height="400" />

</br>

### 3. **게임 테마 - 우주 `<갤럭시월드>`** : 터치인식 <br>
```
게임 목적 : 게이미케이션(교육+게임)으로 태양계 행성 및 분리수거 교육 학습
`아두이노(IOT)`에서 처리하는 터치 좌표(x, y)를 `리액트(프론트)`로 전달하기 위해서는 웹 소켓 통신을 이용하여야 했습니다. 
그러나 `아두이노(IOT)` - `리액트(프론트)` 간의 직접 통신은 할 수 없었고 
통신을 위해선 중간 다리 역할을 하는 `노드 서버(백)`를 거쳐야 했습니다.

(정리하면 `리액트(프론트)` - `노드 서버(백)`- `아두이노(IOT)` 간의 3자 통신)

따라서 터치할 경우 해당 x, y 좌표를 `아두이노(IOT)` - `노드 서버(백)` 간의 소켓 통신으로 넘긴 후 
그 노드 서버로 넘어온 값을 다시 `리액트(프론트)`- `노드 서버(백)`간의 소켓 통신을 통해 
`리액트(프론트)`로 넘겨주어 터치 좌표 통신이 가능했습니다.
```
<img src="https://user-images.githubusercontent.com/86208370/215336754-7e028bed-bdf6-4239-9acc-a25e0de087c8.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220970233-6a2512dc-a030-4f32-ad6e-74987622dfd1.gif" width="800" height="400"/>


</br>

### 4. **게임 테마 - 바다 `<언더더씨>`** : 터치인식과 동작인식 <br>
```
게임 목적 : 아이들이 움직이고 스트레칭을 진행하면서 활동 장려 및 신체발달
(아두이노에서 리액트로) 소켓 통신으로 넘어온 `터치 좌표(x,y)`를 어떻게 해당 터치 영역에 있는 div 태그들에 적용해 
`클릭 이벤트`까지 발생시킬 것인가에 대한 문제가 계속 존재하였습니다.

생각해 낸 해결책은 터치가 필요한 영역(div 태그)들에 touch_div라는 클래스 이름을 동일하게 다 적용하는 것이었습니다.

그 후 리액트의 useEffect 기능을 이용해서 맵이 오픈되자마자 해당 클래스가 적용된 div(혹은 이미지) 들의
`(왼쪽 상단 기준: x좌표, y좌표), 넓이, 높이`를 반환하는 함수를 이용하여 터치 영역을 미리 계산해 놓는 것이었습니다.

소켓 통신을 통해서 터치를 하게 될 경우 계속해서 아두이노에서 전달받은 `터치 x, y 좌표`가 `
미리 계산된 터치 영역`내에 존재한다면 해당 영역 내부의 div태그를 클릭이 되게 처리하였습니다.
```
<img src="https://user-images.githubusercontent.com/86208370/215336762-95c81621-8034-4072-b004-e5efde22e23e.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220980412-f2b1f7d6-1f28-45ef-81b0-e66dbd4b308d.jpg" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220965607-d4b26d33-a022-4bb2-b050-e18b92978fc4.gif" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220967831-473fd12b-fdf6-46fa-b949-efc8a8beb2df.gif" width="800" height="400"/>



<br>

### 5. **이벤트 테마 - 크리스마스 `<눈 내리는 마을>`** : 얼굴인식 <br>
```
환아들이 병원에서 크리스마스를 접하기 어려워 준비한 이벤트 맵입니다.
아이들의 얼굴을 미리 Opan AI로 학습시키고 아이들이 카메라 앞에 다가갔을 때 
카메라가 얼굴을 인식한 뒤 부모님이 보내주신 편지가 리렌더 되는 기능을 추가하였습니다.
```
<img src="https://user-images.githubusercontent.com/86208370/215336774-38c4b230-b375-4caf-af0b-3aa88020bf15.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220974243-486416be-6460-4f68-8a84-19649118d9f9.gif" width="800" height="400"/>


</br>

### 6. **웹 페이지 - `<관리자 페이지>`** <br>
```
병원에서 환아들을 관리할 수 있는 관리자 페이지입니다.
1. 이메일 인증과 재직증명서 검증을 통한 회원가입
2. 어드민 계정이 회원가입 승인을 한 후에 로그인을 가능하게 하여 병원 별 환자 데이터 접근 보안성 강화
3. 로그인 시 token 발급
4. 각 병원 담당자는 병원 내 아이들의 정보를 검색/등록/수정/삭제 가능
5. 라즈베리파이가 웹사이트에 등록된 아이들의 사진을 불러와 얼굴인식 학습
6. 문의 게시판 기능
```
<img src="https://user-images.githubusercontent.com/86208370/215336777-c2b78212-0884-4212-b831-e9088b222bb3.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/220978407-38287939-0af2-4445-96fc-69b1728e386f.png" width="800" height="400"/>




</br>

### 🛠 기술 환경

```
🦁 프론트엔드
- React
- Three.JS(3D 웹 동물 캐릭터실행)
- Blender(3D 캐릭터 구현) 
- Axios (API 통신 라이브러리)
- Mui(리액트 CSS 라이브러리)
- Javascript, HTML5, CSS3
- Redux(리액트 상태관리 라이브러리) 

백엔드: Spring Security를 활용한 OAuth2.0과 JWT를 활용한 인증 방식 Naver Clova/Google Speech를 활용한 음성인식 기능 탑재 MariaDB

IoT: 라즈베리파이(Raspberry Pi 4 Model B Rev 1.2) Python(3.7.3) face_recognition(1.3.0)

기획: JIRA, Notion, Mattermost (팀 협업, 프로젝트 관리) GitLab(버전관리) Figma(디자인 협업) ERD cloud(DB 모델링) Coggle(마인드맵)
```

</br>

​             

### 📒 기술 스택

​               

### Front

<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"><img alt="MUI" src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"><img  alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">


</br>

​             

### Back

</br>

#### - Server

<img src="https://img.shields.io/badge/JAVA 11-007396?style=for-the-badge&logo=java&logoColor=white"><img src="https://img.shields.io/badge/Spring Boot 2.7.1-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"><img alt="AWS" src="https://img.shields.io/badge/Spring Security 5.7.2-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"><img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white">

</br>

#### - DB

<img alt="MariaDB" src="https://img.shields.io/badge/MariaDB 10.6.8-003545?style=for-the-badge&logo=MariaDB&logoColor=white"><img alt="MyBatis" src="https://img.shields.io/badge/MyBatis-000000?style=for-the-badge&logo=MyBatis&logoColor=white">

</br>

#### - Distribution

<img alt="AWS" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"><img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-f7f7f7?style=for-the-badge&logo=Amazon AWS&logoColor=f89400"><img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">

</br>

​                 

### IoT

</br>

#### - language

<img alt="AWS" src="https://img.shields.io/badge/Raspberry Pi-2496ED?style=for-the-badge&logo=Raspberry Pi&logoColor=white"><img alt="Python" src="https://img.shields.io/badge/Debian version 10 (buster)-A81D33?style=for-the-badge&logo=Python&logoColor=white"><img alt="Debian" src="https://img.shields.io/badge/Python 3.7.3/3.8.12-3776AB?style=for-the-badge&logo=Debian&logoColor=white">

</br>

#### - equipment

* HC-SR04(초음파 센서), SIG H703(웹캠)

</br>

#### - library

<img alt="face recog" src="https://img.shields.io/badge/Face Recognition v 1.2.2-ffffff?style=for-the-badge&logoColor=white"><img alt="delib" src="https://img.shields.io/badge/dlib(19.24.99)-ffffff?style=for-the-badge&logoColor=white"><img alt="opencv" src="https://img.shields.io/badge/openCV(4.5.1)-ffffff?style=for-the-badge&logoColor=white"><img alt="Google Assistant SDK" src="https://img.shields.io/badge/Google Assistant SDK-ffffff?style=for-the-badge&&logo=Google&logoColor=black">

</br>

</br>

## 🕋 프로젝트 구성도

<img src="https://user-images.githubusercontent.com/86208370/215346646-82b559e9-14f1-4fd6-8fd5-929ebc1572b5.png" width="800" height="400"/>
<img src="https://user-images.githubusercontent.com/86208370/221005781-0be27cca-6184-4b71-9678-d6a7518ae3fb.png" width="800" height="600"/>

```
아두이노 WIFI 모듈이 4개와 라즈베리파이가 사용되기 때문에 효율적인 데이터 전달을 위해 Client와 Server 설계가 매우 중요했습니다. 
초음파센서와 연결된 아두이노 WIFI 모듈을 Client로, React(웹 프론트)의 Node 서버와 Socket.IO로 통신하였습니다. 
그리고 직렬화로 아두이노 알고리즘(모니터 화면 비율로 전환 및 데이터 필터링)을 거친 데이터 값들을 보냈습니다. 
동작 인식과 얼굴 인식은 카메라가 필요하므로, 라즈베리파이에 연결하여 Client와 Server 구조를 설계하였습니다. 
```



</br>

## 🥇 수상 이력

<img src="https://user-images.githubusercontent.com/86208370/215349293-5d1d1e38-c071-4a12-b0e8-291cd11b047d.png" width="800" height="400"/>



## 🎪 기능 상세

</br>

### - 서비스 설명 / 주요기능

1. 소아병동 아이들이 실시간 참여할 수 있는 IOT 놀이공간
2. 약 6개의 테마, 각 맵마다 다른 게임으로
아이들에게 다양한 체험 제공
3. `동작 인식 기능` : 원숭이 캐릭터 '우끼'의 동작을 따라함으로서 환아의 가벼운 스트레칭 
4. `음성 인식 기능` : 동물 캐릭터의 울음소리를 맞추면 동물들이 희망의 메시지로 아이들을 응원(코리끼, 늑대, 사자, 원숭이)
5. `얼굴 인식 기능` : 사전에 아이의 사진을 학습한 AI가 (카메라를 통해) 환아들의 얼굴을 인식하여 편지가 열림 
6. `터치 인식 기능` : '상어를 혼내줘' 와 '우주의 쓰레기 분리수거' 게임에서 활용. 초음파 센서 값을 아두이노를 통해 웹 리액트로 전달해서 스크린에서 터치 기능이 가능 
7. 빔 프로젝터, 키오스크 또는 태블릿 등 확장성이 용이한 웹 서비스로 접근성 증대

</br>

### - 서비스의 특징 / 독창성

1. 개인 또는 다수가 동시에 플레이 가능
2. `4종류의 다양한 테마 맵`를 구성하여 아이들이 다양한 환경에서 게임 플레이 가능
3. 병원과 연계하여 아이들의 심리 상태 파악에 활용
4. 단순한 유희성 게임이 아닌 놀이와 교육을 통합한 게임으로 아이들의 사회성, 신체, 인지 발달에 기여
5. 프로젝트 빔을 사용하여 화면을 보여주고 초음파 센서를 활용하여 터치패널이 없는 화면에서도 터치가 가능하도록 구현
6. 회원가입 시에 등록한 아이 얼굴 사진을 토대로 얼굴인식을 한 후 사용자와 상호작용
7. 모든 과정은 자동으로 진행되지만 사용자가 수동으로도 조작할 수 있는 시스템
8. 블렌더로 3D 동물 캐릭터를 제작하고 Three.js로 생동감 증대
9. 웹서비스 기반의 확장 가능한 서비스, Oauth2와 JWT를 활용한 보안 및 접근성 증대
10. 관리자 서버를 구축하여 병원에서 환아들 관리 용이


<br>

## 🗂 디렉토리 구조
```
java
└── com.yodel.imaginaryPlayground
    └── config
    │    ├── SecurityConfing
    │   ├── SwaggerConfig
    │    └── WebConfig
    └── controller
    │    ├── AdminController
    │   ├── AnswerController
    │    ├── BabyController
    │    ├── ClovaFaceController
    │    ├── ClovaSpeechController
    │    ├── HospitalController
    │    ├── QuestionController
    │    ├── TestController
    │    ├── UserCareController
    │    └── UserController
    └── mapper
    │    ├── AdminMapper
    │    ├── AnswerMapper
    │    ├── HospitalMapper
    │    ├── QuestionMapper
    │    ├── UserCareMapper
    │    └── UserMapper
    ├── model
    │    ├── dto
    │   │   ├── AnswerDto
    │   │    ├── BabyDto
    │   │    ├── ConsultDto
    │   │    ├── HospitalDto
    │   │    ├── PageDto
    │   │    ├── QuestionDto
    │   │    ├── Role
    │   │    └── UserDto
    │    ├── jwt
    │   │    ├── JwtAuthenticationFilter
    │   │    └── JwtTokenService
    │    ├── oauth
    │   │    ├── OAuth2SuccessHandler
    │   │    └── OAuthAttributes
    │    └── vo
    │   │    ├── BabyVO
    │   │    ├── EmailCodeVO
    │   │    ├── IdVO
    │   │    └── PasswordVO
    ├── Service
    │   ├── jwt
    │   │    └── CustomUserDetailService
    │   ├── oauth
    │   │    └── CustomOAuth2UserService
    │   ├── oauth
    │   ├── AdminService
    │   ├── AdminServiceImpl
    │   ├── AnswerService
    │   ├── AnswerServiceImpl
    │   ├── EmailService
    │   ├── EmailServiceImpl
    │   ├── HospitalService
    │   ├── HospitalServiceImpl
    │   ├── QuestionService
    │   ├── QuestionServiceImpl
    │   ├── UserCareService
    │   ├── UserCareServiceImpl
    │   ├── UserService
    │   └── UserServiceImpl
    └── ImagnaryPlaygroundApplication
resources
└── mappers
        ├── admin.xml
        ├── answer.xml
        └── hospital.xml
         ├── question.xml
        ├── user.xml
        └── usercare.xml
├── application-oauth.properties
├── application-prod.properties
└── application.properties
```
