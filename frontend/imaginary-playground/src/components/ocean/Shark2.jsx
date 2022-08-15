import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef } from "react";

export const Whale22 = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    120, // 앞뒤로 줌인줌아웃
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
  scene.add(light);

  // renderer.setClearColor(0xA3A3A3);

  const orbit = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 10, 10);
  orbit.update();

  // const grid = new THREE.GridHelper(30, 30);
  // scene.add(grid);

  const assetLoader = new GLTFLoader();

  let mixer;
  assetLoader.load(
    "/assets/ocean/Whale2.gltf",
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "Swim");
      const action = mixer.clipAction(clip);
      action.play();

      // console.log(clips)
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const clock = new THREE.Clock();
  function animate() {
    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

const Whale2 = ({ countOne }) => {
  var cnvs = document.getElementsByClassName("whale2");
  var cnvs1 = document.getElementsByName("whale2");
  const whale2 = useRef();
  console.log(cnvs);
  console.log(cnvs1);
  // console.log(countOne)
  if (countOne === 5) {
    console.log(whale2);
  }
  // if (cnvs.length >= 5) {
  //   cnvs.forEach(function(element) {
  //     element.style.display = 'none'
  //     // console.log(element)
  //   })
  // }
  return (
    <>
      <Whale22></Whale22>
    </>
  );
};

export default Whale2;
