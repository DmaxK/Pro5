import React from 'react'
import { Environment } from '@react-three/drei'


const Goldenhour = () => {
  return (
    <>
        <hemisphereLight color={"#badbf5"} intensity={0.7}/>
        <directionalLight color={"#f5ad6e"} castShadow={true} position={[0, 10, 0]} intensity={2.0}/>
        <Environment files="../../../../public/images/sunset1.jpeg" background />
        </>
  )
}

export default Goldenhour;