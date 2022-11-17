import React from 'react'
import Model from './demoScene.js';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import '../../styles/editor/Scene3D.css'

function Box() {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="FireBrick" />
        </mesh>
    );
}

function Plane() {
    return (
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[20, 20]} />
            <meshLambertMaterial attach="material" color="LightSlateGrey" />
        </mesh>
    );
}

const Scene3D = () => {
    return (
        <div className='scene3D'>
            <Canvas>
                <OrbitControls /> 
                {/* <Stars /> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} />
                <directionalLight position={[0, 10, 0]} intensity={1} />
                <Box />
                <Model />
                <Plane />
            </Canvas>
        </div>
    )
}

export default Scene3D