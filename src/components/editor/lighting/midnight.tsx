import React from 'react'
import { Environment, Cloud, Stars, Sky } from '@react-three/drei'

const Midnight = () => {
  return (
    <>
        <hemisphereLight color={"#badbf5"} intensity={0.0}/>
        <directionalLight color={"#e0f2ff"} castShadow={true} position={[2, 4, 1.5]} intensity={0.05}/>
        <Environment files="../../../../public/images/nightsky1.hdr" />
        < Sky distance={30000} inclination={1} turbidity={0.1} azimuth={-90} rayleigh={0.017} mieCoefficient={0.005} mieDirectionalG={0.7} sunPosition={[2, 4, 1.5]}/>
        <Cloud position={[40, 50, 20]} speed={0.1} opacity={1} segments={8}  width={30}/>
        <Cloud position={[-35, 35, 30]} speed={0.1} opacity={1} segments={8}  width={40}/>
        <Cloud position={[30, 40, -35]} speed={0.1} opacity={1} segments={8}  width={20}/>
        <Cloud position={[-27, 40, -20]} speed={0.1} opacity={1} segments={8}  width={25}/>
        <Cloud position={[-2, 60, -3]} speed={0.1} opacity={1} segments={8}  width={25}/>
        <Cloud position={[3, 50, 70]} speed={0.1} opacity={1} segments={8}  width={30}/>
        <Cloud position={[-80, 35, 2]} speed={0.1} opacity={1} segments={8}  width={40}/>
        <Cloud position={[75, 40, -4]} speed={0.1} opacity={1} segments={8}  width={20}/>
        <Cloud position={[-3, 40, -85]} speed={0.1} opacity={1} segments={8}  width={25}/>
        <Stars/>
       </>
  )
}

export default Midnight;