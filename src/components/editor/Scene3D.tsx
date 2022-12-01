import { Canvas } from '@react-three/fiber';
import Camera from './Camera.js';
import '../../styles/editor/Scene3D.scss';
import Model from './demoScene.js';
import { DemoScene2 } from './Demo_scene_2_no_texture_compressed.js';
import { StreetSceneCompressed } from './Final_scene_5.js';
import POI from './POI.js';
import Noon from './lighting/noon.js';
import Goldenhour from './lighting/golden-hour.js';
import Midnight from './lighting/midnight.js';
import { AxesHelper, Vector3 } from 'three';
import { useState } from 'react';

function Box() {
  return (
    <mesh castShadow position={[0,2,0]}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="FireBrick" />
    </mesh>
  );
}

function Plane() {
  return (
    <mesh receiveShadow position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial attach="material" color="LightSlateGrey" />
    </mesh>
  );
}

const Scene3D = () => {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0,1,0));
  return (
    <div className="scene3D">
      <Canvas shadows={true}>
        <axesHelper/>
        <Camera cameraPosition={cameraPosition}/>
        {/* <Stars /> */}
        <Midnight/>
        <Plane/>
        <Box/>
        <StreetSceneCompressed />
        <POI position = {new Vector3(1,2,1)} setCameraPosition = {setCameraPosition}/>
      </Canvas>
    </div>
  );
};

export default Scene3D;
