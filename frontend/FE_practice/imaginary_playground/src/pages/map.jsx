import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dolphin from "../components/ocean/Dolphin";
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
      <button
        onClick={() => navigate("/jungle")}
        style={{ backgroundColor: "green" }}
        className="jungle-button"
      >
        정글맵
      </button>
      <button
        onClick={() => navigate("/jungle-intro")}
        style={{ background: "yellow" }}
        className="jungle-intro-button"

      >
        정글 인트로
      </button>
      <button
        onClick={() => navigate("/ocean")}
        style={{ backgroundColor: "blue" }}
        className="ocean-button"

      >
        언더더씨
      </button>
      <button
        onClick={() => navigate("/ocean-intro")}
        style={{ backgroundColor: "skyblue" }}
        className="ocean-real-button"

      >
        언더더씨최적화
      </button>
      <button
        onClick={() => navigate("/universe-intro")}
        style={{ backgroundColor: "yellowgreen" }}
        className="universe-intro-button"
        
      >
        우주 인트로
      </button>
      <button
        onClick={() => navigate("/universe")}
        style={{ backgroundColor: "gray" }}
        className="universe-button"

      >
        우주
      </button>
      {/* <img src="/assets/map/leaf.png" alt="" className="map-leaf"/>
      <img src="/assets/map/bubble.png" alt="" className="map-bubble"/> */}
      <img src="/assets/map/jungle.png" alt="" className="jungle-island" />

      <img src="/assets/map/cloud1.png" alt="" className="cloud1"/>
      <img src="/assets/map/cloud2.png" alt="" className="cloud2"/>
      <img src="/assets/map/cloud3.png" alt="" className="cloud3"/>
      <img src="/assets/map/cloud4.png" alt="" className="cloud4"/>

      <img src="/assets/map/island.png" alt="" className="island" />
      <img src="/assets/map/background.png" alt=""  className="map-background"/>
    </div>
  );
};

export default Map;
