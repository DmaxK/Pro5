import React from 'react'
import { Environment } from '@react-three/drei'

const Midnight = () => {
  return (
    <>
        <hemisphereLight color={"#badbf5"} intensity={0.0}/>
        <directionalLight color={"#e0f2ff"} castShadow={true} position={[5, 4, 6]} intensity={0.2}/>
        <Environment files="../../../../public/images/nightsky1.hdr" background />
       </>
  )
}

export default Midnight;