import { Cloud, Environment, Sky, Stars } from '@react-three/drei';
import React from 'react';

const Midnight = () => {
  return (
    <>
        <directionalLight color={"#e0f2ff"} castShadow={true} position={[40, 80, -6]} intensity={0.1}>
         <orthographicCamera attach={"shadow-camera"} args={[-30,30,30,-30]}/>
        </directionalLight>
        <Environment files="./images/nightsky1.hdr" background/>
        <hemisphereLight color={"#e0f2ff"} intensity={0.03}/>
       </>
  )
}

export default Midnight;