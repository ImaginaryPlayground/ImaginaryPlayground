import { useNavigate } from "react-router-dom";

const Map = () => {
    const navigate = useNavigate()

    var canvasNode = document.querySelectorAll('canvas')
    var canvas = Array.prototype.slice.call(canvasNode);

    if (canvas) {
        canvas.forEach(function(element) {
            element.style.display = 'none'
            element.remove()
        })
    }

    return (
        <div className="Map">
            <h2>요들팀 파이팅!~~!! 여기다가 맵 들어갈거에요</h2>
            <button onClick={()=> navigate('/jungle')}
                style={{ backgroundColor: "green"}}
            >정글맵</button>
            <button onClick={()=> navigate('/ocean')}
                style={{ backgroundColor: "blue"}}
            >언더더씨</button>
            <button onClick={()=> navigate('/universe')}
                style={{ backgroundColor: "navy"}}
            >우주</button>
            
        </div>
    )
}

export default Map;