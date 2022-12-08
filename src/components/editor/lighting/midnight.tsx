import React from 'react'
import { Environment, Cloud, Stars, Sky } from '@react-three/drei'

const Midnight = () => {
  return (
    <>
        <directionalLight color={"#e0f2ff"} castShadow={true} position={[2, 4, 1.5]} intensity={0.05}/>
        <Environment files="../../../../public/images/nightsky1.hdr" background/>
       </>
  )
}

export default Midnight;