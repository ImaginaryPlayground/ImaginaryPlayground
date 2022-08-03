import ".././css/universe.css"

import {Stars, OrbitControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber';

const Universe =() => {
    
    return (
        <>
            <div className="universe">
            <Canvas className="universe-canvas">
                <OrbitControls/>
                <Stars />
            </Canvas>
                <img src="/assets/universe/jupyter.png" className="jupyter" />
                <img src="/assets/universe/mars.png" className="mars" />
                <img src="/assets/universe/earth.png" className="earth" />
                <img src="/assets/universe/venus.png" className="venus" />
                <img src="/assets/universe/mercury.png" className="mercury" />
                <img src="/assets/universe/background.png" className="universe-background" />
            </div>
        </>
    )
}

export default Universe