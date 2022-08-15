import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dolphin from "../components/ocean/Dolphin";
import SharkSample from "../components/oceanCopy/SharkSample";
import SharkSample2 from "../components/oceanCopy/SharkSample2";
import SharkSample3 from "../components/oceanCopy/SharkSample3";
import SharkSample4 from "../components/oceanCopy/SharkSample4";
import MainDolphin from "../components/oceanCopy/MainDolphin";
import MainDolphinSide from "../components/oceanCopy/MainDolphinSide";

import "../css/oceanCopy.css";
import { Howl, Howler } from "howler";
import MainDolphinNextStage from "../components/oceanCopy/MainDolphinNextStage";
import DanceMainDolphin from "../components/oceanCopy/DanceMainDolphin";
import Motion1Dolphin from "../components/oceanCopy/Motion1Dolphin";
import Motion2Dolphin from "../components/oceanCopy/Motion2Dolphin";
import Motion3Dolphin from "../components/oceanCopy/Motion3Dolphin";
import EndGameMainDolphin from "../components/oceanCopy/EndGameMainDolphin";
import { ENDPOINT } from "../util/nodeConfig";
import socketIOClient, { io } from "socket.io-client";

const OceanCopy = () => {
  // 게임 시작하는 게임 지도 구현
  const [start, setStart] = useState(false);

  // 전체 상어 클릭 횟수 구하기
  const [totalCount, totalCountSet] = useState(0);
  const [totalSharkCount, setTotalSharkCount] = useState(4);
  const [isNiceText, setIsNiceText] = useState(false);
  const [DanceStart, setDanceStart] = useState(false);
  const [DanceStartBefore, setDanceStartBefore] = useState(false);

  //지금이 클릭 시간인지
  const [isClickTime, setIsClickTime] = useState(false);

  //첫번째 모션 인식 시작
  const [motionStart1, setMotionStart1] = useState(false);
  const [motionStartBefore, setMotionStartBefore] = useState(false);

  //두번째 모션 인식 시작
  const [motionStart2, setMotionStart2] = useState(false);

  //세번째 모션 인식 시작
  const [motionStart3, setMotionStart3] = useState(false);

  //마지막 게임 음성 부분
  const [endGameAudio, setEndGameAudio] = useState(false);

  //다음 모션 넘어갈때 자세 준비하라는 멘트 처리 시간
  const [isMotionLoading, setisMotionLoading] = useState(false);

  //정답입니다 텍스트 보여줄 useState
  const [isMotionCorrect, setisMotionCorrect] = useState(false);

  //모션인식 스타트
  const [isStartMotion, setIsMotionStart] = useState(false);

  const mapMusic = new Audio("/assets/ocean/map.mp3");
  //게임 시작 음성
  const startAudio = new Howl({
    src: ["/assets/audio/ocean/오션맵-게임시작 음성-0.9배속.mp3"],
    onend: () => {
      //게임시작
      setStart(true);

      //메인 돌리 삭제
      const mainDolphin = document.getElementById("main_dolphin_0");
      mainDolphin?.remove();

      // 지도 클릭하면 나올 효과음 구현
      mapMusic.play();
      setTimeout(() => {
        gameDescriptionAudio.play();
      }, 500);
    },
  });

  //초기 설정
  useEffect(() => {
    setTimeout(() => {
      startAudio.play();
    }, 1000);

    setTimeout(() => {
      const mainDolphin = document.getElementById("main_dolphin_0");
      mainDolphin.classList?.add("move_down_up");
    }, 3000);
    return () => {
      Howler.stop();
    };
  }, []);

  //웹소캣 통신코드(터치)
  useEffect(() => {
    setTimeout(() => {
      //웹소캣 io 통신하기
      let y = "0";
      let isLoadingTime = false;
      const socket = socketIOClient(ENDPOINT);
      socket.on("chat message", (data) => {
        const sharkObjects = document.getElementsByClassName("click_div");
        if (data.split(" ")[0] == 3) {
          console.log(data.split(" ")[2] - 320);
        }
        console.log(data);
        y = data.split(" ")[2] - 400;
        //x값 세팅
        if (!isLoadingTime) {
          for (let index = 0; index < sharkObjects.length; index++) {
            const sharkObject = sharkObjects[index];
            const sharkObjectRect = sharkObjects[index].getBoundingClientRect();
            if (data.split(" ")[0] == 1) {
              if (
                sharkObject.classList[0] === "copy_Shark1" &&
                100 <= y &&
                1000 >= y
              ) {
                isLoadingTime = true;
                sharkObject.click();
                setTimeout(() => {
                  isLoadingTime = false;
                }, 1000);
              }
            } else if (data.split(" ")[0] == 2) {
              if (
                (sharkObject.classList[0] === "copy_Shark2" &&
                  100 <= y &&
                  700 >= y) ||
                (sharkObject.classList[0] === "copy_Shark3" &&
                  700 <= y &&
                  1000 >= y)
              ) {
                isLoadingTime = true;
                sharkObject.click();
                setTimeout(() => {
                  isLoadingTime = false;
                }, 1050);
              }
            } else if (data.split(" ")[0] == 3) {
              if (
                (sharkObject.classList[0] === "copy_Shark2" &&
                  100 <= y &&
                  750 >= y) ||
                (sharkObject.classList[0] === "copy_Shark3" &&
                  751 <= y &&
                  1060 >= y)
              ) {
                isLoadingTime = true;
                sharkObject.click();
                setTimeout(() => {
                  isLoadingTime = false;
                }, 1000);
              }
            } else if (data.split(" ")[0] == 4) {
              if (
                sharkObject.classList[0] === "copy_Shark4" &&
                100 <= y &&
                800 >= y
              ) {
                isLoadingTime = true;
                sharkObject.click();
                setTimeout(() => {
                  isLoadingTime = false;
                }, 1000);
              }
            }
          }
        }
      });
    });
  }, []);

  //상어 3마리 남은 음성
  const restThreeSharkAudio = new Howl({
    src: ["/assets/audio/ocean/상어 3마리 남음.wav"],
    onend: () => {},
  });
  //상어 2마리 남은 음성
  const restTwoSharkAudio = new Howl({
    src: ["/assets/audio/ocean/상어2마리 남음.wav"],
    onend: () => {},
  });
  //상어 1마리 남은 음성
  const restOneSharkAudio = new Howl({
    src: ["/assets/audio/ocean/마지막 상어 처리.wav"],
    onend: () => {},
  });

  //동요 오디오
  const singAudio = new Howl({
    src: ["/assets/audio/ocean/돌고래와 함께 춤을 춰요 동요.mp3"],
    onend: () => {},
  });

  //자세 따라하라는 오디오
  const MotionStartBeforeAudio = new Howl({
    src: ["/assets/audio/ocean/자세따라하라는 음성.mp3"],
    onend: () => {
      document.getElementById("main_dolphin_next_stage_1")?.remove();

      setMotionStartBefore(false);
      setMotionStart1(true);
      mainGameAudio.play();
    },
  });

  // 자세따라할때 맞는지 IOT 와 웹소켓 통신 하기
  useEffect(() => {
    if (motionStart1 || motionStart2 || motionStart3) {
      let motion1Success = false;
      let motion2Success = false;
      let motion3Success = false;
      setIsMotionStart(true);
      let canvas, ctx;
      const socket = io("http://localhost:3001");
      socket.emit("poseOn");
      canvas = document.getElementById("canvas");
      console.log(canvas);
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
          canvas.style.display = "none";

          setTimeout(() => {
            //모션 로딩 처리
            setisMotionCorrect(false);
            setisMotionLoading(true);
            // nextMotionAudio.play();
            motion1Dolphin?.remove();
          }, 3000);

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
          canvas.style.display = "none";
          setTimeout(() => {
            //모션 로딩 처리
            setisMotionCorrect(false);
            setisMotionLoading(true);
            // lastMotionAudio.play();
            motion2Dolphin?.remove();
          }, 8000);
          // setTimeout(() => {
          //   canvas.style.display = "block";
          // }, 5000);
        } else if (
          motionStart3 &&
          !motion3Success &&
          className === "idle" &&
          maxProbability == 1.0
        ) {
          socket.emit("poseOff");
          setisMotionCorrect(true);
          canvas.style.display = "none";
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
            }, 8000);

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
          }, 3000);
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

  const endGameSound = new Howl({
    src: ["/assets/audio/ocean/오션맵 마무리 멘트.mp3"],
    onend: () => {},
  });

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

  //메인 게임 음악
  const mainGameAudio = new Howl({
    src: ["/assets/audio/ocean/Calimba.mp3"],
    onend: () => {},
    volume: 0.1,
  });

  //다음 스테이지 율동시작전 음성
  const nextStageAudio = new Howl({
    src: ["/assets/audio/ocean/상어물리친후음성.mp3"],
    onend: () => {
      //댄스 시작전 카운트다운 설정
      setDanceStartBefore(true);

      //돌리 삭제
      const doli = document.getElementById("main_dolphin_next_stage_0");
      doli.remove();

      //카운트 다운
      const countDown1 = document.getElementById("countdown_1");
      const countDown2 = document.getElementById("countdown_2");
      const countDown3 = document.getElementById("countdown_3");

      countDown3.style.display = "block";

      setTimeout(() => {
        countDown3.style.display = "none";
        countDown2.style.display = "block";
      }, 1000);
      setTimeout(() => {
        countDown2.style.display = "none";
        countDown1.style.display = "block";
      }, 2000);
      setTimeout(() => {
        countDown1.style.display = "none";
        //노래 가사 박스 보이기
        document.getElementById("sing_box").style.display = "block";
        document.getElementById("sing_1").style.display = "block";
        //춤 텍스트 시작
        setDanceStart(true);
      }, 3000);

      //동요 시작
      singAudio.play();

      //1분뒤 동요 종료
      setTimeout(() => {
        singAudio.stop();
        document.getElementById("sing_box").style.display = "none";
        setDanceStart(false);
        //모션인식 시작 전 화면 보여주기
        setMotionStartBefore(true);
        //댄스 돌핀 제거
        document.getElementById("dance_main_dolphin_0").remove();

        setTimeout(() => {
          MotionStartBeforeAudio.play();
        }, 700);
      }, 60000);

      //노래 가사 div에 접근
      const sing_1 = document.getElementById("sing_1");
      const sing_2 = document.getElementById("sing_2");
      const sing_3 = document.getElementById("sing_3");
      const sing_4 = document.getElementById("sing_4");
      const sing_5 = document.getElementById("sing_5");
      const sing_6 = document.getElementById("sing_6");
      const sing_7 = document.getElementById("sing_7");
      const sing_8 = document.getElementById("sing_8");
      const sing_9 = document.getElementById("sing_9");
      const sing_10 = document.getElementById("sing_10");
      const sing_11 = document.getElementById("sing_11");
      const sing_12 = document.getElementById("sing_12");
      const sing_13 = document.getElementById("sing_13");

      setTimeout(() => {
        sing_1.style.display = "none";
        sing_2.style.display = "block";
      }, 7600);
      setTimeout(() => {
        sing_2.style.display = "none";
        sing_3.style.display = "block";
      }, 13700);
      setTimeout(() => {
        sing_3.style.display = "none";
        sing_4.style.display = "block";
      }, 18900);
      setTimeout(() => {
        sing_4.style.display = "none";
        sing_5.style.display = "block";
      }, 24900);
      setTimeout(() => {
        sing_5.style.display = "none";
        sing_6.style.display = "block";
      }, 29500);
      setTimeout(() => {
        sing_6.style.display = "none";
        sing_7.style.display = "block";
      }, 36500);
      setTimeout(() => {
        sing_7.style.display = "none";
        sing_8.style.display = "block";
      }, 40200);
      setTimeout(() => {
        sing_8.style.display = "none";
        sing_9.style.display = "block";
      }, 43500);
      setTimeout(() => {
        sing_9.style.display = "none";
        sing_10.style.display = "block";
      }, 45500);
      setTimeout(() => {
        sing_10.style.display = "none";
        sing_11.style.display = "block";
      }, 48500);
      setTimeout(() => {
        sing_11.style.display = "none";
        sing_12.style.display = "block";
      }, 52000);
      setTimeout(() => {
        sing_12.style.display = "none";
        sing_13.style.display = "block";
      }, 54500);
    },
  });

  //사이드 돌리 상어 처치시 한바퀴 돌기
  useEffect(() => {
    if (totalSharkCount <= 3) {
      setIsNiceText(true);
      const mainDolphinSide = document.getElementById("main_dolphin_side_0");
      mainDolphinSide.classList.add("victory_dolphin");

      setTimeout(() => {
        setIsNiceText(false);
        mainDolphinSide.classList.remove("victory_dolphin");
      }, 1700);
    }

    if (totalSharkCount === 3) {
      restThreeSharkAudio.play();
    } else if (totalSharkCount === 2) {
      restTwoSharkAudio.play();
    } else if (totalSharkCount === 1) {
      restOneSharkAudio.play();
    } else if (totalSharkCount === 0) {
      Howler.stop();
      const mainDolphinSide = document.getElementById("main_dolphin_side_0");
      mainDolphinSide.remove();
      setIsNiceText(false);
      //다음 스테이지 시작 음성
      setTimeout(() => {
        nextStageAudio.play();
      }, 800);
    }
  }, [totalSharkCount]);

  // 클릭하면 나오는 버블 효과음
  const bubbleAudio = new Audio("/assets/audio/ocean/bubble.mp3");

  //게임 설명 음성
  const gameDescriptionAudio = new Howl({
    src: ["/assets/audio/ocean/오션맵-게임설명오디오-0.9배속.mp3"],
    onend: () => {
      mainGameAudio.play();
    },
  });

  const click_rest_time = () => {};
  // 첫번째 상어
  const [isClickOne, setIsClickOne] = useState(false);
  const [countOne, setCountOne] = useState(0);

  const toggleOne = () => {
    //클릭타임이 아니면 클릭적용
    if (!isClickTime) {
      setCountOne(countOne + 1);
      totalCountSet(totalCount + 1);

      bubbleAudio.play();
      const dom = document.getElementById("attack_effect_1");
      dom.style.display = "block";

      // 현재 클릭 시간을 적용시켜 클릭을 못하게 막기
      setIsClickTime(true);
      setTimeout(() => {
        dom.style.display = "none";
      }, 1000);

      setTimeout(() => {
        // 1.2초 후에 클릭 허용
        setIsClickTime(false);
      }, 1200);

      if (countOne >= 2) {
        document.getElementById("shark1")?.remove();
        // 전체 상어 개수 -1
        setTotalSharkCount(totalSharkCount - 1);
      }
    }
  };

  // 두번째 상어
  const [isClickTwo, setIsClickTwo] = useState(false);
  const [countTwo, setCountTwo] = useState(0);
  const toggleTwo = () => {
    setCountTwo(countTwo + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음

    bubbleAudio.play();
    const dom = document.getElementById("attack_effect_2");
    dom.style.display = "block";

    // 현재 클릭 시간을 적용시켜 클릭을 못하게 막기
    setIsClickTime(true);
    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);

    setTimeout(() => {
      // 1.2초 후에 클릭 허용
      setIsClickTime(false);
    }, 1200);

    if (countTwo >= 2) {
      document.getElementById("shark2")?.remove();
      // 전체 상어 개수 -1
      setTotalSharkCount(totalSharkCount - 1);
    }
  };

  // 세 번째 상어
  const [isClickThree, setIsClickThree] = useState(false);
  const [countThree, setCountThree] = useState(0);
  const toggleThree = () => {
    setCountThree(countThree + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음

    bubbleAudio.play();
    const dom = document.getElementById("attack_effect_3");
    dom.style.display = "block";

    // 현재 클릭 시간을 적용시켜 클릭을 못하게 막기
    setIsClickTime(true);
    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);

    setTimeout(() => {
      // 1.2초 후에 클릭 허용
      setIsClickTime(false);
    }, 1200);

    if (countThree >= 2) {
      document.getElementById("shark3")?.remove();
      // 전체 상어 개수 -1
      setTotalSharkCount(totalSharkCount - 1);
    }
  };

  // 네 번째 상어
  const [isClickFour, setIsClickFour] = useState(false);
  const [countFour, setCountFour] = useState(0);
  const toggleFour = () => {
    setCountFour(countFour + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음

    bubbleAudio.play();
    const dom = document.getElementById("attack_effect_4");
    dom.style.display = "block";

    // 현재 클릭 시간을 적용시켜 클릭을 못하게 막기
    setIsClickTime(true);
    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);

    setTimeout(() => {
      // 1.2초 후에 클릭 허용
      setIsClickTime(false);
    }, 1200);

    if (countFour >= 2) {
      document.getElementById("shark4")?.remove();
      // 전체 상어 개수 -1
      setTotalSharkCount(totalSharkCount - 1);
    }
  };

  // useEffect(() => {
  //   console.log(document.elementFromPoint(320, 320));
  // }, [countOne, countTwo, countThree, countFour]);

  const navigate = useNavigate();

  return (
    <div className="ocean_copy">
      {/* 전체적인 배경음악 */}
      {/* <iframe src="/assets/ocean/Calimba.mp3" allow="autoplay;" className="audio"></iframe> */}

      {/* 상어 게임이 구현되는 동안(아직 상어가 20번 터치가 안되었을때) 상어 4마리를 보여주고*/}
      {start ? (
        <>
          {/* 상어 캐릭터 로드 */}
          {!document.getElementById("main_dolphin_side_0") &&
            totalSharkCount !== 0 && (
              <div>{<MainDolphinSide id="main_dolphin_side_0" />}</div>
            )}
          <div>{<SharkSample id="shark1" />}</div>
          <div>{<SharkSample2 id="shark2" />}</div>
          <div>{<SharkSample3 id="shark3" />}</div>
          <div>{<SharkSample4 id="shark4" />}</div>
          {/* 메인돌리 남은 상어 텍스트 */}
          {totalSharkCount !== 0 && (
            <>
              {!isNiceText ? (
                <>
                  <div className="main_dolphin_text">
                    <div>
                      현재 남은 상어는{" "}
                      <span style={{ color: "red", fontSize: "45px" }}>
                        {totalSharkCount}
                      </span>{" "}
                      마리야!
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src="/assets/ocean/dolly-victory.png"
                    alt=""
                    className="dolly-victory animate__animated animate__pulse"
                  />
                </div>
                // <div className="main_dolphin_good_text">
                //   상어를 물리쳤어! 신난다!!
                // </div>
              )}
            </>
          )}
          {totalCount < 12 ? (
            <h2 className="title move_down_up">
              <span style={{ color: "mediumblue" }}>상어</span>를{" "}
              <span style={{ color: "mediumvioletred" }}>터치</span>하여
              쫓아주세요!
            </h2>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 1번째 상어 */}
          {countOne <= 2 ? (
            <div
              id="shark_move_1_box"
              className="copy_Shark1 shark_move_1_box click_div"
              onClick={toggleOne}
            >
              <div className="touch_message">
                <span className="touch_num_text">{3 - countOne}</span>번{" "}
                {3 - countOne <= 2 && (
                  <span
                    style={{
                      fontSize: "60px",
                      color: "midnightblue",
                    }}
                    className="text_size_change"
                  >
                    더
                  </span>
                )}{" "}
                터치해주세요!
              </div>
              <div className="attack_effect" id="attack_effect_1"></div>
            </div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 2번째 상어 */}
          {countTwo <= 2 ? (
            <div
              id="shark_move_1_box"
              className="copy_Shark2 shark_move_2_box click_div click_div"
              onClick={toggleTwo}
            >
              <div className="touch_message">
                <span className="touch_num_text">{3 - countTwo}</span>번{" "}
                {3 - countTwo <= 2 && (
                  <span
                    style={{
                      fontSize: "60px",
                      color: "midnightblue",
                    }}
                    className="text_size_change"
                  >
                    더
                  </span>
                )}{" "}
                터치해주세요!
              </div>
              <div className="attack_effect" id="attack_effect_2"></div>
            </div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 3번째 상어 */}
          {countThree <= 2 ? (
            <div
              id="shark_move_3_box"
              className="copy_Shark3 shark_move_3_box click_div click_div"
              onClick={toggleThree}
            >
              <div className="touch_message">
                <span className="touch_num_text">{3 - countThree}</span>번{" "}
                {3 - countThree <= 2 && (
                  <span
                    style={{
                      fontSize: "60px",
                      color: "midnightblue",
                    }}
                    className="text_size_change"
                  >
                    더
                  </span>
                )}{" "}
                터치해주세요!
              </div>
              <div className="attack_effect" id="attack_effect_3"></div>
            </div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 4번째 상어 */}
          {countFour <= 2 ? (
            <div
              id="shark_move_4_box"
              className="copy_Shark4 shark_move_4_box click_div"
              onClick={toggleFour}
            >
              <div className="touch_message">
                <span className="touch_num_text">{3 - countFour}</span>번{" "}
                {3 - countFour <= 2 && (
                  <span
                    style={{
                      fontSize: "60px",
                      color: "midnightblue",
                    }}
                    className="text_size_change"
                  >
                    더
                  </span>
                )}{" "}
                터치해주세요!
              </div>
              <div className="attack_effect" id="attack_effect_4"></div>
            </div>
          ) : (
            <></>
          )}
          {/* 상어가 12번 다 터치가 되면 게임 끝났다는 화면 보여주기 */}
          {totalSharkCount === 0 ? (
            <div>
              {!DanceStart &&
                !motionStart1 &&
                !motionStart2 &&
                !motionStart3 &&
                !motionStartBefore &&
                !endGameAudio && (
                  <h2 className="complete_title">
                    너가 해냈어!! 모든{" "}
                    <span style={{ color: "brown" }}>상어</span>를 물리쳤어!{" "}
                  </h2>
                )}

              {/* 다음 스테이지의 돌리 로딩 */}
              {!document.getElementById("main_dolphin_next_stage_0") &&
                !DanceStartBefore && (
                  <MainDolphinNextStage id="main_dolphin_next_stage_0" />
                )}

              {/* 이제 곧 춤춘다는 돌리 로딩  */}
              {DanceStartBefore &&
                !DanceStart &&
                !motionStart1 &&
                !motionStart2 &&
                !motionStart3 &&
                !motionStartBefore &&
                !endGameAudio && (
                  <div className="dance_before">
                    이제 곧 <span style={{ color: "hotpink" }}>돌리</span>가
                    춤을 춥니다
                  </div>
                )}

              {/* 카운트다운 박스 */}
              <div className="countdown_box">
                <span className="text_countdown_1" id="countdown_1">
                  1
                </span>
                <span className="text_countdown_2" id="countdown_2">
                  2
                </span>
                <span className="text_countdown_3" id="countdown_3">
                  3
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* 돌리 춤을 따라하는 텍스트 */}
          {DanceStart && (
            <>
              <h2 className="dance_start_text text_size_change">
                <span style={{ color: "darkcyan" }}>돌리</span>의&nbsp;
                <span style={{ color: "midnightblue" }}>춤</span>을 따라
                하세요!!
              </h2>
              {/* 댄스 돌핀 로드 */}
              <DanceMainDolphin id="dance_main_dolphin_0" />
            </>
          )}

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
              <span style={{ color: "darkcyan" }}>돌리</span>의&nbsp;
              <span style={{ color: "midnightblue" }}>자세</span>를 따라
              하세요!!
            </h2>
          )}
          {isMotionCorrect && (
            <>
              <h2
                className="dance_start_text text_size_change"
                style={{ top: "52%", left: "55%", fontSize: "90px" }}
              >
                <span style={{ color: "hotpink" }}>정답</span>입니다!!
              </h2>
            </>
          )}

          {isMotionLoading && (
            <>
              <h2
                className="dance_start_text text_size_change"
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
              <h2
                className="complete_title endGame_text"
                style={{ display: "block" }}
                id="endGame_text1"
              >
                <div>
                  너무 <span style={{ color: "midnightblue" }}>재밌었어</span>
                  !!
                </div>
                <div style={{ fontSize: "55px", marginTop: "20px" }}>
                  <div className="mt-10">
                    이제 <span style={{ color: "aqua" }}>바다</span> 맵 여행은
                    끝이 났어!
                  </div>
                  <div className="mt-10">
                    덕분에 <span style={{ color: "brown" }}>돌고래</span>{" "}
                    친구들이 다시 마을에서 편하게 지낼 수 있게 되었어!
                  </div>
                  <div className="mt-10">
                    또 <span style={{ color: "red" }}>상어</span>가 괴롭힌다면
                    너가 와서 도와줘야 해!
                  </div>
                </div>
              </h2>
              <h2
                className="complete_title endGame_text"
                style={{ display: "none" }}
                id="endGame_text2"
              >
                <div>
                  항상 <span style={{ color: "midnightblue" }}>건강해</span>!!
                </div>
                <div style={{ fontSize: "55px", marginTop: "20px" }}>
                  <div className="mt-10">
                    <div>
                      너도 항상 <span style={{ color: "hotpink" }}>건강</span>
                      해야 해!{" "}
                    </div>
                    우리 아프지말고
                    <span style={{ color: "pink" }}>행복</span>하게 지내자!
                  </div>{" "}
                  <div className="mt-10">
                    그럼 이제 다른 곳을{" "}
                    <span style={{ color: "violet" }}>여행</span>
                    하러 가봐
                    <div>
                      나는 <span style={{ color: "brown" }}>친구들</span>에게
                      돌아갈께!!
                    </div>
                  </div>
                  <div className="mt-10">
                    우리 꼭 <span style={{ color: "limegreen" }}>언젠가</span>{" "}
                    다시 볼 수 있기를...
                  </div>
                </div>
              </h2>
            </>
          )}

          {/* 동요 가사 보여주기 */}
          <div className="sing_text" id="sing_box">
            <div className="sing_title">노래 가사</div>
            <div className="sing_1  sing_common" id="sing_1">
              돌고래와 춤을 춰요. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;태양을 향해
              쑥쑥쑥, 쑥쑥쑥,
            </div>
            <div className="sing_2  sing_common" id="sing_2">
              바다와 함께 으쓱쓱,으쓱쓱, 다같이 함께 콩콩콩, 콩콩콩
            </div>
            <div className="sing_3  sing_common" id="sing_3">
              물고기도 신나 춤을 춰요 하늘을 향해 쑥쑥쑥, 쑥쑥쑥,
            </div>
            <div className="sing_4  sing_common" id="sing_4">
              파도와 함께 으쓱쓱, 으쓱쓱, 다같이 함께 콩콩콩, 콩콩콩
            </div>
            <div className="sing_5  sing_common" id="sing_5">
              미역도 신나 춤을 춰요 별을 향해 쑥쑥쑥, 쑥쑥쑥,
            </div>
            <div className="sing_6  sing_common" id="sing_6">
              돌고래와 함께 으쓱쓱, 으쓱쓱, 다같이 함께 콩콩콩, 콩콩콩
            </div>
            <div className="sing_7  sing_common" id="sing_7">
              언더더씨 돌고래 마을에 오신 것을 환영합니다.
            </div>
            <div className="sing_8  sing_common" id="sing_8">
              여기는 웃음이 넘치는 돌고래 마을
            </div>
            <div className="sing_9  sing_common" id="sing_9">
              모두가 친구되는 돌고래마을
            </div>
            <div className="sing_10  sing_common" id="sing_10">
              신나고 재밌는 돌고래마을,
            </div>
            <div className="sing_11  sing_common" id="sing_11">
              언더더씨 돌고래 마을에 오신 것을 환영합니다.
            </div>
            <div className="sing_12 sing_common" id="sing_12">
              뚜루뚜루 뚜뚜뚜 뚜뚜
            </div>
            <div className="sing_13 sing_common" id="sing_13">
              뚜뚜뚜루 뚜뚜루 뚜뚜
            </div>
          </div>

          {/* 홈으로 돌아가기 버튼 */}
          <button onClick={() => navigate("/")} className="home-button">
            돌아가기
          </button>
        </>
      ) : (
        <>
          {/* 가장 처음에 보여주는 스토리 설명 지도 화면 */}
          <div>
            <MainDolphin id={"main_dolphin_0"} />
          </div>
          <img
            alt=""
            src="/assets/ocean/map.png"
            className="map"
            style={{ zIndex: "-4" }}
          />
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

export default OceanCopy;
