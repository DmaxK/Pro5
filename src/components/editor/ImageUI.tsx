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
    setRoughness: React.Dispatch<React.SetStateAction<number>>,
    emissive: boolean,
    setEmissive: React.Dispatch<React.SetStateAction<boolean>>,
}> = ({ position, scale, deleteImage, index, roughness, setRoughness, emissive, setEmissive }) => {

    function handleRoughnessChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRoughness(Number(e.target.value) / 100);
    }

    return (
        <group scale={scale} position={position}>
            <Html scale={0.1} transform >
            <div className='imageUI'>
                <section className='surfaceFeatures'>
                    <h1>Surface Features</h1>
                    <div className='option'>
                        <div className='title'>Smoothness</div>
                        <div className='content'>
                            <input id='slider' type="range" min={0} max={100} onChange={(e) => handleRoughnessChange(e)} />
                        </div>
                    </div>
                    <div className='option'>
                        <div className='title'>Emissive</div>
                        <div className='content'>
                            {/* <button onClick={() => (setEmissive(!emissive))} >Toggle Emissive</button> */}
                            <input type='checkbox' />
                        </div>
                    </div>
                </section>
                <button onClick={() => (deleteImage(index))} >x</button>

            </div>
        </Html>
        </group >
    )
}

export default ImageUI