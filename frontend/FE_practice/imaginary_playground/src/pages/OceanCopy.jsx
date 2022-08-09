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

const OceanCopy = () => {
  // 게임 시작하는 게임 지도 구현
  const [start, setStart] = useState(false);

  // 전체 상어 클릭 횟수 구하기
  const [totalCount, totalCountSet] = useState(0);
  const [totalSharkCount, setTotalSharkCount] = useState(4);
  const [isNiceText, setIsNiceText] = useState(false);

  const mapMusic = new Audio("/assets/ocean/map.mp3");
  //게임 시작 음성
  const startAudio = new Howl({
    src: ["/assets/audio/ocean/오션맵-게임시작 음성-0.9배속.mp3"],
    onend: () => {
      //게임시작
      setStart(true);

      //메인 돌리 삭제
      const mainDolphin = document.getElementById("main_dolphin_0");
      mainDolphin.remove();

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
      mainDolphin.classList.add("move_down_up");
    }, 3000);
    return () => {
      Howler.stop();
    };
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

  //사이드 돌리 상어 처치시 한바퀴 돌기
  useEffect(() => {
    if (totalSharkCount <= 3) {
      setIsNiceText(true);
      const mainDolphinSide = document.getElementById("main_dolphin_side_0");
      mainDolphinSide.classList.add("rotate_dolphin");

      setTimeout(() => {
        setIsNiceText(false);
        mainDolphinSide.classList.remove("rotate_dolphin");
      }, 1700);
    }

    if (totalSharkCount === 3) {
      Howler.stop();
      restThreeSharkAudio.play();
    } else if (totalSharkCount === 2) {
      Howler.stop();
      restTwoSharkAudio.play();
    } else if (totalSharkCount === 1) {
      Howler.stop();
      restOneSharkAudio.play();
    }
  }, [totalSharkCount]);

  // 클릭하면 나오는 버블 효과음
  const bubbleAudio = new Audio("/assets/audio/ocean/bubble.mp3");

  //게임 설명 음성
  const gameDescriptionAudio = new Howl({
    src: ["/assets/audio/ocean/오션맵-게임설명오디오-0.9배속.mp3"],
    onend: () => {},
  });

  // 첫번째 상어
  const [isClickOne, setIsClickOne] = useState(false);
  const [countOne, setCountOne] = useState(0);
  const toggleOne = () => {
    setCountOne(countOne + 1);
    totalCountSet(totalCount + 1);

    bubbleAudio.play();
    const dom = document.getElementById("attack_effect_1");
    dom.style.display = "block";

    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);
    if (countOne >= 2) {
      document.getElementById("shark1")?.remove();
      // 전체 상어 개수 -1
      setTotalSharkCount(totalSharkCount - 1);
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

    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);
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

    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);
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

    setTimeout(() => {
      dom.style.display = "none";
    }, 1000);
    if (countFour >= 2) {
      document.getElementById("shark4")?.remove();
      // 전체 상어 개수 -1
      setTotalSharkCount(totalSharkCount - 1);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="ocean_copy">
      {/* 전체적인 배경음악 */}
      {/* <iframe src="/assets/ocean/Calimba.mp3" allow="autoplay;" className="audio"></iframe> */}

      {/* 상어 게임이 구현되는 동안(아직 상어가 20번 터치가 안되었을때) 상어 4마리를 보여주고*/}
      {start ? (
        <>
          {/* 캐릭터 로드 */}
          {!document.getElementById("main_dolphin_side_0") && (
            <div>{<MainDolphinSide id="main_dolphin_side_0" />}</div>
          )}
          <div>{<SharkSample id="shark1" />}</div>
          {/* <div>{<SharkSample2 id="shark2" />}</div> */}
          {/* <div>{<SharkSample3 id="shark3" />}</div> */}
          {/* <div>{<SharkSample4 id="shark4" />}</div> */}

          {/* 메인돌리 남은 상어 텍스트 */}
          {!isNiceText ? (
            <>
              <div className="main_dolphin_text">
                <div>
                  현재 남은 <span style={{ color: "aqua" }}>상어</span>는{" "}
                  <span style={{ color: "red", fontSize: "45px" }}>
                    {totalSharkCount}
                  </span>
                  마리야!
                </div>
              </div>
            </>
          ) : (
            <div className="main_dolphin_good_text">
              상어를 물리쳤어! 신난다!!
            </div>
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
              className="copy_Shark1 shark_move_1_box"
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
              className="copy_Shark2 shark_move_2_box"
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
              className="copy_Shark3 shark_move_3_box"
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
              className="copy_Shark4 shark_move_4_box"
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

          {/* 상어가 20번이 다 터치가 되면 게임 끝났다는 화면 보여주기 */}
          {totalCount === 12 ? (
            <div>
              <h2 className="title1">게임 끝~</h2>
              <iframe
                title="end_game"
                src="/assets/ocean/applaud.mp3"
                allow="autoplay;"
                className="audio"
              ></iframe>
              <Dolphin></Dolphin>
            </div>
          ) : (
            <></>
          )}

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
