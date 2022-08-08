import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/map.css";

const Map = () => {
  const navigate = useNavigate();

  // 캔버스 각 맵에서 생성된거 맵에서 없애도록 구현
  useEffect(() => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        element.remove();
      });
    }
  }, []);

  return (
    <div className="Map">
      <h2>요들팀 파이팅!~~!! 여기다가 맵 들어갈거에요</h2>
      <button
        onClick={() => navigate("/jungle")}
        style={{ backgroundColor: "green" }}
      >
        정글맵
      </button>
      <button
        onClick={() => navigate("/ocean")}
        style={{ backgroundColor: "blue" }}
      >
        언더더씨
      </button>
      <button
        onClick={() => navigate("/ocean-copy")}
        style={{ backgroundColor: "skyblue" }}
      >
        언더더씨최적화
      </button>
      <button
        onClick={() => navigate("/universe")}
        style={{ backgroundColor: "gray" }}
      >
        우주
      </button>
      <button
        onClick={() => navigate("/junglebackground")}
        style={{ background: "yellow" }}
      >
        정글배경
      </button>
    </div>
  );
};

export default Map;
