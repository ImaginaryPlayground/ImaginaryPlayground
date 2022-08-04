import ".././css/universe.css"

import * as THREE from '../three';
import {Stars, OrbitControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber';

import {useState, useRef } from 'react'

const Universe =() => {
    
    // 원래 채도가 떨어져 있다가 클릭하면 채도가 돌아온다.
    const [mercury, setMercury] = useState(false)
    const mercuryClick = () => {
        setMercury(!mercury)
        if (mercury === true) {
            console.log('dd')
        }
    }

    return (
        <>
            <div className="universe">
                <img src="/assets/universe/neptune.png" className="neptune" />
                <img src="/assets/universe/uranus.png" className="uranus" />
                <img src="/assets/universe/saturn.png" className="saturn" />
                <img src="/assets/universe/jupyter.png" className="jupyter" />
                <img src="/assets/universe/mars.png" className="mars" />
                <img src="/assets/universe/earth.png" className="earth" />
                <img src="/assets/universe/venus.png" className="venus" />

                {mercury === true? (<>
                    <img src="/assets/universe/mercury.png" className="mercury" 
                        onClick={mercuryClick} 
                    />
                </>) : (
                    <img src="/assets/universe/mercury.png" className="mercury" 
                    onClick={mercuryClick} style={{color: 'hsla(0,0%,100%,1)'}}
                    ></img>
                )}
                <Canvas className="universe-canvas">
                    <OrbitControls/>
                    <Stars />
                </Canvas>
            </div>
        </>
    )
}

export default Universe