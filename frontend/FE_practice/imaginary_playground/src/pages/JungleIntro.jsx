import React, { useEffect } from "react";
import Elephant from "../components/jungle/Elephant";
import JungleBackground from "../components/jungle/JungleBackground";
import Lion from "../components/jungle/Lion";
import Monkey from "../components/jungle/Monkey";
import JungleIntroTori from "../components/jungleIntro/JungleIntroTori";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";

import "../css/JungleIntro.css";

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
        .getElementById("jungleIntroTori")
        .setAttribute("class", "move_down_up");

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
      <div className="text_location appear_text" id="intro_jungle_text">
        <div className="text_box">
          <div>
            안녕!
            <span style={{ color: "brown" }}>우가우가 숲</span>인 정글 맵에 온걸
            환영해!
          </div>
          <div style={{ marginTop: "30px" }}>
            여긴 여러 <span style={{ color: "brown" }}>동물</span>들이 살고있어!{" "}
          </div>
          <div style={{ marginTop: "30px" }}>
            지금 바로!! 정글의<span style={{ color: "brown" }}>동물</span>들을{" "}
            <div
              style={{
                fontSize: "60px",
                textAlign: "left",
                marginTop: "30px",
              }}
            >
              보러가자!
              <span
                style={{
                  fontSize: "60px",
                  color: "blue",
                }}
              ></span>
            </div>{" "}
          </div>
        </div>
      </div>
      <JungleBackground />
    </div>
  );
};

export default JungleIntro;
