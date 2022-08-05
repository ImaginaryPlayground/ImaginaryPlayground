import ".././css/universe.css"

import * as THREE from '../three';
import {Stars, OrbitControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber';

import {useState} from 'react'
import UniverseGame from "../components/universe/UniverseGame";

const Universe =() => {
    // 힐링 파트(행성 클릭 이벤트) 횟수 카운트
    const [planetCount, setPlanetCount] = useState(0)
    const clickPlanet = () => {
        setPlanetCount(planetCount+1)
    }

    
    // 수성(mercury) 클릭
    const [mercury, setMercury] = useState(false)
    const mercuryClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setMercury(!mercury)
        clickPlanet()
    }

    // 금성(venus) 클릭
    const [venus, setVenus] = useState(false)
    const venusClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setVenus(!venus)
        clickPlanet()
    }

    // 지구(earth) 클릭
    const [earth, setEarth ] = useState(false)
    const earthClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setEarth(!earth)
        clickPlanet()
    }

    // 화성(mars) 클릭
    const [mars, setMars] = useState(false)
    const marsClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setMars(!mars)
        clickPlanet()
    }

    // 목성(jupyter) 클릭
    const [jupyter, setJupyter] = useState(false)
    const jupyterClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setJupyter(!jupyter)
        clickPlanet()
    }

    // 토성(Saturn) 클릭
    const [saturn, setSaturn] = useState(false)
    const saturnClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setSaturn(!saturn)
        clickPlanet()
    }

    // 천왕성(uranus) 클릭
    const [uranus, setUranus] = useState(false)
    const uranusClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setUranus(!uranus)
        clickPlanet()
    }

    // 해왕성(neptune) 클릭
    const [neptune, setNeptune] = useState(false)
    const neptuneClick = () => {
        const planetAudio = new Audio('/assets/universe/touchPlanet.mp4')
        planetAudio.play()
        setNeptune(!neptune)
        clickPlanet()
    }
    
    document.documentElement.style.setProperty('--animate-duration', '2s');

    return (
        <>
            <div className="universe">

                {/* <iframe src="/assets/universe/universe.mp3" allow="autoplay;" className="audio"></iframe> */}

                {planetCount !== 9? (<>
                
                {planetCount !==8? (<>
                
                {/* 수성 mercury 흑백 */}
                {mercury === true? (<>
                    <img src="/assets/universe/mercury.png" className="mercury animate__animated animate__heartBeat"/>
                </>) : (
                    <img src="/assets/universe/mercury.png" className="mercury " 
                    onClick={mercuryClick} style={{filter:'grayscale(100%)'}}
                    ></img>
                )}

                {/* 금성 venus 흑백 */}
                {venus === true? (<>
                    <img src="/assets/universe/venus.png" className="venus animate__animated animate__heartBeat" />
                </>) : (
                    <img src="/assets/universe/venus.png" className="venus" 
                    onClick={venusClick} style={{filter:'grayscale(100%)'}}
                    />
                )}

                {/* 지구 earth 흑백 */}
                {earth === true? (<>
                    <img src="/assets/universe/earth.png" className="earth animate__animated animate__heartBeat" />
                </>) : (
                    <img src="/assets/universe/earth.png" className="earth" 
                    onClick={earthClick} style={{filter:'grayscale(100%)'}}
                    />
                )}

                {/* 화성 mars 흑백 */}
                {mars === true? (<>
                    <img src="/assets/universe/mars.png" className="mars animate__animated animate__heartBeat" />
                </>):(
                    <img src="/assets/universe/mars.png" className="mars" 
                    onClick={marsClick} style={{filter:'grayscale(100%)'}}
                    />
                )}

                {/* 목성 jupyter 흑백 */}
                {jupyter === true? (<>
                    <img src="/assets/universe/jupyter.png" className="jupyter animate__animated animate__heartBeat" />
                </>) : (<>
                    <img src="/assets/universe/jupyter.png" className="jupyter" 
                    onClick={jupyterClick} style={{filter:'grayscale(100%)'}}
                    />
                </>)}

                {/* 토성 saturn 흑백 */}
                {saturn === true? (<>
                    <img src="/assets/universe/saturn.png" className="saturn animate__animated animate__heartBeat" />
                </>) : (<>
                    <img src="/assets/universe/saturn.png" className="saturn" 
                    onClick={saturnClick} style={{filter:'grayscale(100%)'}}
                    />
                </>)}

                {/* 천왕성 uranus 흑백 */}
                {uranus === true? (<>
                    <img src="/assets/universe/uranus.png" className="uranus animate__animated animate__heartBeat" />
                </>) : (<>
                    <img src="/assets/universe/uranus.png" className="uranus" 
                    onClick={uranusClick} style={{filter:'grayscale(100%)'}}
                    />
                </>)}

                {/* 해왕성 neptune 흑백 */}
                {neptune === true? (<>
                    <img src="/assets/universe/neptune.png" className="neptune animate__animated animate__heartBeat" />
                </>) : (<>
                    <img src="/assets/universe/neptune.png" className="neptune" 
                    onClick={neptuneClick} style={{filter:'grayscale(100%)'}}/>
                </>)}
                </>) :(<></>)}

                {planetCount === 8? (<>
                <button 
                className="gamestart"
                onClick={()=>{setPlanetCount(planetCount+1)}}>게임 시작</button>
                    <img src="/assets/universe/mercury.png" className="mercury animate__animated animate__fadeOutUp"/>
                    <img src="/assets/universe/venus.png" className="venus animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/earth.png" className="earth animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/mars.png" className="mars animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/jupyter.png" className="jupyter animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/saturn.png" className="saturn animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/uranus.png" className="uranus animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/neptune.png" className="neptune animate__animated animate__fadeOutUp" />
                    <img src="/assets/universe/UFO.png" className="ufo animate__animated animate__fadeInRight"></img>
                </>) : (<>
                <h2 className="planetH2">태양계 행성을 터치해보세요!</h2>
                </>)}
                </>) : (<>
                
                {/* 만약 행성을 다 클릭하면???? 이제 게임으로 넘어갑니다. */}
                    <UniverseGame></UniverseGame>
                </>)}

                


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