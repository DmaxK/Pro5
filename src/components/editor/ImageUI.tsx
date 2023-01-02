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

    const [offset, setOffset] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

    function handleRoughnessChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRoughness(Number(e.target.value) / 100);
    }

    // useEffect(() => {
    //     const temp = new THREE.Vector3(1, 0, 0);
    //     temp.multiplyScalar(scale.x * 0.01);
    //     setOffset(temp);

    // }, [scale]);

    return (
        <group scale={scale} position={position}>
                <Html scale={0.1} rotation={[0, 0, 0]} position={offset} transform >
                    <div className='imageUI'>
                        <div >index: {index}</div>
                        <button onClick={() => (deleteImage(index))} >delete</button>
                        <div>roughness: {roughness} </div>

                        <input type="range" min={0} max={100} onChange={(e) => handleRoughnessChange(e)} />
                    </div>
                </Html>
        </group>
    )
}

export default ImageUI