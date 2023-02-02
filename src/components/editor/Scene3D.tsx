import { Canvas, ThreeEvent } from '@react-three/fiber';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import React, { SetStateAction, Suspense, useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { randFloat } from 'three/src/math/MathUtils.js';

import Camera from './Camera.js';
import Image from './Image.js';
import POI from './POI.js';
import PreviewImage from './PreviewImage.js';

import Goldenhour from './lighting/golden-hour.js';
import Midnight from './lighting/midnight.js';
import Noon from './lighting/noon.js';
import { Scene1 } from './Scenes/Scene1.js';
import { Scene2 } from './Scenes/Scene2_new.js';
import { TestMesh } from './Scenes/TestMeshes.js';

import '../../styles/editor/Scene3D.scss';
import Loader from './Loader.js';

function useKeyPress(targetCode: string) {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    function downHandler(e: KeyboardEvent) {
        if (e.code === targetCode) {
            setKeyPressed(true);
        }
    }

    const upHandler = (e: KeyboardEvent) => {
        if (e.code === targetCode) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);
    return keyPressed;
}

const Scene3D: React.FC<{
    editorState: string,
    setEditorState: React.Dispatch<SetStateAction<string>>,
    selectedImageKey: string,
    lighting: string,
    POIsEnabled: boolean,
    scene: string,
    setLoading: React.Dispatch<SetStateAction<boolean>>,
    setLoadObjects: React.Dispatch<SetStateAction<boolean>>
}> = ({ editorState, setEditorState, selectedImageKey, lighting, POIsEnabled, scene, setLoading, setLoadObjects }) => {

    const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 2, 0));
    const [cameraPositionReset, setCameraPositionReset] = useState<Vector3>(new Vector3(0, 2, 0));
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


    useEffect(() => {
        setImages([]);
        setCameraPositionReset(new Vector3(0,2,0));
    },[scene]);

    const POIPositionsScene1:Vector3[][] = [[new Vector3(8.25, 0.1, 0), new Vector3(8.25, 0.09, 0.05)], 
        [new Vector3(6.5, 0.1, 11.2), new Vector3(6.55, 0.09, 11.25)], 
        [new Vector3(22.17, 0.1, 13.5), new Vector3(22.17, 0.09, 13.55)],
        [new Vector3(24.5, 0.1, -9), new Vector3(24.5, 0.08, -9.05)],
        [new Vector3(11.5, 0.1, 11.2), new Vector3(11.55, 0.13, 11.2)],
        [new Vector3(-7.1, 0.1, 7), new Vector3(-7.15, 0.14, 7)], 
        [new Vector3(4.25, 0.1, 5), new Vector3(4.3, 0.09, 4.98)]
    ];
    const POIPositionsScene2:Vector3[][] = [[new Vector3(0, 0, 5.1), new Vector3(-0.01, 0, 5.1)],
        [new Vector3(24, 0, -0.5), new Vector3(24, -0.003, -0.51)],
        [new Vector3(8.5, 0, -0.5), new Vector3(8.505, -0.003, -0.51)],
        [new Vector3(25, 0, 10.6), new Vector3(24.997, 0.001, 10.61)],
        [new Vector3(30.8, 4.3, 8.13), new Vector3(30.801, 4.3003, 8.129)],
        [new Vector3(-1.2, 3.3, 10.75), new Vector3(-1.199, 3.3001, 10.751)]
    ];
    const POIsScene1 = POIPositionsScene1.map(poi => 
        <POI
        key={poi[0].x}
        position={poi[0]}
        lookAt={poi[1]}
        setCameraPosition={setCameraPosition}
        setCameraRotation={setCameraRotation}
        />
    );
    const POIsScene2 = POIPositionsScene2.map(poi => 
        <POI
        key={poi[0].x}
        position={poi[0]}
        lookAt={poi[1]}
        setCameraPosition={setCameraPosition}
        setCameraRotation={setCameraRotation}
        />
    );

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
                const d = randFloat(0.03, 0.05);
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
            }
        }
    }

    const deleteImage = (thisIndex: number) => {
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

    const escapePressed = useKeyPress("Escape");

    useEffect(() => {
        if (escapePressed) {
            if(editorState === 'place'){
                setEditorState('navigate');
            }
            if(editorState === 'navigate'){
                disableAllPivots();
            }
        }
    }, [escapePressed]);

    const handleLoad = () => {
        console.log("Objects loaded!");
        setLoadObjects(false);
    }

    return (
        <div className="scene3D">
            <Canvas shadows dpr={window.devicePixelRatio * 1} onCreated={()=>setLoading(false)} > 
                <Suspense fallback={null}>
                    <Loader handleLoad={handleLoad} />
                    <Camera cameraPosition={cameraPosition} cameraLookAt={cameraRotation} cameraPositionReset={cameraPositionReset} editorState={editorState} scene={scene} />
                    {scene == 'scene1'&&
                        <>
                            <Scene1 handleSceneClicked={handleSceneClicked}/>
                        </>
                    }
                    {scene == 'scene1' && POIsEnabled &&
                        <>
                        {POIsScene1}
                        </>
                    }
                    {scene == 'scene2' &&
                        <>
                            <Scene2 handleSceneClicked={handleSceneClicked}/>
                        </>
                    }
                    {scene == 'scene2' && POIsEnabled &&
                        <>
                        {POIsScene2}
                        </>
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
                            deleteImage={deleteImage} />
                    ))}
                    <PreviewImage
                        // enabled={true}
                        enabled={editorState === 'place'}
                        selectedImageKey={selectedImageKey}
                    />

                    {/* <mesh castShadow name='scene' position={[-2, 2, -2.5]} scale={1} onClick={(e) => handleSceneClicked(e)}>
                        <sphereGeometry />
                        <meshPhongMaterial color='grey' flatShading={true} />
                    </mesh>
                    <mesh castShadow name='scene' position={[0, 2, -3]} scale={2} onClick={(e) => handleSceneClicked(e)}>
                        <sphereGeometry />
                        <meshPhongMaterial color='grey' flatShading={true} />
                    </mesh> */}

                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
