import React, { useEffect } from "react";
import UniverseLoading from "../components/universe/UniverseLoading";
import AlienMain from "../components/universeIntro/AlienMain";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";

import "../css/UniverseIntro.css";

const UniverseIntro = () => {

  useEffect(() => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        if (element.id !== 'AlienMain') {
          element.remove();
        }
      });
    }
  }, []);


  const navigate = useNavigate();
  const universeIntroAudio = new Howl({
    src: ["/assets/audio/universe/우주맵인트로음성.mp3"],
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
      document.getElementById("AlienMain").classList.add("move_down_up");
      universeIntroAudio.play();
    }, 3000);

    return () => {
      Howler.stop();
    };
  }, []);

  return (
    <div className="UniverseIntro">
      {/* 토리 로딩 */}
      <div>
        <AlienMain id="AlienMain" />
      </div>

      {/* <div className="going_universe_text_box universe_Top_appear">
        <div className="text_opacity_chage">
          <span style={{ color: "pink" }}>갤</span>
          <span style={{ color: "midnightblue" }}>럭</span>
          <span style={{ color: "red" }}>시</span>
          <span style={{ color: "gray" }}>월</span>
          <span style={{ color: "navy" }}>드</span>로 입장중...
        </div>
      </div> */}

      <h2 className="universe-intro-text">갤럭시 월드로 입장 중</h2>
      {/* <img src="/assets/universe/map.png" alt="" className="universe-map"/> */}

      {/* <div className="universe_intro_text_box universe_Right_appear">
        <div>
          반갑군, <span style={{ color: "pink" }}>친구</span>!
        </div>
        <div className="mt-custom">
          여기 맵의 이름은{" "}
          <span style={{ color: "lightcoral" }}>갤럭시 월드</span>야!
        </div>
        <div className="mt-custom">
          여기에는 많은 <span style={{ color: "hotpink" }}>행성</span>
          들이 존재한다네!
        </div>
        <div className="mt-custom">
          어서 빨리 <span style={{ color: "darkorchid" }}>탐험</span>해 보고
          싶지 않은가?{" "}
        </div>
        <div className="mt-custom">
          그럼 빨리 <span style={{ color: "violet" }}>출발</span>해보자고!!
        </div>
      </div> */}

        
      {/* 우주맵 백그라운드 */}
      <UniverseLoading />
    </div>
  );
};

export default UniverseIntro;
