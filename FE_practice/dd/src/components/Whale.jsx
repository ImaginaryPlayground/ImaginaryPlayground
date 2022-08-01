import React, { useRef, useEffect, useState } from "react";
// import { useGLTF } from "@react-three/drei/useGLTF";
// import { useAnimations } from "@react-three/drei/useAnimations";
// import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from '../three/examples/jsm/loaders/GLTFLoader'
import * as THREE from '../three'
import Ocean from "../Ocean";

export const GltfWhale = ()=> {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50, // 앞뒤로 줌인줌아웃
        window.innerWidth/window.innerHeight,
        0.5,
        100
    );
    camera.position.set(0,0,0); // Set position like this
    camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

    scene.add(camera)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // const lloader = new THREE.TextureLoader();
    // const backgroundTexture = lloader.load('/assets/pic.png');
    // scene.background = backgroundTexture;

    const loader = new GLTFLoader();
    let obj;
    loader.load("/assets/Whale.gltf", function(gltf){
        obj = gltf.scene
        obj.position.set(10,5,-10)
        scene.add(gltf.scene);


        let mixer = new THREE.AnimationMixer(obj)
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'Swim')
        const action = mixer.clipAction(clip)
        action.play()

        // console.log(clips)
    })

    const clock = new THREE.Clock();
    const delta = clock.getDelta();
    // mixer.update(delta);




    // 애니메이션 들어가는 클립
    // const clips = gltf.animations;
    // const clip = THREE.AnimationClip.findByName(clips, 'Swim')
    // const action = obj.clipAction(clip)
    // action.play()
    // const clock = new THREE.Clock();

    // console.log('dd')

    // scene.background = new THREE.Color('#2ecc71')

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
    scene.add(light)

    // / 좌우/ 위아래/ 앞뒤
    camera.position.set(0,0,30)

    // let mixer;
    // loader.load("/assets/shark.gltf", function(gltf) {
    //     const model = gltf.scene;
    //     scene.add(model)
    //     mixer = new THREE.AnimationMixer(model)
    //     const clips = gltf.animations;
    //     const clip = THREE.AnimationClip.findByName(clips, 'Swim')
    //     const action = mixer.clipAction(clip)
    //     action.play()
    //     //clips.play()
    // }, undefined, function(error) {
    //     console.log(error)
    // }
    // )
    // const clock = new THREE.Clock();

    // 실행함수
    function animate() {
        requestAnimationFrame(animate)
        // obj.rotation.y += 0.003
        // model.rotation.y += 0.003
        // mixer.update(clock.getDelta())
        // obj.update()
        // obj.update(clock.getDelta())

        // mixer.update()
        renderer.render(scene, camera);
    }
    animate();




        // const raycaster = new THREE.Raycaster();
        // const pointer = new THREE.Vector2();
        
        // function onPointerMove( event ) {
        
        //     // calculate pointer position in normalized device coordinates
        //     // (-1 to +1) for both components
        
        //     pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        //     pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        // }

        // function render() {

        //     // update the picking ray with the camera and pointer position
        //     raycaster.setFromCamera( pointer, camera );
        
        //     // calculate objects intersecting the picking ray
        //     const intersects = raycaster.intersectObjects( scene.children );
        //     console.log('dd')

        
        //     for ( let i = 0; i < intersects.length; i ++ ) {
        
        //         intersects[ i ].object.material.color.set( 0xff0000 );
        
        //     }
        
        //     renderer.render( scene, camera );
        
        // }
        
        // window.addEventListener( 'pointermove', onPointerMove );
        
        // window.requestAnimationFrame(render);

}


const Whale =() => {
    // const [isClickOne, setIsClickOne] = useState(false)
    // const [countOne, setCountOne] = useState(0)
    // const toggleOne=() => {
    //     setCountOne(countOne + 1)
    //     if (countOne >= 4) {
    //         setIsClickOne(!isClickOne)
    //     }
    // }
    // const sharkOne =() => {toggleOne()}
return (
    <>

        <GltfWhale ></GltfWhale>
    </>
)
}

export default Whale;