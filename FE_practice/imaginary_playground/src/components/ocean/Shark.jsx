import * as THREE from '../../three';
import {OrbitControls} from '../../three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../../three/examples/jsm/loaders/GLTFLoader.js';

export const SharkglTF =({ countTwo, countOne, countThree, countFour}) => {

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
        59, // 앞뒤로 줌인줌아웃
        window.innerWidth/window.innerHeight,
        0.1,
        100
    );
    
    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
    scene.add(light)
    

    // 궤도 추적
    // const orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.update();

    // 좌우 / 위아래 / 앞뒤
    camera.position.set(5, 6, 30);

    const assetLoader = new GLTFLoader();
    
    // 왼쪽에서 두 번째 상어
    let mixer1;
    assetLoader.load('/assets/ocean/sharkTest.gltf', function(gltf) {
        const model = gltf.scene;
        // gltf.scene.scale.set(0.9, 0.9, 0.9); 
        gltf.scene.scale.multiplyScalar(4); 
        model.position.set(-7,5,10)
        scene.add(model);
        
        if (countOne.countOne >= 4) {
            scene.remove(model)
        }

        mixer1 = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
     
        const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction')
        const action = mixer1.clipAction(clip)
        action.play()
    
    },
    undefined, function(error) {
        console.error(error);
    });
    
    // 왼쪽에서 세 번째 상어
    let mixer2;

    assetLoader.load('/assets/ocean/sharkTest.gltf', function(gltf) {
        const model2 = gltf.scene;
        model2.position.set(13,-1,10)
        gltf.scene.scale.multiplyScalar(4); 
        scene.add(model2);

        if (countTwo.countTwo >= 4) {
            scene.remove(model2)
        }

        mixer2 = new THREE.AnimationMixer(model2);
        const clips = gltf.animations;
     
        const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction')
        const action = mixer2.clipAction(clip)
        action.play()
    
    }, undefined, function(error) {
        console.error(error);
    });


    // 왼쪽에서 네 번째 상어
    let mixer3;
    assetLoader.load('/assets/ocean/sharkTest.gltf', function(gltf) {
        const model3 = gltf.scene;
        model3.position.set(15,7,15)
        gltf.scene.scale.multiplyScalar(4); 
        scene.add(model3);

        if (countThree.countThree >= 4) {
            scene.remove(model3)
        }

        mixer3 = new THREE.AnimationMixer(model3);
        const clips = gltf.animations;
     
        const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction')
        const action = mixer3.clipAction(clip)
        action.play()
    }, undefined, function(error) {
        console.error(error);
    });

    // 왼쪽에서 첫 번째 상어
    let mixer4;
    assetLoader.load('/assets/ocean/sharkTest.gltf', function(gltf) {
        const model4 = gltf.scene;
        model4.position.set(-5,-3,10)
        gltf.scene.scale.multiplyScalar(4); 
        scene.add(model4);

        if (countFour.countFour >= 4) {
            scene.remove(model4)
        }
        mixer4 = new THREE.AnimationMixer(model4);
        const clips = gltf.animations;
     
        const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction')
        const action = mixer4.clipAction(clip)
        action.play()
    
    }, undefined, function(error) {
        console.error(error);
    });

    const clock1 = new THREE.Clock();
    const clock2 = new THREE.Clock();
    const clock3 = new THREE.Clock();
    const clock4 = new THREE.Clock();

    function animate() {
        if(mixer1)
            mixer1.update(clock1.getDelta());
        if(mixer2)
            mixer2.update(clock2.getDelta());
        if(mixer3)
            mixer3.update(clock3.getDelta());
        if(mixer4)
            mixer4.update(clock4.getDelta());
        
        renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

    
    window.addEventListener('resize',onResize,false)
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    
    }

const Shark =({countOne, countTwo, countThree, countFour, totalCount})=>{
    var cnvs = document.querySelectorAll('Canvas')
    var arr = Array.prototype.slice.call(cnvs);

    // if (arr.length >= 3) {
        arr.forEach(function(element, idx) {
        if (idx <= arr.length -2) {
            // console.log(idx)
            element.style.display = 'none'
        }
      })
    // }

    return (
        <>
            <SharkglTF countOne={{countOne}} countTwo={{countTwo}} countThree={{countThree}} countFour={{countFour}}></SharkglTF>
        </>
    )
}

export default Shark;