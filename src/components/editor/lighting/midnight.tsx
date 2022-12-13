import React from 'react'
import { Environment, Cloud, Stars, Sky } from '@react-three/drei'

const Midnight = () => {
  return (
    <>
        <directionalLight color={"#e0f2ff"} castShadow={true} position={[40, 80, -6]} intensity={0.1}>
         <orthographicCamera attach={"shadow-camera"} args={[-30,30,30,-30]}/>
        </directionalLight>
        <Environment files="../../../../public/images/nightsky1.hdr" background/>
        <hemisphereLight color={"#e0f2ff"} intensity={0.03}/>
       </>
  )
}

export default Midnight;