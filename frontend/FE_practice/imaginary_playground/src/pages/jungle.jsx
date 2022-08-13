import { useEffect, useRef, useState } from "react";
import ".././css/jungle.css";
import HideMonkey from "../components/jungle/HideMonkey";
//음성인식 라이브러리
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";
import Monkey from "../components/jungle/Monkey";
import HideLion from "../components/jungle/HideLion";
import Sample4 from "../components/jungle/Sample4";
import HideElephant from "../components/jungle/HideElephant";

import ToriMain from "../components/jungle/ToriMain";
import Lion from "../components/jungle/Lion";
import Wolf from "../components/jungle/Wolf";
import Elephant from "../components/jungle/Elephant";
import JungleBackground from "../components/jungle/JungleBackground";
const Jungle = () => {
  //음성인식 시작하는 state
  const [nowSpeechStart, setNowSpeechStart] = useState(false);
  //원숭이 소리 state
  const [playMonkySound, setplayMonkySound] = useState(false);
  //메인 원숭이 음성 state
  const [isMonkyMain, setIsMonkyMain] = useState(false);

  //사자 소리 state
  const [playLionSound, setplayLionSound] = useState(false);
  //메인 사자 음성 state
  const [isLionMain, setIsLionMain] = useState(false);

  //늑대 소리 state
  const [playWolfSound, setplayWolfSound] = useState(false);
  //메인 늑대 음성 state
  const [isWolfMain, setIsWolfMain] = useState(false);

  //코끼리 소리 state
  const [playElephantSound, setPlayElephantSound] = useState(false);
  //메인 코끼리 음성 state
  const [isElephantMain, setIsElephantMain] = useState(false);

  const [end_1, setEnd_1] = useState(false);
  const [end_2, setEnd_2] = useState(false);

  //동물들이 숨어있다는 텍스트를 보여주는 state
  const [isHideAnimalText, setIsHideAnimalText] = useState(true);
  //남은 동물의 수
  const [restAnimal, setRestAnimal] = useState(4);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const goForse = useRef(false);
  const navigate = useNavigate();
  //초기 로딩시 음성 시작
  useEffect(() => {
    setTimeout(() => {
      findTextAudio.play();
    }, 2000);

    return () => {
      //모든 음성 종료
      Howler.stop();

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      const canvases = document.getElementsByTagName("canvas");

      // for (let index = 0; index < canvases.length; index++) {
      //   canvases[index].remove();
      // }
    };
  }, []);

  //음성 인식
  useEffect(() => {
    //원숭이 인식
    if (
      (playMonkySound && transcript.includes("원숭")) ||
      (playMonkySound && goForse.current)
    ) {
      //강제 진행 off
      goForse.current = false;
      //몽키 사운드 그만틀기
      setplayMonkySound(false);
      //말하기 끄기
      setNowSpeechStart(false);

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();

      //전체 음악 종료
      Howler.stop();

      //숨어있는 몽키 지우기
      const whale = document.getElementById("whale_0");
      whale?.remove();
      //다음 메인 몽키 진행
      //메인 원숭이 음성 스타트
      setIsMonkyMain(true);

      setTimeout(() => {
        mainMonkyAudio.play();
      }, 1000);
      setTimeout(() => {
        console.log("지금 부터 음성인식 시작");
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 12500);
    }
    //화이팅 외치기
    if (
      (isMonkyMain &&
        (transcript.includes("화이") || transcript.includes("파이"))) ||
      (isMonkyMain && goForse.current)
    ) {
      //메인 멍키 꺼주고
      setIsMonkyMain(false);
      //강제 진행 off
      goForse.current = false;
      //말하기 끄기
      setNowSpeechStart(false);

      //남은 동물 3명으로 초기화
      setRestAnimal(3);
      //동물 찾으라는 텍스트 띄우기
      setIsHideAnimalText(true);
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      //메인 멍키 없애준다.
      const monkyMain = document.getElementById("monky_main");
      monkyMain?.remove();

      setTimeout(() => {
        restThreeAudio.play();
      }, 1000);
    }

    //사자 소리 맞추기
    if (
      (playLionSound && transcript.includes("사자")) ||
      (playLionSound && transcript.includes("하자")) ||
      (playLionSound && goForse.current)
    ) {
      //강제 진행 off
      goForse.current = false;
      //라이언 사운드 그만틀기
      setplayLionSound(false);
      //말하기 끄기
      setNowSpeechStart(false);

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();

      //전체 음악 종료
      Howler.stop();

      //숨어있는 사자 지우기
      const lion = document.getElementById("lion_0");
      lion?.remove();
      //다음 메인 몽키 진행
      //메인 사자 음성 스타트
      setIsLionMain(true);

      setTimeout(() => {
        //사자 음성 진행
        mainLionAudio.play();
      }, 1000);
      setTimeout(() => {
        console.log("지금 부터 사자 음성인식 시작");
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 17500);
    }

    //할수있다 외치기
    if (
      (isLionMain && transcript.includes("할 수 있")) ||
      (isLionMain && transcript.includes("있다")) ||
      (isLionMain && goForse.current)
    ) {
      //메인 사자 꺼주고
      setIsLionMain(false);
      //강제 진행 off
      goForse.current = false;
      //말하기 끄기
      setNowSpeechStart(false);

      //남은 동물 2명으로 초기화
      setRestAnimal(2);
      //동물 찾으라는 텍스트 띄우기
      setIsHideAnimalText(true);
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      //메인 사자 없애준다.
      const monkyMain = document.getElementById("lion_main");
      monkyMain?.remove();

      setTimeout(() => {
        restTwoAudio.play();
      }, 1000);
    }

    //늑대 소리 맞추기
    if (
      (playWolfSound && transcript.includes("늑대")) ||
      (playWolfSound && goForse.current)
    ) {
      //강제 진행 off
      goForse.current = false;
      //라이언 사운드 그만틀기
      setplayWolfSound(false);
      //말하기 끄기
      setNowSpeechStart(false);

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();

      //전체 음악 종료
      Howler.stop();

      //숨어있는 늑대 지우기
      const wolf = document.getElementById("wolf_0");
      wolf?.remove();

      //메인 늑대 텍스트 띄우기
      setIsWolfMain(true);

      setTimeout(() => {
        //메인 늑대 음성 진행
        mainWolfAudio.play();
      }, 1000);
      setTimeout(() => {
        console.log("지금 부터 늑대 음성인식 시작");
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 21000);
    }

    //건강하자 외치기
    if (
      (isWolfMain &&
        (transcript.includes("건강") || transcript.includes("하자"))) ||
      (isWolfMain && goForse.current)
    ) {
      //메인 늑대 꺼주고
      setIsWolfMain(false);
      //강제 진행 off
      goForse.current = false;
      //말하기 끄기
      setNowSpeechStart(false);

      //남은 동물 1명으로 초기화
      setRestAnimal(1);
      //동물 찾으라는 텍스트 띄우기
      setIsHideAnimalText(true);
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      //메인 늑대 없애준다.
      const wolfMain = document.getElementById("wolf_main");
      wolfMain?.remove();

      setTimeout(() => {
        //1명 남은 음성 말하기
        restOneAudio.play();
      }, 1000);
    }

    //코끼리 소리 맞추기
    if (
      (playElephantSound && transcript.includes("코끼")) ||
      (playElephantSound && transcript.includes("토끼")) ||
      (playElephantSound && goForse.current)
    ) {
      //강제 진행 off
      goForse.current = false;
      //코끼리 사운드 그만틀기
      setPlayElephantSound(false);
      //말하기 끄기
      setNowSpeechStart(false);

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();

      //전체 음악 종료
      Howler.stop();

      //숨어있는 코끼리 지우기
      const elephant = document.getElementById("elephant_0");
      elephant?.remove();

      //메인 코끼리 텍스트 띄우기
      setIsElephantMain(true);

      setTimeout(() => {
        //메인 코끼리 음성 진행
        mainElephantSound.play();
      }, 1000);
      setTimeout(() => {
        console.log("지금 부터 코끼리 음성인식 시작");
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 29000);
    }

    //약속한다 외치기
    if (
      (isElephantMain && transcript.includes("약속")) ||
      (isElephantMain && goForse.current)
    ) {
      //메인 코끼리 꺼주고
      setIsElephantMain(false);
      //강제 진행 off
      goForse.current = false;
      //말하기 끄기
      setNowSpeechStart(false);

      //남은 동물 0명으로 초기화
      setRestAnimal(0);

      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      //메인 코끼리 없애준다.
      const elephantMain = document.getElementById("elephant_main");
      elephantMain?.remove();

      setTimeout(() => {
        //마무리 멘트 말하기
        endAudio.play();
        setEnd_1(true);
      }, 1000);

      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 29500);

      setTimeout(() => {
        setEnd_1(false);
        setEnd_2(true);
      }, 13500);
    }

    //마지막 출발 멘트 외치기
    if (end_2 && transcript.includes("출발")) {
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      const toriMain = document.getElementById("main_tori");
      const end_2 = document.getElementById("end_2");
      end_2.style.display = "none";
      toriMain.setAttribute("class", "disappear");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }

    return () => {};
  }, [transcript]);

  //동물 찾으라는 음성
  const findTextAudio = new Howl({
    src: ["/assets/audio/jungle/동물들을찾아줘.wav"],

    onend: () => {
      //원숭이사운드 시작
      setplayMonkySound(true);
      //말하기 시작
      setNowSpeechStart(true);
      monkySound.play("key1");

      setIsHideAnimalText(false);
      setTimeout(() => {
        monkySound.stop();
      }, 10000);

      SpeechRecognition.startListening({ continuous: true, language: "ko" });
    },
  });

  //원숭이 소리
  const monkySound = new Howl({
    src: ["/assets/audio/jungle/원숭이소리.m4a"],
    sprite: {
      key1: [0, 10000, true],
    },
    onend: () => {},
  });

  //메인 원숭이 음성
  const mainMonkyAudio = new Howl({
    src: ["/assets/audio/jungle/메인원숭이음성.wav"],
    onend: () => {
      goForse.current = false;
    },
  });

  //남은 동물 3명 음성
  const restThreeAudio = new Howl({
    src: ["/assets/audio/jungle/남은 동물 3명 음성.wav"],
    onend: () => {
      nextLionFind.play();
    },
  });

  //사자 울음 소리
  const lionSound = new Howl({
    src: ["/assets/audio/jungle/사자_울음소리.m4a"],
    sprite: {
      key1: [0, 10000, true],
    },
    onend: () => {
      setTimeout(() => {
        lionSound.stop();
      }, 20000);
    },
  });

  //메인 사자 음성
  const mainLionAudio = new Howl({
    src: ["/assets/audio/jungle/메인사자음성.wav"],
    onend: () => {
      goForse.current = false;
    },
  });

  //다음 사자 동물소리 멘트
  const nextLionFind = new Howl({
    src: ["/assets/audio/jungle/다음 동물소리 들려주는 멘트.wav"],
    onend: () => {
      //끝난 후 음성인식 시작
      SpeechRecognition.startListening({ continuous: true, language: "ko" });
      setNowSpeechStart(true);
      setIsHideAnimalText(false);

      lionSound.play("key1");
      setplayLionSound(true);
    },
  });

  //남은 동물 2명 음성
  const restTwoAudio = new Howl({
    src: ["/assets/audio/jungle/남은 동물 2명 음성.wav"],
    onend: () => {
      nextWolfFind.play();
    },
  });

  //다음 늑대 동물소리 멘트
  const nextWolfFind = new Howl({
    src: ["/assets/audio/jungle/다음 동물소리 들려주는 멘트.wav"],
    onend: () => {
      //끝난 후 음성인식 시작
      SpeechRecognition.startListening({ continuous: true, language: "ko" });
      setNowSpeechStart(true);
      setIsHideAnimalText(false);

      wolfSound.play("key1");
      setplayWolfSound(true);
    },
  });

  //늑대 울음 소리
  const wolfSound = new Howl({
    src: ["/assets/audio/jungle/늑대 울음소리.m4a"],
    sprite: {
      key1: [0, 10000, true],
    },
    onend: () => {
      setTimeout(() => {
        wolfSound.stop();
      }, 20000);
    },
  });

  //메인 사자 음성
  const mainWolfAudio = new Howl({
    src: ["/assets/audio/jungle/메인늑대음성.mp3"],
    onend: () => {
      goForse.current = false;
    },
  });

  //남은 동물 1명 음성
  const restOneAudio = new Howl({
    src: ["/assets/audio/jungle/남은 동물 1명 음성.wav"],
    onend: () => {
      nextElephantFind.play();
    },
  });

  //다음 코끼리 동물소리 멘트
  const nextElephantFind = new Howl({
    src: ["/assets/audio/jungle/다음 동물소리 들려주는 멘트.wav"],
    onend: () => {
      //끝난 후 음성인식 시작
      SpeechRecognition.startListening({ continuous: true, language: "ko" });
      setNowSpeechStart(true);
      setIsHideAnimalText(false);

      elephantSound.play("key1");
      setPlayElephantSound(true);
    },
  });

  //코끼리 울음 소리
  const elephantSound = new Howl({
    src: ["/assets/audio/jungle/코끼리 울음소리.m4a"],
    sprite: {
      key1: [0, 10000, true],
    },
    onend: () => {
      setTimeout(() => {
        elephantSound.stop();
      }, 20000);
    },
  });

  //메인 코끼리 음성
  const mainElephantSound = new Howl({
    src: ["/assets/audio/jungle/메인코끼리음성.mp3"],
    onend: () => {
      goForse.current = false;
    },
  });

  //마무리 멘트
  const endAudio = new Howl({
    src: ["/assets/audio/jungle/마무리멘트.wav"],
    onend: () => {
      goForse.current = false;
    },
  });

  return (
    <div className="jungle" id="jungle_box">
      <div className="hide_monky_box">
        {/* 동물 찾으라는 텍스트 */}
        {isHideAnimalText && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                <span style={{ color: "brown" }}>동물</span>들이 여기저기
                숨어있어!!{" "}
              </div>
              <div style={{ marginTop: "30px" }}>
                어서 <span style={{ color: "brown" }}>동물</span>들을 찾아줘!{" "}
              </div>
              <div style={{ marginTop: "30px" }}>
                현재 숨어있는 <span style={{ color: "brown" }}>동물</span>은{" "}
                <span style={{ fontSize: "60px" }}>
                  총{" "}
                  <span
                    style={{
                      fontSize: "60px",
                      color: "blue",
                    }}
                  >
                    {restAnimal}마리
                  </span>
                  야!
                </span>{" "}
              </div>
            </div>
          </div>
        )}
        {/* 동물 울음소리 재생 텍스트 */}
        {(playMonkySound ||
          playLionSound ||
          playWolfSound ||
          playElephantSound) && (
          <div className="text_location ">
            <div className="text_box">
              <div style={{ fontSize: "60px", marginTop: "10px" }}>
                어떤 <span style={{ color: "brown" }}>동물</span>인지 맞춰봐!
              </div>
              <div style={{ fontSize: "60px", marginTop: "10px" }}>
                소리가 나오고 있어!
              </div>
            </div>
            {/* 음성인식 시작 텍스트 */}
            {nowSpeechStart && (
              <div
                style={{ fontSize: "60px", marginTop: "80px" }}
                className="speech "
              >
                지금 말하세요!
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/assets/icon_folder/free-icon-recorder-microphone.png"
                    alt=""
                    width={"60px"}
                  />
                </div>
              </div>
            )}
          </div> 
        )}
        {/* 메인원숭이 텍스트 */}
        {isMonkyMain && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                나는 <span style={{ color: "saddlebrown" }}>원숭이</span>야
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                만나서 반가워!
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                <span style={{ color: "midnightblue" }}>"화이팅"</span> 이라고
                외쳐줘!!!
              </div>
            </div>
          </div>
        )}
        {/* 메인사자 텍스트 */}
        {isLionMain && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                나는 정글왕<span style={{ color: "saddlebrown" }}>사자</span>야
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                운동을 정말로 좋아하지! 나와 같이 운동하자!
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                <span style={{ color: "midnightblue" }}>"할수 있다"</span> 라고
                외쳐줘!!!
              </div>
            </div>
          </div>
        )}
        {/* 메인 늑대 텍스트 */}
        {isWolfMain && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                나는 정글의 외로운
                <span style={{ color: "saddlebrown" }}> 늑대</span>야
              </div>
              <div style={{ fontSize: "55px", marginTop: "20px" }}>
                나는 친구가 없어. 하지만 너가 내 친구가 되어줄 수 있어!
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                <span style={{ color: "midnightblue" }}>"건강 하자"</span> 라고
                외쳐줘!!!
              </div>
            </div>
          </div>
        )}

        {/* 메인 코끼리 텍스트 */}
        {isElephantMain && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                나는 정글의 수호신{" "}
                <span style={{ color: "saddlebrown" }}>코끼리</span>야
              </div>
              <div style={{ fontSize: "50px", marginTop: "20px" }}>
                나와 내친구들과 정글에서 놀지 않을래? 꼭 온다고 약속해줘!!
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                <span style={{ color: "midnightblue" }}>"약속 해"</span> 라고
                외쳐줘!!!
              </div>
            </div>
          </div>
        )}

        {/* 마무리 텍스트1 */}
        {end_1 && (
          <div className="text_location appear_text">
            <div className="text_box">
              <div>
                덕분에 모든 숨어있는 정글{" "}
                <span style={{ color: "saddlebrown" }}>동물</span>들을 찾을 수
                있었어!
              </div>
              <div style={{ fontSize: "55px", marginTop: "20px" }}>
                <span style={{ color: "saddlebrown" }}>동물</span> 친구들은
                나중에 너가 밝은 얼굴로 놀러 오기만을 기다리고 있을 꺼야!
              </div>
            </div>
          </div>
        )}

        {/* 마무리 텍스트 2 */}
        {end_2 && (
          <div className="text_location" id="end_2">
            <div className="text_box">
              <div>
                언젠가 <span style={{ color: "brown" }}>"우리"</span> 함께 같이
                놀러가자! <span style={{ color: "midnightblue" }}>그날</span>{" "}
                만을 기다리고 있을 께!
              </div>
              <div style={{ fontSize: "55px", marginTop: "20px" }}>
                자, 이제 정글에서{" "}
                <span style={{ color: "deeppink" }}>할 일</span>은 끝이 났어!
                다른 <span style={{ color: "coral" }}>여행</span>을 하러 가자!
              </div>
              <div style={{ fontSize: "60px", marginTop: "20px" }}>
                <span style={{ color: "midnightblue" }}>"출발"</span> 이라고
                외쳐줘!!!
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 숨겨진 원숭이 로딩 */}
      <div>
        <HideMonkey id={`whale_0`} />
      </div>
      {/* 숨겨진 사자 로딩 */}
      <div>
        <HideLion id={`lion_0`} />
      </div>
      {/* 숨겨진 늑대 로딩 */}
      {/* <div>
        <Sample4 id={`wolf_0`} />
      </div> */}

      {/* 숨겨진 코끼리 로딩 */}
      <div>
        <HideElephant id={`elephant_0`} />
      </div>

      {/* 메인원숭이 출현 */}
      {isMonkyMain && (
        <div>
          <Monkey id={`monky_main`} />
        </div>
      )}

      {/* 메인사자 출현 */}
      {isLionMain && (
        <div>
          <Lion id={`lion_main`} />
        </div>
      )}

      {/* 메인늑대 출현 */}
      {isWolfMain && (
        <div>
          <Wolf id={`wolf_main`} />
        </div>
      )}

      {/* 메인코끼리 출현 */}
      {isElephantMain && (
        <div>
          <Elephant id={`elephant_main`} />
        </div>
      )}

      {/* 메인토리 출현 */}
      {(end_1 || end_2) && (
        <div>
          <ToriMain id={`main_tori`} />
        </div>
      )}

      <JungleBackground />
    </div>
  );
};

export default Jungle;
