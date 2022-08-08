import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SampleglTF = ({ id }) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const dom = document.body.appendChild(renderer.domElement);
  dom.setAttribute("id", `${id}`);
  dom.setAttribute("class", "whale_3d");
  dom.style.position = "absolute";
  dom.style.left = "0%";
  dom.style.top = "39%";
  dom.style.zIndex = "-3";
  dom.setAttribute("class", "shark_move");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    100, // 앞뒤로 줌인줌아웃
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
  scene.add(light);

  // 궤도 추적
  // const orbit = new OrbitControls(camera, renderer.domElement);
  // orbit.update();

  // 좌우 / 위아래 / 앞뒤
  camera.position.set(5, 6, 30);

  const assetLoader = new GLTFLoader();

  let mixer1;
  let model;
  assetLoader.load(
    "/assets/ocean/shark1.gltf",
    function (gltf) {
      model = gltf.scene;
      // gltf.scene.scale.set(0.9, 0.9, 0.9);
      // gltf.scene.scale.multiplyScalar(4);
      model.position.set(4, 8, 12);
      scene.add(model);

      mixer1 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const clock1 = new THREE.Clock();
  let left = 0;
  function animate() {
    if (mixer1) mixer1.update(clock1.getDelta());

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
};

const Sample = ({ id }) => {
  return (
    <>
      <SampleglTF id={id}></SampleglTF>
    </>
  );
};

export default React.memo(Sample);
