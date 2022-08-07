import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dolphin from "../components/ocean/Dolphin";
import SharkSample from "../components/oceanCopy/SharkSample";
import SharkSample2 from "../components/oceanCopy/SharkSample2";
import SharkSample3 from "../components/oceanCopy/SharkSample3";
import SharkSample4 from "../components/oceanCopy/SharkSample4";
import "../css/oceanCopy.css";

const OceanCopy = () => {
  // 게임 시작하는 게임 지도 구현
  const [start, setStart] = useState(false);
  const startGame = () => {
    setStart(!start);
    // 지도 클릭하면 나올 효과음 구현
    const mapMusic = new Audio("/assets/ocean/map.mp3");
    mapMusic.play();
  };

  // 전체 상어 클릭 횟수 구하기
  const [totalCount, totalCountSet] = useState(0);

  // 첫번째 상어
  const [isClickOne, setIsClickOne] = useState(false);
  const [countOne, setCountOne] = useState(0);
  const toggleOne = () => {
    setCountOne(countOne + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음
    const bubbleAudio = new Audio("/assets/ocean/bubble.mp4");
    bubbleAudio.play();
    if (countOne >= 4) {
      setIsClickOne(!isClickOne);

      document.getElementById("shark1")?.remove();
    }
  };

  // 두번째 상어
  const [isClickTwo, setIsClickTwo] = useState(false);
  const [countTwo, setCountTwo] = useState(0);
  const toggleTwo = () => {
    setCountTwo(countTwo + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음
    const bubbleAudio = new Audio("/assets/ocean/bubble.mp4");
    bubbleAudio.play();
    if (countTwo >= 4) {
      setIsClickTwo(!isClickTwo);

      document.getElementById("shark2")?.remove();
    }
  };

  // 세 번째 상어
  const [isClickThree, setIsClickThree] = useState(false);
  const [countThree, setCountThree] = useState(0);
  const toggleThree = () => {
    setCountThree(countThree + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음
    const bubbleAudio = new Audio("/assets/ocean/bubble.mp4");
    bubbleAudio.play();
    if (countThree >= 4) {
      setIsClickThree(!isClickThree);

      document.getElementById("shark3")?.remove();
    }
  };

  // 네 번째 상어
  const [isClickFour, setIsClickFour] = useState(false);
  const [countFour, setCountFour] = useState(0);
  const toggleFour = () => {
    setCountFour(countFour + 1);
    totalCountSet(totalCount + 1);

    // 클릭하면 나오는 버블 효과음
    const bubbleAudio = new Audio("/assets/ocean/bubble.mp4");
    bubbleAudio.play();
    if (countFour >= 4) {
      setIsClickFour(!isClickFour);

      document.getElementById("shark4")?.remove();
    }
  };

  const navigate = useNavigate();

  return (
    <div className="ocean_copy">
      <div>{<SharkSample id="shark1" />}</div>
      <div>{<SharkSample2 id="shark2" />}</div>
      <div>{<SharkSample3 id="shark3" />}</div>
      <div>{<SharkSample4 id="shark4" />}</div>

      {/* 전체적인 배경음악 */}
      {/* <iframe src="/assets/ocean/Calimba.mp3" allow="autoplay;" className="audio"></iframe> */}

      {/* 상어 게임이 구현되는 동안(아직 상어가 20번 터치가 안되었을때) 상어 4마리를 보여주고*/}
      {start ? (
        <>
          {totalCount < 20 ? (
            <h2 className="title">상어를 터치하여 쫓아주세요!</h2>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 2번째 상어 */}
          {countOne <= 4 ? (
            <div className="copy_Shark1 shark_move" onClick={toggleOne}></div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 3번째 상어 */}
          {countTwo <= 4 ? (
            <div className="copy_Shark2 shark_move" onClick={toggleTwo}></div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 4번째 상어 */}
          {countThree <= 4 ? (
            <div className="copy_Shark3 shark_move" onClick={toggleThree}></div>
          ) : (
            <></>
          )}
          {/* 왼쪽에서 1번째 상어 */}
          {countFour <= 4 ? (
            <div className="copy_Shark4 shark_move" onClick={toggleFour}></div>
          ) : (
            <></>
          )}

          {/* 상어가 20번이 다 터치가 되면 게임 끝났다는 화면 보여주기 */}
          {totalCount === 20 ? (
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
          <img
            alt=""
            src="/assets/ocean/map.png"
            className="map"
            onClick={startGame}
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
