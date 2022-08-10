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
        .getElementById("AlienMain")
        ?.setAttribute("class", "universe_disappear");

      setTimeout(() => {
        navigate("/universe", { replace: true });
        document.getElementById("AlienMain").remove();
      }, 1000);
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
          너무 고마워!
        </div>
        <div className="mt-custom">
          너도 지구에서도 길거리에 <span style={{ color: "red" }}>쓰레기</span>
          를 함부로 버리지 않도록 해!
        </div>
        <div className="mt-custom">
          이제 <span style={{ color: "pink" }}>갤럭시</span> 월드의 탐험이
          끝이났어!
        </div>
        <div className="mt-custom">
          <span style={{ color: "lightcoral" }}>또</span> 놀러 올거라고 믿고
          있어!{" "}
        </div>
        <div className="mt-custom">
          그럼 나는 아주 큰 이<span style={{ color: "darkorchid" }}>우주</span>
          를 여행하고 있을께!
        </div>
      </div>
      {/* 우주맵 백그라운드 */}
      <UniverseLoading />
    </div>
  );
};

export default UniverseOutro;
