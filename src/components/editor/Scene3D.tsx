import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import React, { SetStateAction, useState } from 'react';
import Model from './demoScene.js';
import POI from './POI.js';
import Camera from './Camera.js';
import Image from './Image.js'
import { DemoScene2 } from './Demo_scene_2_no_texture_compressed.js';
import { StreetSceneCompressed } from './Final_scene_5.js';
import '../../styles/editor/Scene3D.scss';
import {Sky, Cloud, Sparkles} from '@react-three/drei';

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

const Scene3D: React.FC<{
    editorState: string,
    setEditorState: React.Dispatch<SetStateAction<string>>
}> = ({ editorState, setEditorState }) => {

    const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 2, 0));

    function handleSceenClick() {

    }

    function missedCanvasHandleState() {
        // handle how the editor state should change when nothing is clicked

    }

    return (
        <div className="scene3D">
            <Canvas>
                <Camera cameraPosition={cameraPosition} editorState={editorState} />
                {/* <Stars /> */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} />
                <directionalLight position={[0, 10, 0]} intensity={1} />
                <StreetSceneCompressed />
                <POI
                    position={new Vector3(1, 2, 1)}
                    setCameraPosition={setCameraPosition}
                />
                <Image
                    spawnPosition={new Vector3(1, 5, 1)}
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </Canvas>
        </div>
    );
};

export default Scene3D;
