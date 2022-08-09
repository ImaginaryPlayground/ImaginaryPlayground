import "../../css/universe.css"
import '../../css/UniverseEffect.css'
import UniverseEffect from "./UniverseEffect"

import { useState, useNavigate} from 'react'

const UniverseGame = ()=> {
    
    const [ totalTrash, setTotalTrash ] = useState(0)
    console.log('토탈 카운트가 지금 ',totalTrash)

    const clickPaper = (e) =>{
        console.log(e.target.id)
        if(totalTrash <= 2) {
            setTotalTrash(totalTrash+1)
            const planetAudio = new Audio('/assets/universe/true.mp3')
            planetAudio.play()
            // document.getElementById(e.target.id).style.opacity = '0%'
            document.getElementById('paper1').style.display = 'none'
            console.log('페이퍼')

        } else {
            console.log('페이퍼 차례 아님')
        }
    }

    const clickPlastic =(e) => {
        if (2 < totalTrash && totalTrash < 6) {
            setTotalTrash(totalTrash+1)
            console.log('플라스틱')
            document.getElementById(e.target.id).style.opacity = '0%'
            const planetAudio = new Audio('/assets/universe/true.mp3')
            planetAudio.play()
        } else if (totalTrash <=2 ){
            console.log('아직 플라스틱 아님')
            const planetAudio = new Audio('/assets/universe/false.mp3')
            planetAudio.play()
        } else {
            console.log('플라스틱 끝남')
        }
    }

    const clickMetal =(e)=> {
        if (5 < totalTrash && totalTrash < 9) {
            setTotalTrash(totalTrash+1)
            console.log('캔')
            const planetAudio = new Audio('/assets/universe/true.mp3')
            planetAudio.play()
            document.getElementById(e.target.id).style.display = 'none'
        } else if (totalTrash <= 5) {
            console.log('아직 캔 아님')
            const planetAudio = new Audio('/assets/universe/false.mp3')
            planetAudio.play()
        } else {
            console.log('캔 끝남 === 게임 끝남')
        }
    }
    
    return(<div style={{position:"relative"}}>
            {totalTrash <= 2 ? (<>
                <h2 className="universegame-title">종이 쓰레기를 버려주세요</h2>
            </>) : (<></>)}


            <div id={'paper1'} onClick={clickPaper}>
                <UniverseEffect style={{left:'50vw'}}></UniverseEffect>
                <img src="/assets/universe/paper.png" className="paper1 "></img>
            </div>
            <div>
                {/* <UniverseEffect></UniverseEffect> */}
                <img src="/assets/universe/paper.png" className="paper2" onClick={clickPaper} id={'paper2'}></img>
            </div>
            <img src="/assets/universe/paper.png" className="paper3" onClick={clickPaper} id={'paper3'}></img>
            {/* <img src="/assets/universe/paper.png" className="paper4 " onClick={clickPaper} id={'paper4'}></img> */}
            

            {2< totalTrash && totalTrash < 6? (<>
                <h2 className="universegame-title">플라스틱 쓰레기를 버려주세요</h2>
            </>) : (<></>)}

            <img src="/assets/universe/plastic.png" className="plastic1" onClick={clickPlastic} id={'plastic1'}/>
            <img src="/assets/universe/plastic.png" className="plastic2" onClick={clickPlastic} id={'plastic2'}/>
            <img src="/assets/universe/plastic.png" className="plastic3" onClick={clickPlastic} id={'plastic3'}/>
            {/* <img src="/assets/universe/plastic.png" className="plastic4" onClick={clickPlastic} id={'plastic4'}/> */}



            {5< totalTrash && totalTrash <8 ? (<>
                <h2 className="universegame-title">캔 쓰레기를 버려주세요</h2>
            </>) : (<></>)}

            <img src="/assets/universe/can.png" className="metal1" onClick={clickMetal} id={'metal1'} />
            <img src="/assets/universe/can.png" className="metal2" onClick={clickMetal} id={'metal2'} />
            {/* <img src="/assets/universe/can.png" className="metal3" onClick={clickMetal} id={'metal3'} /> */}
            {/* <img src="/assets/universe/can.png" className="metal4" onClick={clickMetal} id={'metal4'} /> */}


            {/* 게임이 끝이 나면??? */}
            {totalTrash === 8? (<>
                <h2 className="universegame-title">외계인과 하이파이브를 해보세요!</h2>
                <img src="/assets/universe/paperBin3.png" className="paperbin animate__animated animate__fadeOutDown" />
                <img src="/assets/universe/plasticBin3.png" className="plasticbin animate__animated animate__fadeOutDown" />
                <img src="/assets/universe/metalBin3.png" className="metalbin animate__animated animate__fadeOutDown" />

                <img src="/assets/universe/UFO.png " className="ufo animate__animated animate__fadeInRight"


                ></img>

            </>) : (<>
                {/* 게임이 아직 진행 중일때 보여줄 화면(분리수거통) */}
                {(totalTrash === 0)? (<><img src="/assets/universe/paperBin.png" className="paperbin animate__animated animate__fadeInUp" /></>):(<></>)}
                {(totalTrash === 1)? (<><img src="/assets/universe/paperBin1.png" className="paperbin" /></>):(<></>)}
                {(totalTrash === 2)? (<><img src="/assets/universe/paperBin2.png" className="paperbin" /></>):(<></>)}
                {(totalTrash >= 3)? (<><img src="/assets/universe/paperBin3.png" className="paperbin" /></>):(<></>)}
                {/* {(totalTrash >= 4)? (<><img src="/assets/universe/paperBin4.png" className="paperbin" /></>):(<></>)} */}

                {(totalTrash <= 3)? (<><img src="/assets/universe/plasticBin.png" className="plasticbin animate__animated animate__fadeInUp" /></>):(<></>)}
                {(totalTrash === 4)? (<><img src="/assets/universe/plasticBin1.png" className="plasticbin" /></>):(<></>)}
                {(totalTrash === 5)? (<><img src="/assets/universe/plasticBin2.png" className="plasticbin" /></>):(<></>)}
                {(totalTrash >= 6)? (<><img src="/assets/universe/plasticBin3.png" className="plasticbin" /></>):(<></>)}
                {/* {(totalTrash >= 8)? (<><img src="/assets/universe/plasticBin4.png" className="plasticbin" /></>):(<></>)} */}
                
                {(totalTrash <= 6)? (<><img src="/assets/universe/metalBin.png" className="metalbin animate__animated animate__fadeInUp" /></>):(<></>)}
                {(totalTrash === 7)? (<><img src="/assets/universe/metalBin1.png" className="metalbin" /></>):(<></>)}
                {(totalTrash === 8)? (<><img src="/assets/universe/metalBin2.png" className="metalbin" /></>):(<></>)}
                {/* {(totalTrash === 9)? (<><img src="/assets/universe/metalBin3.png" className="metalbin" /></>):(<></>)} */}
                {/* {(totalTrash === 12)? (<><img src="/assets/universe/metalBin4.png" className="metalbin" /></>):(<></>)} */}


            </>)}

    </div>)
}

export default UniverseGame