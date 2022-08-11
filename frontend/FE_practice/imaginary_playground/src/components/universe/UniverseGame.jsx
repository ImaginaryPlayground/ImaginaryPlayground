import "../../css/universe.css";
import UniversePaperEffect from "./UniversePaperEffect";
import UniversePlasticEffect from "./UniversePlasticEffect";
import UniverseMetalEffect from "./UniverseMetalEffect";
import { Howl, Howler } from "howler";
import { useEffect, useState } from "react";
import AlienSide from "./AlienSide";
import AlienHiFive from "./AlienHiFive";
import { useNavigate } from "react-router-dom";

const UniverseGame = () => {
  const [totalTrash, setTotalTrash] = useState(0);
  const [isHifive, setIsHifive] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      Howler.stop();
    };
  }, []);

  useEffect(() => {
    if (isHifive === 1) {
      Howler.stop();
      hifiveNice.play();
    } else if (isHifive === 2) {
      Howler.stop();
      hifiveGood.play();
    } else if (isHifive >= 3) {
      document.getElementById("AlienHiFive").setAttribute("class", "disappear");
      setTimeout(() => {
        document.getElementById("AlienHiFive").remove();
        navigate("/universe-outro", { replace: true });
      }, 1000);
    }

    return () => {};
  }, [isHifive]);

  useEffect(() => {
    if (totalTrash === 0) {
      //바로 쓰레기 청소 오디오 시작
      firstPaperAudio.play();
    }
    //플라스틱 쓰레기 차례
    else if (3 === totalTrash) {
      Howler.stop();
      setTimeout(() => {
        secondPlasticAudio.play();
      }, 10);
    } else if (totalTrash === 6) {
      Howler.stop();
      setTimeout(() => {
        thirdCanAudio.play();
      }, 10);
    } else if (totalTrash === 8) {
      Howler.stop();
      document.getElementById("AlienSide").remove();
      setTimeout(() => {
        hifiveCanAudio.play();
      }, 1000);

      //하이파이브 외계인 대사 출력
      setTimeout(() => {
        document.getElementsByClassName(
          "universe_hifive_text_box"
        )[0].style.display = "block";
      }, 2000);

      setTimeout(() => {
        document.getElementById("AlienHiFive").classList.add("move_down_up");
      }, 3000);

      // 하이파이브 터치하라는 박스와 메세지 출력
      setTimeout(() => {
        document.getElementsByClassName("hifive_title_box")[0].style.display =
          "block";

        document.getElementsByClassName(
          "hifive_touch_location"
        )[0].style.display = "block";
      }, 9000);

      //하이파이브가 완료되면 처리될 메서드
    }
    return () => {};
  }, [totalTrash]);

  const hifiveGood = new Howl({
    src: ["/assets/audio/universe/훌륭해.mp3"],
    onend: () => {},
  });

  const hifiveNice = new Howl({
    src: ["/assets/audio/universe/좋아.mp3"],
    onend: () => {},
  });

  const firstPaperAudio = new Howl({
    src: ["/assets/audio/universe/첫번째종이쓰레기치우기.mp3"],
    onend: () => {
      document.getElementsByClassName("universegame-title")[0].style.display =
        "none";
      document.getElementsByClassName("universegame-title")[1].style.display =
        "block";
    },
  });

  const secondPlasticAudio = new Howl({
    src: ["/assets/audio/universe/두번째플라스틱쓰레기차례.mp3"],
    onend: () => {},
  });

  const thirdCanAudio = new Howl({
    src: ["/assets/audio/universe/마지막캔쓰레기치우기.mp3"],
    onend: () => {},
  });

  const hifiveCanAudio = new Howl({
    src: ["/assets/audio/universe/외계인하이파이브음성.mp3"],
    onend: () => {
      document.getElementsByClassName("hifive_title_box")[0].style.display =
        "block";
    },
  });

  console.log("토탈 카운트가 지금 ", totalTrash);

  const clickPaper = (e) => {
    console.log(e.target.id);
    if (totalTrash <= 2) {
      setTotalTrash(totalTrash + 1);
      const planetAudio = new Audio("/assets/universe/true.mp3");
      planetAudio.play();
      document.getElementById(e.target.id).style.opacity = "0%";
      console.log("페이퍼");
    } else {
      console.log("페이퍼 차례 아님");
    }
  };

  const clickPlastic = (e) => {
    if (2 < totalTrash && totalTrash < 6) {
      setTotalTrash(totalTrash + 1);
      console.log("플라스틱");
      document.getElementById(e.target.id).style.opacity = "0%";
      const planetAudio = new Audio("/assets/universe/true.mp3");
      planetAudio.play();
    } else if (totalTrash <= 2) {
      console.log("아직 플라스틱 아님");
      const planetAudio = new Audio("/assets/universe/false.mp3");
      planetAudio.play();
    } else {
      console.log("플라스틱 끝남");
    }
  };

  const clickMetal = (e) => {
    if (5 < totalTrash && totalTrash < 9) {
      setTotalTrash(totalTrash + 1);
      console.log("캔");
      const planetAudio = new Audio("/assets/universe/true.mp3");
      planetAudio.play();
      document.getElementById(e.target.id).style.display = "none";
    } else if (totalTrash <= 5) {
      console.log("아직 캔 아님");
      const planetAudio = new Audio("/assets/universe/false.mp3");
      planetAudio.play();
    } else {
      console.log("캔 끝남 === 게임 끝남");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <AlienSide id="AlienSide" />
      </div>
      {totalTrash <= 2 ? (
        <>
          <h2 className="universegame-title">
            <span style={{ color: "red" }}>쓰레기</span>를 너가{" "}
            <span style={{ color: "aqua" }}>청소</span>해주어야 해!
            <div>
              단, <span style={{ color: "brown" }}>순서</span>가 있으니 잘 따라
              달라구!
            </div>
          </h2>
          <h2 className="universegame-title" style={{ display: "none" }}>
            <span style={{ color: "gray" }}>종이</span> 쓰레기를 버려주세요
          </h2>
        </>
      ) : (
        <></>
      )}

      <div id={"paper1"}>
        {totalTrash <= 2 ? (
          <div className="paper-effect1">
            <UniversePaperEffect></UniversePaperEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/paper.png"
          id={"paper1"}
          className="paper1"
          onClick={clickPaper}
        ></img>
      </div>
      <div id={"paper2"}>
        {totalTrash <= 2 ? (
          <div className="paper-effect2">
            <UniversePaperEffect></UniversePaperEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/paper.png"
          id={"paper2"}
          className="paper2"
          onClick={clickPaper}
        ></img>
      </div>
      <div id={"paper3"}>
        {totalTrash <= 2 ? (
          <div className="paper-effect3">
            <UniversePaperEffect></UniversePaperEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/paper.png"
          id={"paper3"}
          className="paper3"
          onClick={clickPaper}
        ></img>
      </div>
      {/* <img
        alt="" src="/assets/universe/paper.png" className="paper4 " onClick={clickPaper} id={'paper4'}></img> */}

      {2 < totalTrash && totalTrash < 6 ? (
        <>
          <h2 className="universegame-title">
            <span style={{ color: "deepskyblue" }}>플라스틱</span> 쓰레기를
            버려주세요
          </h2>
        </>
      ) : (
        <></>
      )}
      <div id={"plastic1"}>
        {2 < totalTrash && totalTrash < 6 ? (
          <div className="plastic-effect1">
            <UniversePlasticEffect></UniversePlasticEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/plastic.png"
          className="plastic1"
          id={"plastic1"}
          onClick={clickPlastic}
        />
      </div>
      <div id={"plastic2"}>
        {2 < totalTrash && totalTrash < 6 ? (
          <div className="plastic-effect2">
            <UniversePlasticEffect></UniversePlasticEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/plastic.png"
          className="plastic2"
          onClick={clickPlastic}
          id={"plastic2"}
        />
      </div>
      <div id={"plastic3"}>
        {2 < totalTrash && totalTrash < 6 ? (
          <div className="plastic-effect3">
            <UniversePlasticEffect></UniversePlasticEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/plastic.png"
          className="plastic3"
          onClick={clickPlastic}
          id={"plastic3"}
        />
      </div>

      {/* <img
        alt="" src="/assets/universe/plastic.png" className="plastic4" onClick={clickPlastic} id={'plastic4'}/> */}

      {5 < totalTrash && totalTrash < 8 ? (
        <>
          <h2 className="universegame-title">
            <span style={{ color: "red" }}>캔</span> 쓰레기를 버려주세요
          </h2>
        </>
      ) : (
        <></>
      )}
      <div id={"metal1"}>
        {5 < totalTrash && totalTrash < 8 ? (
          <div className="metal-effect1">
            <UniverseMetalEffect></UniverseMetalEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/can.png"
          className="metal1"
          onClick={clickMetal}
          id={"metal1"}
        />
      </div>
      <div id={"metal2"}>
        {5 < totalTrash && totalTrash < 8 ? (
          <div className="metal-effect2">
            <UniverseMetalEffect></UniverseMetalEffect>
          </div>
        ) : (
          <></>
        )}
        <img
          alt=""
          src="/assets/universe/can.png"
          className="metal2"
          onClick={clickMetal}
          id={"metal2"}
        />
      </div>
      {/* <img
        alt="" src="/assets/universe/can.png" className="metal3" onClick={clickMetal} id={'metal3'} /> */}
      {/* <img
        alt="" src="/assets/universe/can.png" className="metal4" onClick={clickMetal} id={'metal4'} /> */}

      {/* 게임이 끝이 나면??? */}
      {totalTrash === 8 ? (
        <>
          {/* 하이파이브 에일리언 로딩 */}
          <div>
            <AlienHiFive id="AlienHiFive" />
          </div>
          {/* 하이파이브 할 위치 나중에 로딩 */}
          <div
            className="hifive_touch_location"
            id="hifive_touch_location"
            onClick={() => {
              setIsHifive(isHifive + 1);
              document.getElementById("hifive_touch_location").style.display =
                "none";

              setTimeout(() => {
                document.getElementById("hifive_touch_location").style.display =
                  "block";
              }, 1200);
            }}
          ></div>

          <div className="hifive_title_box" style={{ display: "none" }}>
            <h2 className="universegame-title ">
              <span style={{ color: "hotpink" }}>외계인</span>과{" "}
              <span style={{ color: "aqua" }}>하이파이브</span>를 해보세요!
            </h2>
            <h2 className="universegame-title-2 text_opacity_chage">
              <span style={{ color: "hotpink" }}>외계인</span>을 터치하세요!
            </h2>
          </div>

          <div className="universe_hifive_text_box" style={{ display: "none" }}>
            <div>
              정말, <span style={{ color: "pink" }}>훌륭해</span>!
            </div>
            <div className="mt-custom">
              덕분에 행성들이
              <span style={{ color: "lightcoral" }}>빛</span>을 찾았고
            </div>
            <div className="mt-custom">
              우주에 있는 <span style={{ color: "hotpink" }}>쓰레기</span>
              들을 청소할 수 있었어!
            </div>
            <div className="mt-custom">
              우리 한번 <span style={{ color: "darkorchid" }}>하이파이브</span>
              할까?
            </div>
            <div className="mt-custom">
              {/* 그럼 나를 <span style={{ color: "violet" }}>터치</span>해줘!! */}
            </div>
          </div>

          <img
            alt=""
            src="/assets/universe/paperBin3.png"
            className="paperbin animate__animated animate__fadeOutDown"
          />
          <img
            alt=""
            src="/assets/universe/plasticBin3.png"
            className="plasticbin animate__animated animate__fadeOutDown"
          />
          <img
            alt=""
            src="/assets/universe/metalBin3.png"
            className="metalbin animate__animated animate__fadeOutDown"
          />

          <img
            alt=""
            src="/assets/universe/UFO.png "
            className="ufo animate__animated animate__fadeInRight"
          ></img>
        </>
      ) : (
        <>
          {/* 게임이 아직 진행 중일때 보여줄 화면(분리수거통) */}
          {totalTrash === 0 ? (
            <>
              <img
                alt=""
                src="/assets/universe/paperBin.png"
                className="paperbin animate__animated animate__fadeInUp"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 1 ? (
            <>
              <img
                alt=""
                src="/assets/universe/paperBin1.png"
                className="paperbin"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 2 ? (
            <>
              <img
                alt=""
                src="/assets/universe/paperBin2.png"
                className="paperbin"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash >= 3 ? (
            <>
              <img
                alt=""
                src="/assets/universe/paperBin3.png"
                className="paperbin"
              />
            </>
          ) : (
            <></>
          )}
          {/* {(totalTrash >= 4)? (<><img
              alt="" src="/assets/universe/paperBin4.png" className="paperbin" /></>):(<></>)} */}

          {totalTrash <= 3 ? (
            <>
              <img
                alt=""
                src="/assets/universe/plasticBin.png"
                className="plasticbin animate__animated animate__fadeInUp"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 4 ? (
            <>
              <img
                alt=""
                src="/assets/universe/plasticBin1.png"
                className="plasticbin"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 5 ? (
            <>
              <img
                alt=""
                src="/assets/universe/plasticBin2.png"
                className="plasticbin"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash >= 6 ? (
            <>
              <img
                alt=""
                src="/assets/universe/plasticBin3.png"
                className="plasticbin"
              />
            </>
          ) : (
            <></>
          )}
          {/* {(totalTrash >= 8)? (<><img
              alt="" src="/assets/universe/plasticBin4.png" className="plasticbin" /></>):(<></>)} */}

          {totalTrash <= 6 ? (
            <>
              <img
                alt=""
                src="/assets/universe/metalBin.png"
                className="metalbin animate__animated animate__fadeInUp"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 7 ? (
            <>
              <img
                alt=""
                src="/assets/universe/metalBin1.png"
                className="metalbin"
              />
            </>
          ) : (
            <></>
          )}
          {totalTrash === 8 ? (
            <>
              <img
                alt=""
                src="/assets/universe/metalBin2.png"
                className="metalbin"
              />
            </>
          ) : (
            <></>
          )}
          {/* {(totalTrash === 9)? (<><img
              alt="" src="/assets/universe/metalBin3.png" className="metalbin" /></>):(<></>)} */}
          {/* {(totalTrash === 12)? (<><img
              alt="" src="/assets/universe/metalBin4.png" className="metalbin" /></>):(<></>)} */}
        </>
      )}
    </div>
  );
};

export default UniverseGame;
