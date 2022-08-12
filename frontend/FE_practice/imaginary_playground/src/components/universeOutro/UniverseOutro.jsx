import React, { useEffect } from "react";
import UniverseLoading from "../universe/UniverseLoading";
import AlienMain from "../universeIntro/AlienMain";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";

import "../../css/UniverseOutro.css";

const UniverseOutro = () => {
  const navigate = useNavigate();
  const universeIntroAudio = new Howl({
    src: ["/assets/audio/universe/우주맵아웃트로음성.mp3"],
    onend: () => {
      document
        .getElementById("AlienOutroMain")
        ?.setAttribute("class", "universe_disappear");

      setTimeout(() => {
        navigate("/", { replace: true });
        document.getElementById("AlienOutroMain").remove();
      }, 1500);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("AlienOutroMain").classList.add("move_down_up");
      universeIntroAudio.play();
    }, 3000);

    return () => {
      Howler.stop();
    };
  }, []);

  return (
    <div className="UniverseOutro">
      {/* 토리 로딩 */}
      <div>
        <AlienMain id="AlienOutroMain" />
      </div>

      <div className="going_universe_text_box universe_Top_appear">
        <div className="text_opacity_chage">
          <span style={{ color: "pink" }}>갤</span>
          <span style={{ color: "midnightblue" }}>럭</span>
          <span style={{ color: "red" }}>시</span>
          <span style={{ color: "gray" }}>월</span>
          <span style={{ color: "navy" }}>드</span> 나가는 문
        </div>
      </div>

      <div className="universe_intro_text_box universe_Right_appear">
        <div className="mt-custom">
          우주 쓰레기를 <span style={{ color: "hotpink" }}>청소</span>해줘서
          고마워!
        </div>
        <div className="mt-custom">
          너도 <span style={{ color: "red" }}>쓰레기</span>를 함부로 버리지
          않도록 해!
        </div>
        <div className="mt-custom">
          이제 <span style={{ color: "pink" }}>갤럭시</span> 월드의 탐험이
          끝이났어!
        </div>
        <div className="mt-custom">
          <span style={{ color: "darkorchid" }}>우주</span>를 여행하고 있을께!
          또 놀려오렴!
        </div>
      </div>
      {/* 우주맵 백그라운드 */}
      <UniverseLoading />
    </div>
  );
};

export default UniverseOutro;
