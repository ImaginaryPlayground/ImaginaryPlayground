import { useEffect, useRef } from "react";
import ".././css/jungle.css";
import Sample from "../components/jungle/Sample";

const Jungle = () => {
  const order = useRef(0);
  let jungle_box = null;

  useEffect(() => {
    jungle_box = document.getElementById("jungle_box");
    return () => {
      document.getElementsByClassName("whale_3d")[0].remove();
    };
  }, []);

  const onClick = () => {
    //document.getElementById("whale_0").remove();
    console.log(document.getElementById("whale_0"));
    console.log(jungle_box);
    order.current += 1;
    console.log(order.current);
  };
  return (
    <>
      <div className="jungle" id="jungle_box" style={{ height: "100vh" }}>
        <div
          className="whale_box"
          onClick={onClick}
          style={{
            border: "1px solid gray",
            height: "120px",
            width: "330px",
            position: "absolute",
            left: "17%",
            top: "47%",
            zIndex: "1",
          }}
        >
          <Sample order={`whale_${order.current}`}></Sample>
        </div>

        {/* 가장 앞 첫번째 구간 */}
        <img src="/assets/jungle/firstHill.png" alt="" className="firstHill" />
        <img src="/assets/jungle/firstCeil.png" alt="" className="firstCeil" />

        {/* 햇빛 */}
        <img src="/assets/jungle/sun1.png" alt="" className="sun1" />
        <img src="/assets/jungle/sun2.png" alt="" className="sun2" />
        <img src="/assets/jungle/sun3.png" alt="" className="sun3" />

        {/* 두 번째 구간 */}
        <img
          src="/assets/jungle/secondCeil.png"
          alt=""
          className="secondCeil"
        />
        <img
          src="/assets/jungle/secondHill.png"
          alt=""
          className="secondHill"
        />

        {/* 세 번째 구간 */}
        <img src="/assets/jungle/onlyTree.png" alt="" className="onlyTree" />
        <img src="/assets/jungle/bird.png" alt="" className="bird" />
        <img src="/assets/jungle/palmTree.png" alt="" className="palmTree" />

        {/* 배경 */}
        <img
          src="/assets/jungle/background.png"
          alt=""
          className="background"
        />
      </div>
    </>
  );
};

export default Jungle;
