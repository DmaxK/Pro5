import React, { SetStateAction, useState, Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { randFloat } from 'three/src/math/MathUtils.js';
import { Canvas, ThreeEvent } from '@react-three/fiber';

import POI from './POI.js';
import Camera from './Camera.js';
import Image from './Image.js'
import PreviewImage from './PreviewImage.js';

import Noon from './lighting/noon.js';
import Goldenhour from './lighting/golden-hour.js';
import Midnight from './lighting/midnight.js';
import { Scene1 } from './Scenes/Scene_1_comp.js';
import { TestMesh } from './Scenes/TestMeshes.js';
import {Scene1_2} from './Scenes/scene_1_80mb-processed.js';

import '../../styles/editor/Scene3D.scss';

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
        <>
            <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <boxBufferGeometry attach="geometry" args={[25, 25]} />
                <meshLambertMaterial attach="material" color="LightSlateGrey" />
            </mesh>
            <TestMesh />
        </>
    );
}


const Scene3D: React.FC<{
    editorState: string,
    setEditorState: React.Dispatch<SetStateAction<string>>,
    selectedImageKey: string,
    lighting: string,
    POIsEnabled: boolean,
    scene: string
}> = ({ editorState, setEditorState, selectedImageKey, lighting, POIsEnabled, scene }) => {

    const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 2, 0));
    const [cameraRotation, setCameraRotation] = useState<Vector3>(new Vector3(0, 2, 0));

    interface ImageData {
        id: string;
        position: Vector3;
        pivotEnabled: boolean;
        sessionStorageKey: string;
        spawnLookAtPoint: Vector3;
        spawnNormal: Vector3;
        distanceFromWall: number;
    }

    const [images, setImages] = useState<Array<ImageData>>([]);

    const outlineRef = useRef<THREE.Mesh>(null);

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

        console.log(e.intersections[0].object.name)
        if (e.intersections[0].object.name === 'scene') {
            disableAllPivots();
            const intersection = e.intersections[0];
            if (intersection.face) {
                const newPosition = intersection.point.clone();
                const lookAt = intersection.point.clone();
                const normal = intersection.face.normal.clone();
                const normalClone = normal.clone();
                const d = randFloat(0.01, 0.02);
                newPosition.add(normalClone.multiplyScalar(d));
                lookAt.add(normalClone.multiplyScalar(50));
                const newID = (newPosition.x * newPosition.y).toString();

                const newImage = {
                    id: newID,
                    position: newPosition,
                    pivotEnabled: false,
                    sessionStorageKey: selectedImageKey,
                    spawnLookAtPoint: lookAt,
                    spawnNormal: normal,
                    distanceFromWall: d,
                }

                setImages([...images, newImage]);
                // const temp = [...images];
                // temp.unshift(newImage);
                // setImages(temp);
            }
        }
    }

    const deleteImage = (thisIndex: number) => {
        // const temp = [...images]
        // temp.splice(thisIndex, 1);
        // setImages(temp);

        setImages([
            ...images.slice(0, thisIndex),
            ...images.slice(thisIndex + 1)
          ]);

    }

    const printVector = (text: string, v: Vector3) => {
        console.log(text + ' = \n ' + v.x + '\n ' + v.y + '\n ' + v.z + '\n ');
    }

    const handleSceneClicked = (e: ThreeEvent<MouseEvent>) => {
        if (editorState === 'place') {
            addImage(e);
            setEditorState('navigate');
        }
    }

    /*
    <mesh castShadow name='scene' position={[0, 2, -4]} scale={[3, 3, 3]} onClick={(e) => handleSceneClicked(e)}>
                        <boxGeometry />
                        <meshStandardMaterial color='grey' />
                    </mesh> 
                    <mesh castShadow receiveShadow position={[0, 1, -4]} scale={[5, 5, 5]} rotation={[-90,0,0]}>
                        <planeGeometry/>
                        <meshStandardMaterial color='grey' />
                    </mesh>
                    */



    return (
        <div className="scene3D">
            <Canvas shadows >
                <Suspense fallback={null}>
                    <Camera cameraPosition={cameraPosition} cameraLookAt={cameraRotation} editorState={editorState} scene={scene} />
                    {scene == 'scene1' &&
                        <>
                            <Scene1 />
                        </>
                    }
                    {scene == 'scene2' &&
                        <>
                            <Scene1_2 />
                        </>
                    }
                    {scene == 'scene3' &&
                        <>
                            <Plane />
                        </>
                    }
                    {POIsEnabled &&
                        <group>
                            <POI
                                position={new Vector3(4, 0, 1)}
                                lookAt={new Vector3(4.05, 0, 1.05)}
                                setCameraPosition={setCameraPosition}
                                setCameraRotation={setCameraRotation}
                            />
                        </group>
                    }
                    {lighting == 'noon' &&
                        <>
                            <Noon />
                        </>
                    }
                    {lighting == 'goldenHour' &&
                        <>
                            <Goldenhour />
                        </>
                    }
                    {lighting == 'midnight' &&
                        <>
                            <Midnight />
                        </>
                    }

                    {images.map((image, i) => (
                        <Image
                            key={image.id}
                            index={i}
                            spawnPosition={image.position}
                            editorState={editorState}
                            setEditorState={setEditorState}
                            pivotEnabled={image.pivotEnabled}
                            enableThisPivot={enableThisPivot}
                            sessionStorageKey={image.sessionStorageKey}
                            spawnLookAtPoint={image.spawnLookAtPoint}
                            spawnNormal={image.spawnNormal}
                            distanceFromWall={image.distanceFromWall}
                            deleteImage={deleteImage} 
                            setCameraPosition={setCameraPosition}
                            setCameraRotation={setCameraRotation}/>
                    ))}
                    <PreviewImage
                        // enabled={true}
                        enabled={editorState === 'place'}
                        selectedImageKey={selectedImageKey}
                    />


                    {/* <EffectComposer multisampling={8} autoClear={false}>
                        <Outline
                            selection={outlineRef}
                            selectionLayer={10}
                            visibleEdgeColor={0xf88dd5}
                            edgeStrength={2}
                            blur={true}
                        />
                    </EffectComposer> */}

                    <mesh castShadow name='scene' position={[-2, 2, -2.5]} scale={1} onClick={(e) => handleSceneClicked(e)}>
                        <sphereGeometry />
                        <meshPhongMaterial color='grey' flatShading={true} />
                    </mesh>
                    <mesh castShadow name='scene' position={[0, 2, -3]} scale={2} onClick={(e) => handleSceneClicked(e)}>
                        <sphereGeometry />
                        <meshPhongMaterial color='grey' flatShading={true} />
                    </mesh>

                    {/* <mesh ref={outlineRef} castShadow name='scene' position={[0, 2, -1]} scale={2} >
                        <planeGeometry />
                        <meshPhongMaterial color='grey' flatShading={true} />
                    </mesh> */}


                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
