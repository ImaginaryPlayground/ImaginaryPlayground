import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router-dom";
import EndGameMainDolphin from "../components/oceanCopy/EndGameMainDolphin";
import Motion3Dolphin from "../components/oceanCopy/Motion3Dolphin";
import Motion2Dolphin from "../components/oceanCopy/Motion2Dolphin";
import Motion1Dolphin from "../components/oceanCopy/Motion1Dolphin";
import MainDolphinNextStage from "../components/oceanCopy/MainDolphinNextStage";
import "../css/oceanCopy.css";

import { MOTION_POINT } from "../util/nodeConfig";

const OceanMotionTest = () => {
  //첫번째 모션 인식 시작
  const [motionStart1, setMotionStart1] = useState(false);
  //두번째 모션 인식 시작
  const [motionStart2, setMotionStart2] = useState(false);

  //세번째 모션 인식 시작
  const [motionStart3, setMotionStart3] = useState(false);

  //모션인식 스타트
  const [isStartMotion, setIsMotionStart] = useState(false);

  //정답입니다 텍스트 보여줄 useState
  const [isMotionCorrect, setisMotionCorrect] = useState(false);

  //다음 모션 넘어갈때 자세 준비하라는 멘트 처리 시간
  const [isMotionLoading, setisMotionLoading] = useState(false);

  //마지막 게임 음성 부분
  const [endGameAudio, setEndGameAudio] = useState(false);

  const [motionStartBefore, setMotionStartBefore] = useState(true);

  //메인 게임 음악
  const mainGameAudio = new Howl({
    src: ["/assets/audio/ocean/Calimba.mp3"],
    onend: () => {},
    volume: 0.1,
  });

  //자세 따라하라는 오디오
  const MotionStartBeforeAudio = new Howl({
    //  음성
    src: ["/assets/audio/ocean/자세따라하라는 음성.mp3"],
    onend: () => {
      document.getElementById("main_dolphin_next_stage_1")?.remove();

      setMotionStartBefore(false);
      setMotionStart1(true);
      mainGameAudio.play();
    },
  });

  const endGameSound = new Howl({
    src: ["/assets/audio/ocean/오션맵 마무리 멘트.mp3"],
    onend: () => {},
  });

  const navigate = useNavigate();

  const nextMotionAudio = new Howl({
    src: ["/assets/audio/ocean/다음자세 나갑니다.mp3"],
    onend: () => {
      setMotionStart1(false);
      setMotionStart2(true);
      setisMotionLoading(false);
    },
  });

  const lastMotionAudio = new Howl({
    src: ["/assets/audio/ocean/한자세만 더 따라하기.mp3"],
    onend: () => {
      setMotionStart2(false);
      setMotionStart3(true);
      setisMotionLoading(false);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      MotionStartBeforeAudio.play();
    }, 500);
  }, []);

  useEffect(() => {
    if (motionStart1 || motionStart2 || motionStart3) {
      let motion1Success = false;
      let motion2Success = false;
      let motion3Success = false;
      setIsMotionStart(true);
      let canvas, ctx;
      const socket = io(MOTION_POINT);
      socket.emit("poseOn");
      canvas = document.getElementById("canvas");

      canvas.width = 500;
      canvas.height = 500;
      canvas.style.display = "block";
      ctx = canvas.getContext("2d");

      // 받은 pose 출력
      socket.on("pose", (className, maxProbability) => {
        //여기서 pose에 대한 정보가 온다.
        console.log(className, maxProbability);

        if (
          motionStart1 &&
          className === "hands_up" &&
          maxProbability == 1.0 &&
          !motion1Success
        ) {
          motion1Success = true;
          const motion1Dolphin = document.getElementById("motion1_dolphin_0");
          setisMotionCorrect(true);
          // canvas.style.display = "none";

          setTimeout(() => {
            //모션 로딩 처리
            setisMotionCorrect(false);
            setisMotionLoading(true);
            // nextMotionAudio.play();
            motion1Dolphin?.remove();
          }, 5000);

          // setTimeout(() => {
          //   canvas.style.display = "block";
          // }, 5000);
        } else if (
          motionStart2 &&
          className === "bong_pose" &&
          maxProbability == 1.0 &&
          !motion2Success
        ) {
          motion2Success = false;
          const motion2Dolphin = document.getElementById("motion2_dolphin_0");
          setisMotionCorrect(true);
          // canvas.style.display = "none";

          setTimeout(() => {
            //모션 로딩 처리
            setisMotionCorrect(false);
            setisMotionLoading(true);
            // lastMotionAudio.play();
            motion2Dolphin?.remove();
            canvas.style.display = "none";
          }, 5000);

          setTimeout(() => {
            canvas.style.display = "block";
          }, 8000);
        } else if (
          motionStart3 &&
          !motion3Success &&
          className === "monkey_pose" &&
          maxProbability == 1.0
        ) {
          console.log("여기 찍힘?");
          socket.emit("poseOff");
          setisMotionCorrect(true);
          // canvas.style.display = "none";
          motion3Success = true;

          setTimeout(() => {
            setisMotionCorrect(false);
            setMotionStart3(false);
            setEndGameAudio(true);
            canvas.remove();
            Howler.stop();
            document.getElementById("motion3_dolphin_0")?.remove();

            // 끝나는 텍스트 교체하기
            setTimeout(() => {
              document.getElementById("endGame_text1").style.display = "none";
              document.getElementById("endGame_text2").style.display = "block";
            }, 3000);

            endGameSound.play();

            // 돌핀 사라지기
            setTimeout(() => {
              document
                .getElementById("endGame_dolphin_0")
                .setAttribute("class", "disappear");
            }, 30000);

            // 돌핀 제거 후 메인화면으로
            setTimeout(() => {
              document.getElementById("endGame_dolphin_0").remove();
              navigate("/", { replace: "true" });
            }, 31300);
          }, 5000);
        }
      });

      socket.on("poseImg", (image) => {
        // console.log("poseImg");

        const imageObj = new Image();
        imageObj.onload = function () {
          ctx.drawImage(imageObj, 0, 0);
        };
        imageObj.src = image;
      });
    }

    if (motionStart1 && isMotionLoading) {
      Howler.stop();
      nextMotionAudio.play();
    } else if (motionStart2 && isMotionLoading) {
      Howler.stop();
      lastMotionAudio.play();
    }

    return () => {};
  }, [motionStart1, motionStart2, motionStart3, isMotionLoading]);

  return (
    <div className="ocean_copy">
      {/* 자세를 따라하기 전 안내 텍스트 및 돌핀 로드 */}
      {motionStartBefore && (
        <>
          <h2
            className="complete_title"
            style={{ textAlign: "center", left: "34%", top: "23%" }}
          >
            <div>
              아주 <span style={{ color: "midnightblue" }}>훌륭해</span>!!
            </div>
            <div style={{ fontSize: "55px" }}>
              그럼 이젠 나의{" "}
              <span style={{ color: "palevioletred", fontSize: "70px" }}>
                자세
              </span>
              를 따라해봐!!
            </div>
          </h2>
          {/* 다음 스테이지 넘어가기전 돌리 로드 */}
          <div>
            {!document.getElementById("main_dolphin_next_stage_1") && (
              <MainDolphinNextStage id="main_dolphin_next_stage_1" />
            )}
          </div>
        </>
      )}
      {(motionStart1 || motionStart2 || motionStart3) && !isMotionLoading && (
        <h2 className="dance_start_text text_size_change">
          <span style={{ color: "darkcyan" }}>원숭이</span>의&nbsp;
          <span style={{ color: "midnightblue" }}>자세</span>를 따라 하세요!!
        </h2>
      )}
      {isMotionCorrect && (
        <>
          <h2
            className="dance_start_text text_size_change"
            style={{ top: "22%", left: "60%", fontSize: "90px" }}
          >
            <span style={{ color: "hotpink" }}>정답</span>입니다!!
          </h2>
        </>
      )}

      {isMotionLoading && (
        <>
          <h2
            className="dance_start_text text_size_change "
            style={{ left: "25%", top: "22%", fontSize: "100px" }}
          >
            다음
            <span style={{ color: "midnightblue" }}> 자세</span>를
            <span style={{ color: "hotpink" }}> 준비</span>
            하세요!!
          </h2>
        </>
      )}

      {/* 모션 돌핀1 로드 */}
      {motionStart1 &&
        !motionStart2 &&
        !document.getElementById("motion1_dolphin_0") &&
        !isMotionLoading && (
          <>
            <Motion1Dolphin id="motion1_dolphin_0" />
          </>
        )}
      {/* 모션 돌핀2 로드 */}
      {motionStart2 &&
        !motionStart3 &&
        !document.getElementById("motion2_dolphin_0") &&
        !isMotionLoading && (
          <>
            <Motion2Dolphin id="motion2_dolphin_0" />
          </>
        )}
      {/* 모션 돌핀3 로드 */}
      {motionStart3 &&
        !endGameAudio &&
        !document.getElementById("motion3_dolphin_0") && (
          <>
            <Motion3Dolphin id="motion3_dolphin_0" />
          </>
        )}

      {endGameAudio && (
        <>
          <div>
            <EndGameMainDolphin id={"endGame_dolphin_0"} />
          </div>
          <div
            className="complete_title endGame_text"
            style={{ display: "block" }}
            id="endGame_text1"
          >
            <img
              src="/assets/ocean/dolly-complete1.png"
              alt=""
              className="dolly-complete animate__animated animate__pulse"
            />
          </div>
          <div
            className="complete_title endGame_text"
            style={{ display: "none" }}
            id="endGame_text2"
          >
            <img
              src="/assets/ocean/dolly-complete2.png"
              alt=""
              className="dolly-complete animate__animated animate__pulse"
            />
          </div>
        </>
      )}

      {/* 이미지 사진 나올 부분  */}
      <div>
        <canvas
          id="canvas"
          style={{
            display: "none",
            position: "absolute",
            left: "63%",
            top: "42%",
            zIndex: "100000",
            borderRadius: "30px",
          }}
        ></canvas>
      </div>
      {/* 지금부터 배경 요소 시작 */}
      {/* 양옆 암벽 */}
      <img alt="" src="/assets/ocean/cliff1.png" className="cliff1" />
      <img alt="" src="/assets/ocean/cliff2.png" className="cliff2" />

      {/* 배경 지나가는 물고기 */}
      <img alt="" src="/assets/ocean/fish.png" className="fish" />
      <img alt="" src="/assets/ocean/whale.png" className="whale" />
      <img alt="" src="/assets/ocean/trashfish.png" className="trashfish" />

      {/* 배경 햇빛 */}
      <img alt="" src="/assets/ocean/sun1.png" className="sun1" />
      <img alt="" src="/assets/ocean/sun2.png" className="sun2" />
      <img alt="" src="/assets/ocean/sun3.png" className="sun3" />
      <img alt="" src="/assets/ocean/sun4.png" className="sun4" />
      <img alt="" src="/assets/ocean/sun5.png" className="sun5" />

      {/* 산호초 */}
      <img alt="" src="/assets/ocean/yellow.png" className="yellow" />
      <img alt="" src="/assets/ocean/red.png" className="red" />
      <img alt="" src="/assets/ocean/rainbow.png" className="rainbow" />
      <img alt="" src="/assets/ocean/blueleaf3.png" className="blueleaf3" />
      <img alt="" src="/assets/ocean/blueleaf2.png" className="blueleaf2" />
      <img alt="" src="/assets/ocean/blueleaf1.png" className="blueleaf1" />
      <img alt="" src="/assets/ocean/cucumber.png" className="cucumber" />
      <img alt="" src="/assets/ocean/pink.png" className="pink" />
      <img alt="" src="/assets/ocean/cactus.png" className="cactus" />

      {/* 배경 물방울 */}
      <img alt="" src="/assets/ocean/bubble1.png" className="bubble1" />
      <img alt="" src="/assets/ocean/bubble2.png" className="bubble2" />
      <img alt="" src="/assets/ocean/bubble3.png" className="bubble3" />

      {/* 가장 끝 배경 */}
      <img alt="" src="/assets/ocean/background.png" className="background" />
    </div>
  );
};

export default OceanMotionTest;
