import React from 'react'
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import '../../styles/editor/ImageDimension.scss';

const ImageDimension: React.FC<{
    text: string,
    position: THREE.Vector3,
    rotation: number,
    scale: THREE.Vector3
}> = ({ text, position, rotation, scale }) => {

    return (
        <group scale={scale} position={position} rotation={[0, 0, rotation]}>
            <group >
                <Html scale={0.1} transform >
                    <div className='imageDimension'>
                        <div>
                            {text}
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    )
}

export default ImageDimension