/* eslint-disable react/no-unknown-property */
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import '../styles/Editor.css';

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="FireBrick" />
    </mesh>
  );
}

function Plane() {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[20, 20]} />
      <meshLambertMaterial attach="material" color="LightSlateGrey" />
    </mesh>
  );
}

function Editor() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Box />
      <Plane />
    </Canvas>
  );
}

export default Editor;
