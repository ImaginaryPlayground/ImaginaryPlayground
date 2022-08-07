import { useEffect, useRef, useState } from "react";
import ".././css/jungle.css";
import Sample from "../components/jungle/Sample";
//음성인식 라이브러리
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Howl, Howler } from "howler";
import Sample2 from "../components/jungle/Sample2";

const Jungle = () => {
  const [nowSpeechStart, setNowSpeechStart] = useState(false);
  const [playMonkySound, setplayMonkySound] = useState(false);
  const [isMonkyMain, setIsMonkyMain] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const goForse = useRef(false);

  //초기 로딩시 음성 시작
  useEffect(() => {
    setTimeout(() => {
      findTextAudio.play();
    }, 2000);

    return () => {};
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

      //전체 음악 종료
      Howler.stop();
      //음성인식 초기화
      resetTranscript();
      SpeechRecognition.stopListening();

      //숨어있는 몽키 지우기
      const whale = document.getElementById("whale_0");
      whale?.remove();
      //다음 메인 몽키 진행
      //메인 원숭이 음성 스타트
      setIsMonkyMain(true);
      mainMonkyAudio.play();
      setTimeout(() => {
        console.log("지금 부터 음성인식 시작");
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });
      }, 3000);
    }

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

      console.log(transcript);
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();
      //메인 멍키 없애준다.
      const monkyMain = document.getElementById("monky_main");
      monkyMain?.remove();
    }
    return () => {};
  }, [transcript]);

  //동물 찾으라는 음성
  const findTextAudio = new Howl({
    src: ["/assets/audio/jungle/동물들을찾아줘.wav"],

    onend: () => {
      //멍키사운드 시작
      setplayMonkySound(true);
      //말하기 시작
      setNowSpeechStart(true);
      monkySound.play("key1");

      setTimeout(() => {
        monkySound.stop();
        //console.log("이제 true!");
        //goForse.current = true;
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
      //끝난 후 음성인식 시작
      //SpeechRecognition.startListening({ continuous: true, language: "ko" });
    },
  });

  return (
    <div className="jungle" id="jungle_box">
      <div className="hide_monky_box">
        <div>{transcript}</div>
        <Sample id={`whale_0`}></Sample>
        {playMonkySound && (
          <div className="text_location">
            <div>어떤 동물인지 맞춰봐!</div>
            <div style={{ fontSize: "20px", marginTop: "20px" }}>
              소리가 나오고 있어!
            </div>
            {nowSpeechStart && (
              <div
                style={{ fontSize: "40px", marginTop: "10px" }}
                className="speech"
              >
                지금 말하세요!
              </div>
            )}
          </div>
        )}
        {isMonkyMain && (
          <div className="text_location">
            <div>나는 원숭이야</div>
            <div style={{ fontSize: "20px", marginTop: "20px" }}>
              만나서 반가워! "화이팅"라고 외쳐줘!!!
            </div>
          </div>
        )}
      </div>
      {isMonkyMain && (
        <div className="monkey_box">
          <Sample2 id={`monky_main`}></Sample2>
        </div>
      )}
      {/* 가장 앞 첫번째 구간 */}
      <img src="/assets/jungle/firstHill.png" alt="" className="firstHill" />
      <img src="/assets/jungle/firstCeil.png" alt="" className="firstCeil" />

      {/* 햇빛 */}
      <img src="/assets/jungle/sun1.png" alt="" className="sun1" />
      <img src="/assets/jungle/sun2.png" alt="" className="sun2" />
      <img src="/assets/jungle/sun3.png" alt="" className="sun3" />

      {/* 두 번째 구간 */}
      <img src="/assets/jungle/secondCeil.png" alt="" className="secondCeil" />
      <img src="/assets/jungle/secondHill.png" alt="" className="secondHill" />

      {/* 세 번째 구간 */}
      <img src="/assets/jungle/onlyTree.png" alt="" className="onlyTree" />
      <img src="/assets/jungle/bird.png" alt="" className="bird" />
      <img src="/assets/jungle/palmTree.png" alt="" className="palmTree" />

      {/* 배경 */}
      <img src="/assets/jungle/background.png" alt="" className="background" />
    </div>
  );
};

export default Jungle;
