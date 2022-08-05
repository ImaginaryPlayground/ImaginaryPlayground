import "../../css/universe.css"

import { useState, useRef } from 'react'

const UniverseGame = ()=> {
    
    const [ totalTrash, setTotalTrash ] = useState(0)
    console.log('토탈 카운트가 지금 ',totalTrash)

    const [ nowStage, setNowStage ] = useState('paper')

    const clickPaper = (e) =>{
        console.log(e.target.id)
        document.getElementById(e.target.id).style.display = 'none'
        if(totalTrash <= 3) {
            setTotalTrash(totalTrash+1)
            console.log('페이퍼')
        } else {
            console.log('페이퍼 차례 아님')
            setNowStage('plastic')
        }
    }

    const clickPlastic =() => {
        if (3 < totalTrash && totalTrash < 8) {
            setTotalTrash(totalTrash+1)
            console.log('플라스틱')
        } else if (totalTrash <=3 ){
            console.log('아직 플라스틱 아님')
        } else {
            console.log('플라스틱 끝남')
            setNowStage('plastic')
        }
    }

    const clickMetal =()=> {
        if (7 < totalTrash && totalTrash < 12) {
            setTotalTrash(totalTrash+1)
            console.log('캔')
        } else if (totalTrash <= 7) {
            console.log('아직 캔 아님')
        } else {
            console.log('캔 끝남 === 게임 끝남')
            setNowStage('plastic')
        }
    }

    
    return(<div style={{position:"relative"}}>
            {totalTrash <= 3 ? (<>
                <h2 className="universegame-title">종이 쓰레기를 버려주세요</h2>
            </>) : (<></>)}

            <img src="/assets/universe/paper.png" className="paper1" onClick={clickPaper} id={'paper1'}></img>
            <img src="/assets/universe/paper.png" className="paper2" onClick={clickPaper} id={'paper2'}></img>
            <img src="/assets/universe/paper.png" className="paper3" onClick={clickPaper} id={'paper3'}></img>
            <img src="/assets/universe/paper.png" className="paper4" onClick={clickPaper} id={'paper4'}></img>

            {(totalTrash === 0)? (<><img src="/assets/universe/paperBin.png" className="paperbin" /></>):(<></>)}
            {(totalTrash === 1)? (<><img src="/assets/universe/paperBin1.png" className="paperbin" /></>):(<></>)}
            {(totalTrash === 2)? (<><img src="/assets/universe/paperBin2.png" className="paperbin" /></>):(<></>)}
            {(totalTrash === 3)? (<><img src="/assets/universe/paperBin3.png" className="paperbin" /></>):(<></>)}
            {(totalTrash >= 4)? (<><img src="/assets/universe/paperBin4.png" className="paperbin" /></>):(<></>)}

            {3< totalTrash && totalTrash < 8? (<>
                <h2 className="universegame-title">플라스틱 쓰레기를 버려주세요</h2>
            </>) : (<></>)}
            <img src="/assets/universe/plastic.png" className="plastic1" onClick={clickPlastic} id={'plastic1'}/>
            <img src="/assets/universe/plastic.png" className="plastic2" onClick={clickPlastic} id={'plastic2'}/>
            <img src="/assets/universe/plastic.png" className="plastic3" onClick={clickPlastic} id={'plastic3'}/>
            <img src="/assets/universe/plastic.png" className="plastic4" onClick={clickPlastic} id={'plastic4'}/>

            {(totalTrash <= 4)? (<><img src="/assets/universe/plasticBin.png" className="plasticbin" /></>):(<></>)}
            {(totalTrash === 5)? (<><img src="/assets/universe/plasticBin1.png" className="plasticbin" /></>):(<></>)}
            {(totalTrash === 6)? (<><img src="/assets/universe/plasticBin2.png" className="plasticbin" /></>):(<></>)}
            {(totalTrash === 7)? (<><img src="/assets/universe/plasticBin3.png" className="plasticbin" /></>):(<></>)}
            {(totalTrash >= 8)? (<><img src="/assets/universe/plasticBin4.png" className="plasticbin" /></>):(<></>)}

            {7< totalTrash && totalTrash <12 ? (<>
                <h2 className="universegame-title">캔 쓰레기를 버려주세요</h2>
            </>) : (<></>)}

            <img src="/assets/universe/can.png" className="metal1" onClick={clickMetal} id={'metal1'} />
            <img src="/assets/universe/can.png" className="metal2" onClick={clickMetal} id={'metal2'} />
            <img src="/assets/universe/can.png" className="metal3" onClick={clickMetal} id={'metal3'} />
            <img src="/assets/universe/can.png" className="metal4" onClick={clickMetal} id={'metal4'} />

            {(totalTrash <= 8)? (<><img src="/assets/universe/glassBin.png" className="metalbin" /></>):(<></>)}
            {(totalTrash === 9)? (<><img src="/assets/universe/metalBin1.png" className="metalbin" /></>):(<></>)}
            {(totalTrash === 10)? (<><img src="/assets/universe/metalBin2.png" className="metalbin" /></>):(<></>)}
            {(totalTrash === 11)? (<><img src="/assets/universe/metalBin3.png" className="metalbin" /></>):(<></>)}
            {(totalTrash === 12)? (<><img src="/assets/universe/metalBin4.png" className="metalbin" /></>):(<></>)}

    </div>)
}

export default UniverseGame