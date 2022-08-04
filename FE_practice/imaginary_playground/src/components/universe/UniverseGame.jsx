import "../../css/universe.css"

import { useState } from 'react'

const UniverseGame = ()=> {
    // 전체적인 흐름
    // 플라스틱, 유리, 캔 3개 통이 있고
    // 그에 맞게 각 쓰레기들이 4개씩 있다.
    // 쓰레기들은 우주 배경에 둥둥 떠다닐거고 쓰레기통은 하단에 있음
    // 맞는 쓰레기를 클릭할 때마다 그 쓰레기는 사라지고 쓰레기통에 쓰레기가 점점 쌓여감.
    // 각 쓰레기마다 카운트 4를 세고 4를 채우면 다음 쓰레기로 넘어감
    // 전체 쓰레기 카운트가 12가 되면 게임이 끝난 것으로 간주
    // 플라스틱 시작. if trashCount <4일때 플라스틱을 클릭하면 플라스틱 빈은 +1 될때마다 다른 이미지로 교체되고
    // 클릭된 플라스틱 이미지는 사라지며 count는 +1이 된다.
    // 이렇게 return문 안에서 일일이 코드를 작성해줘야할듯하다.

    const [ totalTrash, setTotalTrash ] = useState(0)
    const clickTrash = () =>{
        setTotalTrash(totalTrash+1)
        console.log(totalTrash)
    }
    
    return(<div style={{position:"relative"}}>
        {totalTrash <= 3? (<>
        <h2 style={{color:"white"}}>종이쓰레기를 잡아라</h2>
            <img src="/assets/universe/paper.png" className="paper1" onClick={clickTrash}></img>
            <img src="/assets/universe/paper.png" className="paper2"></img>
            <img src="/assets/universe/paper.png" className="paper3"></img>
            <img src="/assets/universe/paper.png" className="paper4"></img>

            <img src="/assets/universe/plastic.png" className="plastic1" />
            <img src="/assets/universe/plastic.png" className="plastic2" />
            <img src="/assets/universe/plastic.png" className="plastic3" />
            <img src="/assets/universe/plastic.png" className="plastic4" />
        
        </>):(<></>)}
    </div>)
}

export default UniverseGame