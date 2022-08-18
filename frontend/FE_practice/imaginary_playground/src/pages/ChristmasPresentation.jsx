import "../css/christmas.css";
import "../css/christmasPresentation.css";
import Tree from "../components/christmas/tree.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import { config } from "../util/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const ChristmasPresentation = () => {
  const [kidsData, setKidsData] = useState([]);
  const [nowRecognitionPerson, setNowRecognitionPerson] = useState("");
  const loginUserDataReducer = useSelector(
    (state) => state.loginUserDataReducer
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== "true") {
      //만약 로그인 되어있지 않으면 three.js 캐릭터들 모두 삭제 후 로그인 페이지로 이동
      alert("크리스마스 맵은 로그인이 필요합니다!");
      navigate("/login");
    } else {
      axios({
        url: `${config.api}/user/care/lookup/all`,
        method: "POST",
        headers: {
          Auth: sessionStorage.getItem("token"),
        }, //헤더에 토큰
        data: {
          name: "",
          age_1: 1,
          age_2: 20,
          gender: "A",
          page: 0,
          hospital_id: loginUserDataReducer?.hospital_id,
        },
      })
        .then((res) => {
          //전체 데이터를 배열로 반환(아이 이미지)
          console.log(res);
          if (res.data.status === "SUCCESS") {
            //받은 데이터들 입력(전체 데이터 수도 같이 준다)
            setKidsData(res.data.data);
          } else {
            console.log("데이터를 가져오는 데서 오류가 발생했습니다.!");
            alert("다시 로그인 해주세요!");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("서버와 통신에러");
        });
    }
  }, []);

  useEffect(() => {
    const socket = io("http://192.168.100.221:3001");
    setTimeout(() => {
      socket.emit("faceOn");
      socket.on("face", (info) => {
        let nowPerson = [];

        for (let key in info) {
          switch (info[key]) {
            case "ksh":
              nowPerson.push("권성호");
              break;
            case "iys":
              nowPerson.push("임영선");
              break;
            case "psj":
              nowPerson.push("박소정");
              break;
            case "yys":
              nowPerson.push("양요셉");
              break;
            case "ksr":
              nowPerson.push("김성령");
              break;
            case "yjh":
              nowPerson.push("유지홍");
              break;
            default:
              break;
          }
        }

        console.log(nowPerson);
        setNowRecognitionPerson(nowPerson.join(", "));
        const kidBoxes = document.getElementsByClassName("kid_box");

        for (let index = 0; index < kidBoxes.length; index++) {
          const kid_box = kidBoxes[index];
          kid_box.classList.remove("scale_different");
          kid_box.classList.remove("bg_aqua");
          kid_box.classList.remove("bg_violet");
          kid_box.classList.remove("bg_green");
          kid_box.classList.remove("bg_yello");
          kid_box.classList.remove("bg_orange");
          kid_box.classList.remove("bg_crimson");

          if (nowPerson.includes(kid_box.childNodes[1].innerText)) {
            kid_box.classList.add("scale_different");

            switch (kid_box.classList[0]) {
              case "kid_box_1":
                kid_box.classList.add("bg_crimson");
                break;
              case "kid_box_2":
                kid_box.classList.add("bg_aqua");

                break;
              case "kid_box_3":
                kid_box.classList.add("bg_yello");

                break;
              case "kid_box_4":
                kid_box.classList.add("bg_orange");

                break;
              case "kid_box_5":
                kid_box.classList.add("bg_green");

                break;
              case "kid_box_6":
                kid_box.classList.add("bg_violet");

                break;
              default:
                break;
            }
          }
        }
      });
    }, 1000);

    return () => {
      socket.emit("faceOff");
    };
  }, []);

  return (
    <div className="christmas ChristmasPresentation ">
      <>
        <div className="kid_box_1 animate__animated animate__tada kid_box">
          <div className="img_box ">
            <img src={`https://${kidsData[0]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[0]?.name}
          </div>
          <div className="kid_text ">{kidsData[0]?.character}</div>
        </div>
        <div className="kid_box_2 animate__animated animate__tada kid_box">
          <div className="img_box">
            <img src={`https://${kidsData[1]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[1]?.name}
          </div>
          <div className="kid_text">{kidsData[1]?.character}</div>
        </div>
        <div className="kid_box_3 animate__animated animate__tada kid_box">
          <div className="img_box">
            <img src={`https://${kidsData[2]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[2]?.name}
          </div>
          <div className="kid_text">{kidsData[2]?.character}</div>
        </div>
        <div className="kid_box_4 animate__animated animate__tada kid_box bg_black">
          <div className="img_box">
            <img src={`https://${kidsData[3]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[3]?.name}
          </div>
          <div className="kid_text">{kidsData[3]?.character}</div>
        </div>
        <div className="kid_box_5 animate__animated animate__tada kid_box">
          <div className="img_box">
            <img src={`https://${kidsData[4]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[4]?.name}
          </div>
          <div className="kid_text">{kidsData[4]?.character}</div>
        </div>
        <div className="kid_box_6 animate__animated animate__tada kid_box">
          <div className="img_box">
            <img src={`https://${kidsData[5]?.profile}`} alt="" />
          </div>
          <div style={{ textAlign: "end", marginBottom: "10px" }}>
            {kidsData[5]?.name}
          </div>
          <div className="kid_text">{kidsData[5]?.character}</div>
        </div>
        <img
          src="/assets/christmas/rope.png"
          alt=""
          className="rope animate__animated animate__pulse"
          style={{ top: "10%" }}
        />
        <img
          src="/assets/christmas/color.png"
          alt=""
          className="color animate__animated animate__pulse"
          id="christmasPresentation_color"
        />
      </>

      <div className="now_recognition_text">
        현재 인식된 사람:{" "}
        <span
          className="now_recognition_name"
          style={nowRecognitionPerson.length ? { padding: "20px" } : {}}
        >
          {nowRecognitionPerson}
        </span>
      </div>

      {/* <Tree id={'tree'}></Tree> */}
      {/* 크리스마스 트리 */}
      <img src="/assets/christmas/star.png" alt="" className="tree-star" />
      <img src="/assets/christmas/ornament.png" alt="" className="ornament" />
      <img src="/assets/christmas/tree.png" alt="" className="christmastree" />
      <img src="/assets/christmas/hill.png" alt="" className="christmashill" />
      <img src="/assets/christmas/rudolph.png" alt="" className="rudolph" />
      <img
        src="/assets/christmas/background.png"
        alt=""
        className="christmas-background"
      />
      {/* 배경 */}
      <div className="snow"></div>
      <img
        src="/assets/map/minimap.png"
        alt=""
        className="minimap"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  );
};

export default ChristmasPresentation;
