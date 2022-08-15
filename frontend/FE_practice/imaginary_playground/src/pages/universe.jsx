import ".././css/universe.css";

import { Stars, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useEffect, useState } from "react";
import UniverseGame from "../components/universe/UniverseGame";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import AlienNextStage from "../components/universe/AlienNextStage";
import AlienSide from "../components/universe/AlienSide";
import socketIOClient from "socket.io-client";

//소켓 IO node서버 연결 주소
const ENDPOINT = "http://127.0.0.1:4001";

const Universe = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    planetStartAudio.play();

    return () => {
      Howler.stop();
      for (let idx in document.getElementsByTagName("canvas")) {
        console.log(idx);
      }
    };
  }, []);

  useEffect(() => {
    //웹소캣 io 통신하기
    let x = "231";
    let y = "900";

    const planetTouchObject = document.getElementsByClassName("click_div");
    const socket = socketIOClient(ENDPOINT);
    // socket.on("FromAPI", (data) => {
    //   console.log(data);
    // });
    socket.emit("chat message");
    socket.on("chat message", (data) => {
      console.log(data?.split(" ")[2] - 400);
      x = 0;
      y = data?.split(" ")[2] - 400;

      for (let idx = 0; idx < planetTouchObject.length; idx++) {
        const objectRect = planetTouchObject[idx].getBoundingClientRect();
        //console.log(objectRect);
        if (
          y >= objectRect.y &&
          y <= objectRect.y + objectRect.height &&
          0 <= objectRect.x &&
          objectRect.x <= 480
        ) {
          if (!isLoading) {
            planetTouchObject[idx].click();
            setIsLoading(true);
          }
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    });
    console.log(y);
  }, [isLoading]);

  const nextStageAudio = new Howl({
    src: ["/assets/audio/universe/우주맵다음스테이지음성.mp3"],
    onend: () => {
      document.getElementsByClassName(
        "universe_next_stage_text_box"
      )[0].style.display = "none";
      document
        .getElementsByClassName("ufo")[0]
        .setAttribute("class", "ufo_dissapear");
      setTimeout(() => {
        document
          .getElementById("AlienNextStage")
          .setAttribute("class", "fast_disappear");
        document
          .getElementById("universe_ufo_img")
          .setAttribute("class", "ufo_dissapear_2");
      }, 2000);

      setTimeout(() => {
        document.getElementById("AlienNextStage").remove();
      }, 2500);

      setTimeout(() => {
        setPlanetCount(planetCount + 1);
      }, 3500);
    },
  });

  const planetStartAudio = new Howl({
    src: ["/assets/audio/universe/행성스테이지게임시작음성.mp3"],
    onend: () => {
      document.getElementById("planet_touch_text_1").style.display = "none";
      document.getElementById("planet_touch_text_2").style.display = "block";
    },
  });

  // 힐링 파트(행성 클릭 이벤트) 횟수 카운트
  const [planetCount, setPlanetCount] = useState(0);
  const clickPlanet = () => {
    setPlanetCount(planetCount + 1);
  };

  // 행성클릭된 개수 지켜보는 useEffect
  useEffect(() => {
    if (planetCount === 8) {
      Howler.stop(); //모든 음악 종료 후 실행
      document.getElementById("FirstStageAlienSide").remove(0);
      setTimeout(() => {
        nextStageAudio.play();
      }, 1500);

      setTimeout(() => {
        document.getElementById("universe_next_stage_text_box").style.display =
          "block";
        document.getElementById("AlienNextStage").classList.add("move_down_up");
      }, 3000);
    }

    return () => {};
  }, [planetCount]);

  // 수성(mercury) 클릭
  const [mercury, setMercury] = useState(false);
  const mercuryClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setMercury(!mercury);
    clickPlanet();
  };

  // 금성(venus) 클릭
  const [venus, setVenus] = useState(false);
  const venusClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setVenus(!venus);
    clickPlanet();
  };

  // 지구(earth) 클릭
  const [earth, setEarth] = useState(false);
  const earthClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setEarth(!earth);
    clickPlanet();
  };

  // 화성(mars) 클릭
  const [mars, setMars] = useState(false);
  const marsClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setMars(!mars);
    clickPlanet();
  };

  // 목성(jupyter) 클릭
  const [jupyter, setJupyter] = useState(false);
  const jupyterClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setJupyter(!jupyter);
    clickPlanet();
  };

  // 토성(Saturn) 클릭
  const [saturn, setSaturn] = useState(false);
  const saturnClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setSaturn(!saturn);
    clickPlanet();
  };

  // 천왕성(uranus) 클릭
  const [uranus, setUranus] = useState(false);
  const uranusClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setUranus(!uranus);
    clickPlanet();
  };

  // 해왕성(neptune) 클릭
  const [neptune, setNeptune] = useState(false);
  const neptuneClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setNeptune(!neptune);
    clickPlanet();
  };

  document.documentElement.style.setProperty("--animate-duration", "2s");
  const navigate = useNavigate();

  return (
    <>
      <div className="universe">
        {/* <iframe
          title="배경음악"
          src="/assets/audio/universe/universe.mp3"
          allow="autoplay;"
          className="audio"
        ></iframe> */}

        {planetCount !== 9 ? (
          <>
            {planetCount !== 8 ? (
              <>
                {/* 사이드 외계인 등장 */}
                <div>
                  <AlienSide id="FirstStageAlienSide" />
                </div>
                {/* 수성 mercury 흑백 */}
                {mercury === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/mercury.png"
                      className="mercury animate__animated animate__heartBeat"
                    />
                    <p className="mercury-title">수성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={mercuryClick}
                      className="click_div mercury_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/mercury.png"
                      className="mercury animate__animated animate__bounceIn"
                      onClick={mercuryClick}
                      style={{ filter: "grayscale(100%)" }}
                    ></img>
                    <p className="mercury-title animate__animated animate__bounceIn">
                      수성
                    </p>
                  </>
                )}

                {/* 금성 venus 흑백 */}
                {venus === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/venus.png"
                      className="venus animate__animated animate__heartBeat"
                    />
                    <p className="venus-title">금성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={venusClick}
                      className="click_div venus_click_div"
                    ></div>

                    <img
                      alt=""
                      src="/assets/universe/venus.png"
                      className="venus animate__animated animate__bounceIn"
                      onClick={venusClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="venus-title animate__animated animate__bounceIn">
                      금성
                    </p>
                  </>
                )}

                {/* 지구 earth 흑백 */}
                {earth === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/earth.png"
                      className="earth animate__animated animate__heartBeat"
                    />
                    <p className="earth-title">지구</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={earthClick}
                      className="click_div earth_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/earth.png"
                      className="earth animate__animated animate__bounceIn"
                      onClick={earthClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="earth-title animate__animated animate__bounceIn">
                      지구
                    </p>
                  </>
                )}

                {/* 화성 mars 흑백 */}
                {mars === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/mars.png"
                      className="mars animate__animated animate__heartBeat"
                    />
                    <p className="mars-title">화성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={marsClick}
                      className="click_div mars_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/mars.png"
                      className="mars animate__animated animate__bounceIn"
                      onClick={marsClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="mars-title animate__animated animate__bounceIn">
                      화성
                    </p>
                  </>
                )}

                {/* 목성 jupyter 흑백 */}
                {jupyter === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/jupyter2.png"
                      className="jupyter animate__animated animate__heartBeat"
                    />
                    <p className="jupyter-title">목성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={jupyterClick}
                      className="click_div jupyter2_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/jupyter2.png"
                      className="jupyter animate__animated animate__bounceIn"
                      onClick={jupyterClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="jupyter-title animate__animated animate__bounceIn">
                      목성
                    </p>
                  </>
                )}

                {/* 토성 saturn 흑백 */}
                {saturn === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/saturn.png"
                      className="saturn animate__animated animate__heartBeat"
                    />
                    <p className="saturn-title">토성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={saturnClick}
                      className="click_div saturn_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/saturn.png"
                      className="saturn animate__animated animate__bounceIn"
                      onClick={saturnClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="saturn-title animate__animated animate__bounceIn">
                      토성
                    </p>
                  </>
                )}

                {/* 천왕성 uranus 흑백 */}
                {uranus === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/uranus.png"
                      className="uranus animate__animated animate__heartBeat"
                    />
                    <p className="uranus-title">천왕성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={uranusClick}
                      className="click_div uranus_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/uranus.png"
                      className="uranus animate__animated animate__bounceIn"
                      onClick={uranusClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="uranus-title animate__animated animate__bounceIn">
                      천왕성
                    </p>
                  </>
                )}

                {/* 해왕성 neptune 흑백 */}
                {neptune === true ? (
                  <>
                    <img
                      alt=""
                      src="/assets/universe/neptune.png"
                      className="neptune animate__animated animate__heartBeat"
                    />
                    <p className="neptune-title">해왕성</p>
                  </>
                ) : (
                  <>
                    <div
                      onClick={neptuneClick}
                      className="click_div neptune_click_div"
                    ></div>
                    <img
                      alt=""
                      src="/assets/universe/neptune.png"
                      className="neptune animate__animated animate__bounceIn"
                      onClick={neptuneClick}
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <p className="neptune-title animate__animated animate__bounceIn">
                      해왕성
                    </p>
                  </>
                )}

                <img
                  alt=""
                  src="/assets/universe/background.png"
                  className="universe-background "
                />
              </>
            ) : (
              <></>
            )}

            {planetCount === 8 ? (
              <>
                {/* 외계인 등장 */}
                <div>
                  <AlienNextStage id="AlienNextStage" />
                </div>
                {/* 외계인 말풍선 등장 */}
                <div
                  className="universe_next_stage_text_box"
                  id="universe_next_stage_text_box"
                >
                  <div>
                    훌륭하군 <span style={{ color: "pink" }}>친구</span>!
                  </div>
                  <div className="mt-custom">
                    태양계 행성들의{" "}
                    <span style={{ color: "lightcoral" }}>색</span>을 다시 찾아
                    주어{" "}
                  </div>
                  <div className="mt-custom">
                    밝게 <span style={{ color: "crimson" }}>빛</span>나기
                    시작했어!
                  </div>
                  <div className="mt-custom">
                    바로 다음 <span style={{ color: "hotpink" }}>장소</span>로
                    가보자고!
                  </div>
                </div>

                {/* <button
                  className="gamestart animate__animated animate__bounceIn"
                  onClick={() => {
                    setPlanetCount(planetCount + 1);
                  }}
                >
                  게임 시작
                </button> */}
                <img
                  alt=""
                  src="/assets/universe/mercury.png"
                  className="mercury animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/venus.png"
                  className="venus animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/earth.png"
                  className="earth animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/mars.png"
                  className="mars animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/jupyter2.png"
                  className="jupyter animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/saturn.png"
                  className="saturn animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/uranus.png"
                  className="uranus animate__animated animate__bounceOut"
                />
                <img
                  alt=""
                  src="/assets/universe/neptune.png"
                  className="neptune animate__animated animate__bounceOut"
                />

                <img
                  alt=""
                  src="/assets/universe/background.png"
                  className="universe-background animate__animated animate__fadeOut"
                />

                <p className="mercury-title animate__animated animate__bounceOut">
                  수성
                </p>
                <p className="venus-title animate__animated animate__bounceOut">
                  금성
                </p>
                <p className="earth-title animate__animated animate__bounceOut">
                  지구
                </p>
                <p className="mars-title animate__animated animate__bounceOut">
                  화성
                </p>
                <p className="jupyter-title animate__animated animate__bounceOut">
                  목성
                </p>
                <p className="saturn-title animate__animated animate__bounceOut">
                  토성
                </p>
                <p className="uranus-title animate__animated animate__bounceOut">
                  천왕성
                </p>
                <p className="neptune-title animate__animated animate__bounceOut">
                  해왕성
                </p>

                <img
                  id="universe_ufo_img"
                  alt=""
                  src="/assets/universe/UFO.png"
                  className="move_down_up ufo animate__animated animate__fadeInRight"
                ></img>
              </>
            ) : (
              <>
                <div id="planet_touch_text_1">
                  <h2 className="planetH2" id="planet_touch_text_1">
                    <span style={{ color: "red" }}>태양계</span>의{" "}
                    <span style={{ color: "yellow" }}>행성</span>들이{" "}
                    <span style={{ color: "gray" }}>빛</span>을 잃었어!
                  </h2>
                  <h2 className="planetH2" style={{ top: "17%" }}>
                    <span style={{ color: "aquamarine" }}>터치</span>해서{" "}
                    <span style={{ color: "palegoldenrod" }}>빛</span>을 찾아줘!
                  </h2>
                </div>

                <h2
                  id="planet_touch_text_2"
                  className="planetH2 move_down_up"
                  style={{ display: "none" }}
                >
                  <span style={{ color: "red" }}>태양계</span>{" "}
                  <span style={{ color: "yellow" }}>행성</span>들을
                  <span style={{ color: "aquamarine" }}> 터치</span>해보세요!
                </h2>
              </>
            )}
          </>
        ) : (
          <>
            {/* 만약 행성을 다 클릭하면???? 이제 게임으로 넘어갑니다. */}
            <UniverseGame></UniverseGame>
          </>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="home-button"
        >
          돌아가기
        </button>

        {/* 우주 배경 구현 */}
        <Canvas className="universe-canvas">
          <OrbitControls />
          <Stars />
        </Canvas>
      </div>
    </>
  );
};

export default Universe;
