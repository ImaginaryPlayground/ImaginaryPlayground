import "../css/christmas.css";
import Santa from "../components/christmas/Santa.jsx";
import Tree from "../components/christmas/tree.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import { config } from "../util/config";
import axios from "axios";
import { useSelector } from "react-redux";
import MainSanta from "../components/christmas/MainSanta";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Christmas = () => {
  const [startSantaAudio, setstartSantaAudio] = useState(true);
  const [giveMeGift, setGiveMeGift] = useState(false);

  const [isMainSanta, setIsMainSanta] = useState(false);

  const [kidsData, setKidsData] = useState([]);

  const [backSee, setBackSee] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );
  const christmasMapSound = new Howl({
    src: ["/assets/audio/christmas/christmas.mp3"],
    volume: 0.7,
    onend: () => {},
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== "true") {
      //만약 로그인 되어있지 않으면 three.js 캐릭터들 모두 삭제 후 로그인 페이지로 이동
      alert("크리스마스 맵은 로그인이 필요합니다!");
      navigate("/login");
    } else {
      axios({
        url: `${config.api}/user/care/lookup/all`,
        method: "POST",
        headers: {
          Auth: sessionStorage.getItem("token"),
        }, //헤더에 토큰
        data: {
          name: "",
          age_1: 1,
          age_2: 20,
          gender: "A",
          page: 0,
          hospital_id: loginUserDataReducer?.hospital_id,
        },
      })
        .then((res) => {
          //전체 데이터를 배열로 반환(아이 이미지)
          console.log(res);
          if (res.data.status === "SUCCESS") {
            //받은 데이터들 입력(전체 데이터 수도 같이 준다)
            setKidsData(res.data.data);
          } else {
            console.log("데이터를 가져오는 데서 오류가 발생했습니다.!");
            alert("다시 로그인 해주세요!");
            sessionStorage.removeItem("isLogin");
            sessionStorage.removeItem("token");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("서버와 통신에러");
        });
      setTimeout(() => {
        startSantaAudioMp3.play();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (
      giveMeGift &&
      (transcript.includes("선물주") || transcript.includes("주세요"))
    ) {
      //음성인식 초기화
      SpeechRecognition.stopListening();
      resetTranscript();

      setTimeout(() => {
        backSeeAudio.play();
        document.getElementById("give_me_gift_box").remove();
      }, 500);
    }

    return () => {};
  }, [giveMeGift, transcript]);

  const startSantaAudioMp3 = new Howl({
    src: ["/assets/audio/christmas/싼타 시작음성.mp3"],
    onend: () => {
      christmasMapSound.play();
      setstartSantaAudio(false);
      document.getElementById("startSanta").remove();
      setTimeout(() => {
        setIsMainSanta(true);

        setTimeout(() => {
          document.getElementById("mainSanta").classList.add("move_down_up");
          mainSantaAudio.play();
        }, 3000);
      }, 10000);
    },
  });

  // 선물주는 산타 음성
  const mainSantaAudio = new Howl({
    src: ["/assets/audio/christmas/선물주세요 멘트.mp3"],
    onend: () => {
      setGiveMeGift(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: "ko",
      });
    },
  });

  // 뒤돌아봐 음성
  const backSeeAudio = new Howl({
    src: ["/assets/audio/christmas/선물은 이미 도착.mp3"],
    onend: () => {
      setGiveMeGift(false);
      setBackSee(true);
      document.getElementById("mainSanta").remove();
    },
  });

  return (
    <div className="christmas">
      {/* 뒤돌아 보세요 텍스트 띄우기 전 */}
      {!backSee ? (
        <>
          {/* 시작음성이 끝나기 전과 끝나고 난 후 */}
          {startSantaAudio ? (
            <>
              <img
                src="/assets/christmas/santa-intro.png"
                alt=""
                className="santa-intro animate__animated animate__bounce"
              />
              <Santa id={"startSanta"}></Santa>
            </>
          ) : (
            <>
              <div className="kid_box_1 animate__animated animate__tada">
                <div className="img_box">
                  <img src={`https://${kidsData[0]?.profile}`} alt="" />
                </div>
                <div className="kid_text">{kidsData[0]?.character}</div>
              </div>
              <div className="kid_box_2 animate__animated animate__tada">
                <div className="img_box">
                  <img src={`https://${kidsData[1]?.profile}`} alt="" />
                </div>
                <div className="kid_text">{kidsData[1]?.character}</div>
              </div>
              <div className="kid_box_3 animate__animated animate__tada">
                <div className="img_box">
                  <img src={`https://${kidsData[2]?.profile}`} alt="" />
                </div>
                <div className="kid_text">{kidsData[2]?.character}</div>
              </div>
              <img
                src="/assets/christmas/rope.png"
                alt=""
                className="rope animate__animated animate__pulse"
              />
              <img
                src="/assets/christmas/color.png"
                alt=""
                className="color animate__animated animate__pulse"
              />

              {/* 메인산타 등장 */}
              {isMainSanta && (
                <div>
                  <MainSanta id="mainSanta" />

                  {!giveMeGift ? (
                    <></>
                  ) : (
                    // <div className="mainSanta_text_box appear">
                    //   지성아, 지웅아, 지후야 너넬 위해 선물을 준비했어!
                    // </div>
                    <div
                      className="mainSanta_text_box text_countdown"
                      id="give_me_gift_box"
                    >
                      {/* "선물 주세요" 라고 외치세요! */}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="backSee_text_box animate__animated animate__flash">
            뒤를 돌아 보세요!
          </div>
        </>
      )}

      {/* <Tree id={'tree'}></Tree> */}

      {/* 크리스마스 트리 */}
      <img src="/assets/christmas/star.png" alt="" className="tree-star" />
      <img src="/assets/christmas/ornament.png" alt="" className="ornament" />
      <img src="/assets/christmas/tree.png" alt="" className="christmastree" />
      <img src="/assets/christmas/hill.png" alt="" className="christmashill" />
      <img src="/assets/christmas/rudolph.png" alt="" className="rudolph" />
      <img
        src="/assets/christmas/background.png"
        alt=""
        className="christmas-background"
      />

      {/* 배경 */}
      <div class="snow"></div>

      <img
        src="/assets/map/minimap.png"
        alt=""
        className="minimap"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  );
};

export default Christmas;
