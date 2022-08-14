import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const DolphinglTF = ({ id }) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const dom = document.body.appendChild(renderer.domElement);
  dom.setAttribute("id", `${id}`);
  // dom.setAttribute("class", "whale_3d");
  dom.style.position = "absolute";
  dom.style.left = "-46%";
  dom.style.top = "38%";
  dom.style.zIndex = "1";
//   dom.setAttribute("class", "map-animal");
  dom.style.scale = "200%";

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    100, // 앞뒤로 줌인줌아웃
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 7);
  scene.add(light);

  // 궤도 추적
  // const orbit = new OrbitControls(camera, renderer.domElement);
  // orbit.update();

  // 좌우 / 위아래 / 앞뒤
  camera.position.set(5, 20, 30);

  const assetLoader = new GLTFLoader();

  let mixer1;
  assetLoader.load(
    "/assets/christmas/tree.gltf",
    function (gltf) {
      const model = gltf.scene;
      // gltf.scene.scale.set(0.9, 0.9, 0.9);
      // gltf.scene.scale.multiplyScalar(4);
      model.position.set(15, 10, 10);
      scene.add(model);

      mixer1 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "metarigAction.001");
      const action = mixer1.clipAction(clip);
      action?.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const clock1 = new THREE.Clock();

  function animate() {
    if (mixer1) mixer1.update(clock1.getDelta());
      renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", onResize, false);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

const Tree = ({ id }) => {
  return (
    <>
      <DolphinglTF id={id}></DolphinglTF>
    </>
  );
};

export default React.memo(Tree);
