import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

  function Model() {
    const group = useRef()
    const { nodes, materials } = useGLTF('/scene.gltf')
    useFrame(() => (group.current.rotation.y += 0.01)) //이 곳!
    return (
      <group ref={group} dispose={null} scale={0.007}>
        <group position={[0, 0.02, 0]} rotation={[0, 1, Math.PI]}>
          <group rotation={[Math.PI / 30, 20, 0]}>
            <group position={[0, 100, -19.64]} rotation={[-Math.PI / 1, 0, 30]} scale={10.08}>
              <mesh geometry={nodes.KabzaSusPart2_KabzaSusPart2_0.geometry} material={materials.KabzaSusPart2} />
              <mesh geometry={nodes.KabzaSusPart2_MetalKilic_0.geometry} material={materials.MetalKilic} />
              <mesh geometry={nodes.KabzaSusPart2_KabzaSusPart5_0.geometry} material={materials.KabzaSusPart5} />
              <mesh geometry={nodes.KabzaSusPart2_KabzaSusPart4_0.geometry} material={materials.KabzaSusPart4} />
              <mesh geometry={nodes.KabzaSusPart2_KabzaSusPart3_0.geometry} material={materials.KabzaSusPart3} />
              <mesh geometry={nodes.KabzaSusPart2_KabzaSusPart1_0.geometry} material={materials.KabzaSusPart1} />
              <mesh geometry={nodes.KabzaSusPart2_Kabza_0.geometry} material={materials.Kabza} />
              <mesh geometry={nodes.KabzaSusPart2_EmiKilic_0.geometry} material={materials.EmiKilic} />
            </group>
          </group>
        </group>
      </group>
    )
  }

  export default Model;