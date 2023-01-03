import React, { useState, useEffect } from 'react'
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import '../../styles/editor/ImageUI.scss';
import trashcan from '../../assets/svgs/trashcan.svg';

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
        setRoughness(1 - (Number(e.target.value) / 100));
    }

    return (
        <group scale={scale} position={position}>
            <Html scale={0.1} transform >
                <div className='imageUI'>
                    <section className='delete' >
                        <div className='deleteWrapper' onClick={() => (deleteImage(index))}>
                            <img src={trashcan} />
                        </div>
                    </section>
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
                                <div className={'toggleWrapper ' + (emissive ? 'enabled' : '')} >
                                    <div className='toggleBG' onClick={() => (setEmissive(!emissive))}>
                                        <div className='toggleKnob' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </Html>
        </group >
    )
}

export default ImageUI