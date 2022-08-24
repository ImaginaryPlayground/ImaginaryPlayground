import React, { useEffect } from "react";
import Elephant from "../components/jungle/Elephant";
import JungleBackground from "../components/jungle/JungleBackground";
import Lion from "../components/jungle/Lion";
import Monkey from "../components/jungle/Monkey";
import JungleIntroTori from "../components/jungleIntro/JungleIntroTori";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";

import "../css/JungleIntro.css";
import { useFBO } from "@react-three/drei";

const JungleIntro = () => {
  const navigate = useNavigate();
  const jungleIntroAudio = new Howl({
    src: ["/assets/audio/jungle/정글맵 인트로 음성.wav"],
    onend: () => {
      //게임시작
      document.getElementById("intro_jungle_text").classList.add("disappear");
      document
        .getElementById("jungleIntroTori")
        .setAttribute("class", "disappear");
      setTimeout(() => {
        document.getElementById("jungleIntroTori").remove();
        navigate("/jungle", { replace: true });
      }, 1000);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById("tory-intro")
        .setAttribute("class", "tory-disappear");
    }, 0);
  });

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById("jungleIntroTori")
        .setAttribute("class", "move_down_up");
      document
        .getElementById("tory-intro")
        .setAttribute("class", "animate__animated animate__tada tory-intro ");
      jungleIntroAudio.play();
    }, 3000);

    return () => {
      //모든 음성 종료
      Howler.stop();

      //토리 제거
      document.getElementById("jungleIntroTori")?.remove();
    };
  }, []);

  return (
    <div className="JungleIntro">
      <div>
        <JungleIntroTori id="jungleIntroTori" />
      </div>
      {/* <div className="text_location animate__animated animate__backInDown" > */}
      {/* <div className="text_box">
          <div>
            안녕! &nbsp;
            <span style={{ color: "green" }}>우가우가 숲</span>에 온 걸
            환영해!
          </div>
          <div style={{ marginTop: "1vh" }}>
            여긴 여러 동물들이 살고 있어!
          </div>
          <div style={{ marginTop: "1vh" }}>
            지금 바로 정글의 동물들을 보러가자!
          </div>
        </div> */}
      <div id="intro_jungle_text">
        <img
          src="/assets/jungle/jungle-text.png"
          alt=""
          className="jungle-text animate__animated animate__backInDown"
        />
        <img
          src="/assets/jungle/tory-intro.png"
          alt=""
          className="tory-intro 
           "
          id="tory-intro"
        />
      </div>

      {/* 홈으로 돌아가기 버튼 */}

      <img
        src="/assets/map/jungle_minimap.png"
        alt=""
        className="jungle_minimap"
      />

      {/* </div> */}
      <JungleBackground />
    </div>
  );
};

export default JungleIntro;
