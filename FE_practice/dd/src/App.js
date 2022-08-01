import './App.css';
import React, { Suspense, useState, useRef, useEffect } from "react";
import {Canvas} from '@react-three/fiber';
// import {Mesh} from '@react-three/fiber';
import {Stars} from '@react-three/drei'
import {OrbitControls, Environment} from '@react-three/drei';   
// import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader'
import Whale from './components/Whale';
// import * as THREE from 'three'
import Ocean from './Ocean';
import Test from './components/test';
import Whale2 from './components/Whale2.jsx';

function App() {
  const canvasRef = useRef(null)
  const backRef = useRef(null)

  const [isClickOne, setIsClickOne] = useState(false)
  const [countOne, setCountOne] = useState(0)
  const toggleOne=() => {
      setCountOne(countOne + 1)
      if (countOne >= 4) {
          setIsClickOne(!isClickOne)
      }
  }
  console.log(isClickOne)
  const sharkOne =() => {
    toggleOne()
    console.log(isClickOne)
  }


  return (
    <div className='big'>
      {/* <Canvas ref={canvasRef}>
        <OrbitControls/>
        <Stars />
      </Canvas> */}
      {/* <Canvas className='App'>
          <OrbitControls/>
          <Whale className='App'/>
        </Canvas> */}
      {/* <Ocean /> */}

      {/* <Canvas>
        <Suspense fallback={null}>
          <Whale/>
        </Suspense>
      </Canvas> */}
        {!isClickOne? (<h2 onClick={sharkOne}>ddd</h2>) : <></>}
        {/* <Whale></Whale> */}
        {/* <Canvas ref={canvasRef} className="canvasRef" style={{height:'500px'}}>
          <OrbitControls />
          <ambientLight intensity={0.6} />
          <directionalLight intensity={0.5} />
          <Suspense fallback={null}>
            <Whale2></Whale2>
          </Suspense>
        </Canvas> */}
        {/* <Whale onClick={sharkOne}/> */}
        {isClickOne? (<Whale onClick={()=> {console.log('fs')}}/>) : <></>}
        <Ocean ref={backRef}></Ocean>
        {/* <Whale2></Whale2> */}

      {/* <div className='whale1'></div>
      <div className='whale2'></div>
      <div className='whale3'></div>
      <div className='whale4'></div>
      <div className='whale5'></div> */}

      {/* <Whale className='App'/> */}

    {/* <img src='/assets/pic.png' className='pic' onClick={ClickWhale}></img> */}
    </div>
  );
}

export default App;
