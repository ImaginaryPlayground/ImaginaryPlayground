import React, { useEffect, useState } from "react";
import OceanIntroDolphin from "../components/oceanIntro/OceanIntroTori";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router";

const OceanCopyIntro = () => {
  const [isThreeSeconds, setIsThreeSeconds] = useState(false);
  const navigate = useNavigate();

  //메인 토리 음성
  const mainToriAudio = new Howl({
    src: ["/assets/audio/ocean/오션맵_인트로_음성.wav"],
    onend: () => {},
  });

  useEffect(() => {
    setTimeout(() => {
      const mainTori = document.getElementById("OceanIntroDolphin");
      mainTori.classList.remove("ocean_tori_intro");
      mainTori.classList.add("ocean_tori_move_down_up");
      mainToriAudio.play();
      setIsThreeSeconds(true);
    }, 3000);

    setTimeout(() => {
      const mainTori = document.getElementById("OceanIntroDolphin");
      mainTori.setAttribute("class", "disappear");
    }, 18500);

    setTimeout(() => {
      const mainTori = document.getElementById("OceanIntroDolphin");
      mainTori.remove();
      navigate("/ocean-copy", { replace: true });
    }, 20000);

    return () => {
      //모든 음성 종료
      Howler.stop();
    };
  }, []);

  return (
    <div className="OceanCopyIntro">
      {/* 토리 렌더링 */}
      {!isThreeSeconds && (
        <div>
          <OceanIntroDolphin id={"OceanIntroDolphin"} />
        </div>
      )}
      <div className="title_box">
        <h2 className="title move_down_up">
          <span style={{ color: "mediumblue", fontWeight: "bold" }}>
            미지의 바다
          </span>{" "}
          <span style={{ color: "hotpink", fontWeight: "bold" }}>
            "언더더씨"
          </span>
          로 가는중!
        </h2>
      </div>
      {isThreeSeconds && (
        <div className="text_box">
          <div
            className="attack_effect"
            style={{ display: "block", left: "-103%", top: "-102%" }}
          ></div>
          <div
            className="attack_effect"
            style={{ display: "block", left: "97%", top: "-102%" }}
          ></div>
          <div className="text_box_bg">
            <span style={{ color: "mediumblue", fontWeight: "bold" }}>
              미지의 바다
            </span>{" "}
            <span style={{ color: "hotpink", fontWeight: "bold" }}>
              "언더더씨"
            </span>
            에는 무시무시한{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>상어</span>들과
            귀여운{" "}
            <span style={{ color: "pink", fontWeight: "bold" }}>돌고래</span>
            들이 살고있어!
            <div>
              벌써부터{" "}
              <span style={{ color: "maroon", fontWeight: "bold" }}>기대</span>
              가 되는걸!!
            </div>
            <div>
              지금 바로{" "}
              <span style={{ color: "brown", fontWeight: "bold" }}>출발</span>
              하자!!
            </div>
          </div>
        </div>
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

export default OceanCopyIntro;
