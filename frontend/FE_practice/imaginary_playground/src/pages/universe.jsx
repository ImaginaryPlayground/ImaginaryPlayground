import ".././css/universe.css"

import {Stars, OrbitControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber';

import {useState} from 'react'
import UniverseGame from "../components/universe/UniverseGame";
import { useNavigate } from "react-router-dom";

const Universe =() => {
    // 힐링 파트(행성 클릭 이벤트) 횟수 카운트
    const [planetCount, setPlanetCount] = useState(0)
    const clickPlanet = () => {
        setPlanetCount(planetCount+1)
    }

    
    // 수성(mercury) 클릭
    const [mercury, setMercury] = useState(false)
    const mercuryClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setMercury(!mercury)
        clickPlanet()
    }

    // 금성(venus) 클릭
    const [venus, setVenus] = useState(false)
    const venusClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setVenus(!venus)
        clickPlanet()
    }

    // 지구(earth) 클릭
    const [earth, setEarth ] = useState(false)
    const earthClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setEarth(!earth)
        clickPlanet()
    }

    // 화성(mars) 클릭
    const [mars, setMars] = useState(false)
    const marsClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setMars(!mars)
        clickPlanet()
    }

    // 목성(jupyter) 클릭
    const [jupyter, setJupyter] = useState(false)
    const jupyterClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setJupyter(!jupyter)
        clickPlanet()
    }

    // 토성(Saturn) 클릭
    const [saturn, setSaturn] = useState(false)
    const saturnClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setSaturn(!saturn)
        clickPlanet()
    }

    // 천왕성(uranus) 클릭
    const [uranus, setUranus] = useState(false)
    const uranusClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setUranus(!uranus)
        clickPlanet()
    }

    // 해왕성(neptune) 클릭
    const [neptune, setNeptune] = useState(false)
    const neptuneClick = () => {
        const planetAudio = new Audio('/assets/audio/universe/touchPlanet.mp4')
        planetAudio.play()
        setNeptune(!neptune)
        clickPlanet()
    }
    
    document.documentElement.style.setProperty('--animate-duration', '2s');
    const navigate = useNavigate()

    return (
        <>
            <div className="universe">

                {/* <iframe src="/assets/audio/universe/universe.mp3" allow="autoplay;" className="audio"></iframe> */}

            

                {planetCount !== 9? (<>
                
                {planetCount !==8? (<>
                
                {/* 수성 mercury 흑백 */}
                {mercury === true? (<>
                    <img src="/assets/universe/mercury.png" className="mercury animate__animated animate__heartBeat"/>
                    <p className="mercury-title">수성</p>
                </>) : (
                    <>
                        <img src="/assets/universe/mercury.png" className="mercury animate__animated animate__bounceIn" 
                        onClick={mercuryClick} style={{filter:'grayscale(100%)'}}
                        ></img>
                        <p className="mercury-title animate__animated animate__bounceIn">수성</p>
                    </>
                )}

                {/* 금성 venus 흑백 */}
                {venus === true? (<>
                    <img src="/assets/universe/venus.png" className="venus animate__animated animate__heartBeat" />
                    <p className="venus-title">금성</p>
                </>) : (
                    <>
                    <img src="/assets/universe/venus.png" className="venus animate__animated animate__bounceIn" 
                    onClick={venusClick} style={{filter:'grayscale(100%)'}}
                    />
                    <p className="venus-title animate__animated animate__bounceIn">금성</p>
                    </>
                )}

                {/* 지구 earth 흑백 */}
                {earth === true? (<>
                    <img src="/assets/universe/earth.png" className="earth animate__animated animate__heartBeat" />
                    <p className="earth-title">지구</p>
                </>) : (
                    <>
                    <img src="/assets/universe/earth.png" className="earth animate__animated animate__bounceIn" 
                    onClick={earthClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="earth-title animate__animated animate__bounceIn">지구</p>
                    </>
                )}

                {/* 화성 mars 흑백 */}
                {mars === true? (<>
                    <img src="/assets/universe/mars.png" className="mars animate__animated animate__heartBeat" />
                    <p className="mars-title">화성</p>
                </>):(
                    <>
                    <img src="/assets/universe/mars.png" className="mars animate__animated animate__bounceIn" 
                    onClick={marsClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="mars-title animate__animated animate__bounceIn">화성</p>
                    </>
                )}

                {/* 목성 jupyter 흑백 */}
                {jupyter === true? (<>
                    <img src="/assets/universe/jupyter2.png" className="jupyter animate__animated animate__heartBeat" />
                    <p className="jupyter-title">목성</p>
                </>) : (<>
                    <img src="/assets/universe/jupyter2.png" className="jupyter animate__animated animate__bounceIn" 
                    onClick={jupyterClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="jupyter-title animate__animated animate__bounceIn">목성</p>
                </>)}

                {/* 토성 saturn 흑백 */}
                {saturn === true? (<>
                    <img src="/assets/universe/saturn.png" className="saturn animate__animated animate__heartBeat" />
                    <p className="saturn-title">토성</p>
                </>) : (<>
                    <img src="/assets/universe/saturn.png" className="saturn animate__animated animate__bounceIn" 
                    onClick={saturnClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="saturn-title animate__animated animate__bounceIn">토성</p>
                </>)}

                {/* 천왕성 uranus 흑백 */}
                {uranus === true? (<>
                    <img src="/assets/universe/uranus.png" className="uranus animate__animated animate__heartBeat" />
                    <p className="uranus-title">천왕성</p>
                </>) : (<>
                    <img src="/assets/universe/uranus.png" className="uranus animate__animated animate__bounceIn" 
                    onClick={uranusClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="uranus-title animate__animated animate__bounceIn">천왕성</p>
                </>)}

                {/* 해왕성 neptune 흑백 */}
                {neptune === true? (<>
                    <img src="/assets/universe/neptune.png" className="neptune animate__animated animate__heartBeat" />
                    <p className="neptune-title">해왕성</p>
                </>) : (<>
                    <img src="/assets/universe/neptune.png" className="neptune animate__animated animate__bounceIn" 
                    onClick={neptuneClick} style={{filter:'grayscale(100%)'}}/>
                    <p className="neptune-title animate__animated animate__bounceIn">해왕성</p>
                </>)}

                <img src="/assets/universe/background.png" alt="" className="universe-background " />
                </>) :(<></>)}

                
                

                {planetCount === 8? (<>
                <button 
                className="gamestart animate__animated animate__bounceIn"
                onClick={()=>{setPlanetCount(planetCount+1)}}>게임 시작</button>
                    <img src="/assets/universe/mercury.png" className="mercury animate__animated animate__bounceOut"/>
                    <img src="/assets/universe/venus.png" className="venus animate__animated animate__bounceOut" />
                    <img src="/assets/universe/earth.png" className="earth animate__animated animate__bounceOut" />
                    <img src="/assets/universe/mars.png" className="mars animate__animated animate__bounceOut" />
                    <img src="/assets/universe/jupyter2.png" className="jupyter animate__animated animate__bounceOut" />
                    <img src="/assets/universe/saturn.png" className="saturn animate__animated animate__bounceOut" />
                    <img src="/assets/universe/uranus.png" className="uranus animate__animated animate__bounceOut" />
                    <img src="/assets/universe/neptune.png" className="neptune animate__animated animate__bounceOut" />

                    <img src="/assets/universe/background.png" alt="" className="universe-background animate__animated animate__fadeOut" />

                    <p className="mercury-title animate__animated animate__bounceOut">수성</p>
                    <p className="venus-title animate__animated animate__bounceOut">금성</p>
                    <p className="earth-title animate__animated animate__bounceOut">지구</p>
                    <p className="mars-title animate__animated animate__bounceOut">화성</p>
                    <p className="jupyter-title animate__animated animate__bounceOut">목성</p>
                    <p className="saturn-title animate__animated animate__bounceOut">토성</p>
                    <p className="neptune-title animate__animated animate__bounceOut">천왕성</p>
                    <p className="uranus-title animate__animated animate__bounceOut">해왕성</p>


                    <img src="/assets/universe/UFO.png" className="ufo animate__animated animate__fadeInRight"></img>
                </>) : (<>
                <h2 className="planetH2">태양계 행성을 터치해보세요!</h2>
                </>)}
                </>) : (<>
                
                {/* 만약 행성을 다 클릭하면???? 이제 게임으로 넘어갑니다. */}
                    <UniverseGame></UniverseGame>
                </>)}

                <button onClick={()=> navigate('/')}
            className="home-button"
            >돌아가기</button>


                {/* 우주 배경 구현 */}
                <Canvas className="universe-canvas">
                    <OrbitControls/>
                    <Stars />
                </Canvas>
            </div>
        </>
    )
}

export default Universe