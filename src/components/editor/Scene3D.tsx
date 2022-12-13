import { Canvas, ThreeEvent } from '@react-three/fiber';
import { ImageLoader, Vector3 } from 'three';
import React, { SetStateAction, useState, Suspense } from 'react';
import Model from './demoScene.js';
import POI from './POI.js';
import Camera from './Camera.js';
import Image from './Image.js'
import { DemoScene2 } from './Demo_scene_2_no_texture_compressed.js';
import { StreetSceneCompressed } from './Final_scene_5.js';
import '../../styles/editor/Scene3D.scss';
import { Sky, Cloud, Sparkles } from '@react-three/drei';
import { randFloat } from 'three/src/math/MathUtils.js';

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
    setEditorState: React.Dispatch<SetStateAction<string>>,
    selectedImageKey: string,
    lighting: string,
    POIsEnabled: boolean
}> = ({ editorState, setEditorState, selectedImageKey, lighting, POIsEnabled }) => {

    const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 2, 0));

    interface ImageData {
        position: Vector3;
        pivotEnabled: boolean;
        sessionStorageKey: string;
        lookAtPoint: Vector3;
        normal: Vector3
    }

    const bruh = [
        {
            position: new Vector3(1, 2, 3),
            pivotEnabled: false,
            sessionStorageKey: selectedImageKey,
            lookAtPoint: new Vector3(1, 2, 3),
            normal: new Vector3(1,1,1)
        }
    ]

    const [images, setImages] = useState<Array<ImageData>>(bruh);


    const enableThisPivot = (thisIndex: number, enabled: boolean) => {
        const temp = [...images];
        temp.forEach((image) => image.pivotEnabled = false);
        temp[thisIndex].pivotEnabled = enabled;
        setImages(temp);
    }

    const disableAllPivots = () => {
        const temp = [...images];
        temp.forEach((image) => image.pivotEnabled = false);
        setImages(temp);
    }

    const addImage = (e: ThreeEvent<MouseEvent>) => {
        // console.log(e);
        if (e.intersections[0].object.name === 'scene') {
            disableAllPivots();
            const intersection = e.intersections[0];
            if (intersection.face) {       
                const newPosition = intersection.point.clone();
                const lookAt = intersection.point.clone();
                const normal = intersection.face.normal.clone();
                const normalClone = normal.clone();
                newPosition.add(normalClone.multiplyScalar(randFloat(0.01, 0.05)));
                lookAt.add(normalClone.multiplyScalar(50));
                
                const newImage = {
                    position: newPosition, 
                    pivotEnabled: false,
                    sessionStorageKey: selectedImageKey,
                    lookAtPoint: lookAt,
                    normal: normal
                }

                setImages([...images, newImage]);
            }
        }
    }

    const printVector = (text: string, v: Vector3) => {
        console.log(text + ' = \n ' + v.x + '\n ' + v.y + '\n ' + v.z + '\n ');
    }

    const handleSceneClicked = (e: ThreeEvent<MouseEvent>) => {
        addImage(e);
    }

    return (
        <div className="scene3D">
            <Canvas>
                <Suspense fallback={null}>
                    <Camera cameraPosition={cameraPosition} editorState={editorState} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 15, 10]} angle={0.3} />
                    <directionalLight position={[0, 10, 0]} intensity={1} />
                    <StreetSceneCompressed />
                    {POIsEnabled &&
                        <group>
                            <POI
                                position={new Vector3(4, 2, 1)}
                                setCameraPosition={setCameraPosition}
                            />
                        </group>
                    }

                    {images.map((image, i) => (
                        <Image
                            key={i}
                            index={i}
                            spawnPosition={image.position}
                            editorState={editorState}
                            setEditorState={setEditorState}
                            pivotEnabled={image.pivotEnabled}
                            enableThisPivot={enableThisPivot}
                            sessionStorageKey={image.sessionStorageKey}
                            lookAtPoint={image.lookAtPoint}
                            normal={image.normal} />
                    ))}
                    <mesh name='scene' position={[0, 2, -4]} scale={[3, 3, 3]} onClick={(e) => handleSceneClicked(e)}>
                        <boxGeometry />
                        <meshStandardMaterial color='grey' />
                    </mesh>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
