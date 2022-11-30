import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import React, { Dispatch, useEffect, useState } from 'react';

const POI: React.FC<{position: Vector3, setCameraPosition: Dispatch<React.SetStateAction<Vector3>>}> = ({position, setCameraPosition}) => {
    return(
    <mesh position={position} scale={[0.5,0.5,0.5]} onClick={() => setCameraPosition(position)}>
        <sphereBufferGeometry attach={"geometry"}/>
        <meshPhongMaterial color={"#F88DD5"} opacity={0.3} emissive={"#F88DD5"} emissiveIntensity={2} transparent />
    </mesh>
    );
}

export default POI;