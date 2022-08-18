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
import { ENDPOINT } from "../util/nodeConfig";

const Universe = () => {
  const [nowClickPlanet, setNowClickPlanet] = useState("수성");

  // 클릭할때마다 행성의 클릭 다음순서를 변경한다.
  const changeClickPlanetOrder = (pre, next, planetName) => {
    document.getElementsByClassName(`${pre}`)[0].classList.remove("click_div");
    document.getElementsByClassName(`${next}`)[0].classList.add("click_div");

    setNowClickPlanet(planetName);
  };
  useEffect(() => {
    planetStartAudio.play();

    return () => {
      Howler.stop();
    };
  }, []);

  useEffect(() => {
    //웹소캣 io 통신하기

    const planetTouchObject = document.getElementsByClassName("click_div")[0];
    const planetTouchObjectClass =
      document.getElementsByClassName("click_div")[0]?.classList[0];
    const planetTouchObjectRect = planetTouchObject?.getClientRects()[0];
    console.log(planetTouchObjectRect);
    const socket = socketIOClient(ENDPOINT);
    console.log(planetTouchObject?.classList[0]);

    let y = "0";
    let isLoadingTime = false;
    socket.on("chat message", (data) => {
      console.log(data);
      if (data.split(" ")[0] != 2) {
        y = data.split(" ")[2] - 100;
      } else {
        y = data.split(" ")[2];
      }
      //x값 세팅
      if (!isLoadingTime) {
        if (data.split(" ")[0] == 1) {
          if (
            (planetTouchObjectClass === "mercury_click_div" &&
              planetTouchObjectRect.y <= y &&
              planetTouchObjectRect.y + planetTouchObjectRect.height >= y) ||
            (planetTouchObjectClass === "venus_click_div" &&
              planetTouchObjectRect.y <= y &&
              planetTouchObjectRect.y + planetTouchObjectRect.height >= y)
          ) {
            isLoadingTime = true;
            planetTouchObject.click();
            setTimeout(() => {
              isLoadingTime = false;
            }, 1000);
          }
        } else if (data.split(" ")[0] == 2) {
          if (
            (planetTouchObjectClass === "mars_click_div" &&
              100 <= y &&
              1000 >= y) ||
            (planetTouchObjectClass === "earth_click_div" &&
              100 <= y &&
              1000 >= y)
          ) {
            isLoadingTime = true;
            planetTouchObject.click();
            setTimeout(() => {
              isLoadingTime = false;
            }, 1000);
          }
        } else if (data.split(" ")[0] == 3) {
          if (
            (planetTouchObjectClass === "jupyter2_click_div" &&
              500 <= y &&
              1020 >= y) ||
            (planetTouchObjectClass === "saturn_click_div" &&
              planetTouchObjectRect.y <= y &&
              planetTouchObjectRect.y + planetTouchObjectRect.height >= y)
          ) {
            isLoadingTime = true;
            planetTouchObject.click();
            setTimeout(() => {
              isLoadingTime = false;
            }, 1000);
          }
        } else if (data.split(" ")[0] == 4) {
          if (
            (planetTouchObjectClass === "uranus_click_div" &&
              planetTouchObjectRect.y <= y &&
              planetTouchObjectRect.y + planetTouchObjectRect.height >= y) ||
            (planetTouchObjectClass === "neptune_click_div" &&
              planetTouchObjectRect.y <= y &&
              planetTouchObjectRect.y + planetTouchObjectRect.height >= y)
          ) {
            isLoadingTime = true;
            planetTouchObject.click();
            setTimeout(() => {
              isLoadingTime = false;
            }, 1000);
          }
        }
      }
    });
  }, [nowClickPlanet]);

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
      // document
      //   .getElementsByClassName("mercury_click_div")[0]
      //   .classList.add("click_div");
      // setNowClickPlanet("수성");
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
    changeClickPlanetOrder("mercury_click_div", "mars_click_div", "화성");
  };

  // 금성(venus) 클릭
  const [venus, setVenus] = useState(false);
  const venusClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setVenus(!venus);
    clickPlanet();
    changeClickPlanetOrder("venus_click_div", "earth_click_div", "지구");
  };

  // 지구(earth) 클릭
  const [earth, setEarth] = useState(false);
  const earthClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setEarth(!earth);
    clickPlanet();
    changeClickPlanetOrder("earth_click_div", "saturn_click_div", "토성");
  };

  // 화성(mars) 클릭
  const [mars, setMars] = useState(false);
  const marsClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setMars(!mars);
    clickPlanet();
    changeClickPlanetOrder("mars_click_div", "jupyter2_click_div", "목성");
  };

  // 목성(jupyter) 클릭
  const [jupyter, setJupyter] = useState(false);
  const jupyterClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setJupyter(!jupyter);
    clickPlanet();
    changeClickPlanetOrder("jupyter2_click_div", "neptune_click_div", "해왕성");
  };

  // 토성(Saturn) 클릭
  const [saturn, setSaturn] = useState(false);
  const saturnClick = () => {
    const planetAudio = new Audio("/assets/audio/universe/touchPlanet.mp4");
    planetAudio.play();
    setSaturn(!saturn);
    clickPlanet();
    changeClickPlanetOrder("saturn_click_div", "uranus_click_div", "천왕성");
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
    changeClickPlanetOrder("neptune_click_div", "venus_click_div", "금성");
  };

  document.documentElement.style.setProperty("--animate-duration", "2s");
  const navigate = useNavigate();

  return (
    <>
      <div className="universe">
        <iframe
          title="배경음악"
          src="/assets/audio/universe/universe.mp3"
          allow="autoplay;"
          className="audio"
        ></iframe>

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
                      className="mercury_click_div click_div"
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
                    <div onClick={venusClick} className="venus_click_div"></div>

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
                    <div onClick={earthClick} className="earth_click_div"></div>
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
                    <div onClick={marsClick} className="mars_click_div"></div>
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
                      className="jupyter2_click_div"
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
                      className="saturn_click_div"
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
                      className="uranus_click_div"
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
                      className="neptune_click_div"
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
                  {/* <div>
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
                  </div> */}
                  <div className="mt-custom">훌륭하군 친구!</div>
                  <div className="mt-custom">
                    태양계 행성들의 색을 다시 찾아주어
                  </div>
                  <div className="mt-custom">
                    밝게 &nbsp;
                    <span style={{ color: "gold" }}>빛</span>이 나기 시작했어!
                  </div>
                  <div className="mt-custom">바로 다음 장소로 가보자고!</div>
                  <img
                    src="/assets/universe/map.png"
                    alt=""
                    className="universe-map"
                  />
                </div>

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
                    <span style={{ color: "gold" }}>태양계</span>의{" "}
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
                  {/* <span style={{ color: "gold" }}>태양계</span>{" "} */}
                  <span style={{ color: "yellow" }}>{nowClickPlanet}</span>을
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

        <img
          src="/assets/map/minimap.png"
          alt=""
          className="minimap"
          onClick={() => (window.location.href = "/")}
        />

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
