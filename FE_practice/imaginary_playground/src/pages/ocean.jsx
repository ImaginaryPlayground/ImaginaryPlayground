import React,{ useState} from "react"
import { useNavigate } from "react-router-dom";
import Shark from '../components/ocean/Shark.jsx'
import Whale2 from '../components/ocean/Shark2.jsx'
import { useRef } from 'react';
import * as THREE from '../three';
import {OrbitControls} from '../three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../three/examples/jsm/loaders/GLTFLoader.js';

import "../css/ocean.css"
import { DolphinglTF } from "../components/ocean/Dolphin.jsx";

function Ocean() {
    // 게임 시작하는 게임 지도 구현
    const [start, setStart ] = useState(false)
    const startGame = ()=> {
        setStart(!start)
        const mapMusic = new Audio('/assets/ocean/map.mp3')
        mapMusic.play()
    }


    const [totalCount, totalCountSet] = useState(0)

    // 첫번째 상어
    const [isClickOne, setIsClickOne] = useState(false)
    const [countOne, setCountOne] = useState(0)
    const toggleOne=() => {
        setCountOne(countOne + 1)
        totalCountSet(totalCount + 1)

        // 클릭하면 나오는 버블 효과음
        const bubbleAudio = new Audio('/assets/ocean/bubble.mp4')
        bubbleAudio.play()
        if (countOne >= 4) {
            setIsClickOne(!isClickOne)
        }
    }

    // 두번째 상어
    const [isClickTwo, setIsClickTwo] = useState(false)
    const [countTwo, setCountTwo] = useState(0)
    const toggleTwo=() => {
        setCountTwo(countTwo + 1)
        totalCountSet(totalCount + 1)

         // 클릭하면 나오는 버블 효과음
        const bubbleAudio = new Audio('/assets/ocean/bubble.mp4')
        bubbleAudio.play()
        if (countTwo >= 4) {
            setIsClickTwo(!isClickTwo)
        }
    }

    // 세 번째 상어
    const [isClickThree, setIsClickThree] = useState(false)
    const [countThree, setCountThree] = useState(0)
    const toggleThree=() => {
        setCountThree(countThree + 1)
        totalCountSet(totalCount + 1)

         // 클릭하면 나오는 버블 효과음
        const bubbleAudio = new Audio('/assets/ocean/bubble.mp4')
        bubbleAudio.play()
        if (countThree >= 4) {
            setIsClickThree(!isClickThree)
        }
    }

    // 네 번째 상어
    const [isClickFour, setIsClickFour] = useState(false)
    const [countFour, setCountFour] = useState(0)
    const toggleFour=() => {
        setCountFour(countFour + 1)
        totalCountSet(totalCount + 1)

         // 클릭하면 나오는 버블 효과음
        const bubbleAudio = new Audio('/assets/ocean/bubble.mp4')
        bubbleAudio.play()
        if (countFour >= 4) {
            setIsClickFour(!isClickFour)
        }
    }

    const navigate = useNavigate()


    return (
        <div className="ocean">

            <iframe src="/assets/ocean/Calimba.mp3" allow="autoplay;" className="audio"></iframe>
            
            { start? (
            <>
            {totalCount < 20? (
            <h2 className="title">상어를 터치하여 쫓아주세요!</h2>
            ) : (<></>)}
            {/* 왼쪽에서 2번째 상어 */}
            {countOne <= 4? (<div className="Shark2" onClick={toggleOne}></div>) : <></>}
            {/* 왼쪽에서 3번째 상어 */}
            {countTwo <= 4? (<div className="Shark3" onClick={toggleTwo}></div>) : <></>}
            {/* 왼쪽에서 4번째 상어 */}
            {countThree <= 4 ? (<div className="Shark4" onClick={toggleThree}></div>) : <></>}
            {/* 왼쪽에서 1번째 상어 */}
            {countFour <= 4 ? (<div className="Shark1" onClick={toggleFour}></div>) : <></>} 
            
            <Shark  countTwo = {countTwo} 
            countOne = {countOne}
            countThree = {countThree}
            countFour = {countFour}
            totalCount={totalCount}
            // className={{height:"100vw"}}
            ></Shark>     

            {totalCount === 20? (<div>
                <h2 className="title1">게임 끝~</h2>
                <iframe src="/assets/ocean/applaud.mp3" allow="autoplay;" className="audio"></iframe>
                <DolphinglTF></DolphinglTF>
            </div>) : (<></>)}

            <button onClick={()=> navigate('/')}
            className="home-button"
            >돌아가기</button>
            </>
            ) : <>
            <img src="/assets/ocean/map.png" className="map" 
                onClick={startGame}
            /> 
            </> }


            {/* 지금부터 배경 요소 시작 */}
            {/* 양옆 암벽 */}
            <img src="/assets/ocean/cliff1.png" className="cliff1" />
            <img src="/assets/ocean/cliff2.png" className="cliff2" /> 

            {/* 배경 지나가는 물고기 */}
            <img src="/assets/ocean/fish.png" className="fish" /> 
            <img src="/assets/ocean/whale.png" className="whale" /> 
            <img src="/assets/ocean/trashfish.png" className="trashfish" /> 

            {/* 배경 햇빛 */}
            <img src="/assets/ocean/sun1.png" className="sun1" />
            <img src="/assets/ocean/sun2.png" className="sun2" />
            <img src="/assets/ocean/sun3.png" className="sun3" />
            <img src="/assets/ocean/sun4.png" className="sun4" />
            <img src="/assets/ocean/sun5.png" className="sun5" />

            {/* 산호초 */}
            <img src="/assets/ocean/yellow.png" className="yellow" />
            <img src="/assets/ocean/red.png" className="red" />
            <img src="/assets/ocean/rainbow.png" className="rainbow" />
            <img src="/assets/ocean/blueleaf3.png" className="blueleaf3" />
            <img src="/assets/ocean/blueleaf2.png" className="blueleaf2" />
            <img src="/assets/ocean/blueleaf1.png" className="blueleaf1" />
            <img src="/assets/ocean/cucumber.png" className="cucumber" />
            <img src="/assets/ocean/pink.png" className="pink" />
            <img src="/assets/ocean/cactus.png" className="cactus" /> 

            {/* 배경 물방울 */}
            <img src="/assets/ocean/bubble1.png" className="bubble1" />
            <img src="/assets/ocean/bubble2.png" className="bubble2" />
            <img src="/assets/ocean/bubble3.png" className="bubble3" />

            {/* 가장 끝 배경 */}
            <img src="/assets/ocean/background.png" className="background" />
        </div>
    );
    }

export default Ocean;
