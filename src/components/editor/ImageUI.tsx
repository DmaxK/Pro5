import React, { useState, useEffect } from 'react'
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import '../../styles/editor/ImageUI.scss';

const ImageUI: React.FC<{
    position: THREE.Vector3,
    scale: THREE.Vector3,
    deleteImage: (thisIndex: number) => void,
    index: number,
    roughness: number,
    setRoughness: React.Dispatch<React.SetStateAction<number>>
}> = ({ position, scale, deleteImage, index, roughness, setRoughness }) => {

    function handleRoughnessChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRoughness(Number(e.target.value) / 100);
    }

    return (
        <group scale={scale} position={position}>
                <Html scale={0.1} transform >
                    <div className='imageUI'>
                        <button onClick={() => (deleteImage(index))} >x</button>
                        <input type="range" min={0} max={100} onChange={(e) => handleRoughnessChange(e)} />
                    </div>
                </Html>
        </group>
    )
}

export default ImageUI