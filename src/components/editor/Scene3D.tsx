import { Canvas, ThreeEvent } from '@react-three/fiber';
import { ImageLoader, Vector3 } from 'three';
import React, { SetStateAction, useState, Suspense } from 'react';
import POI from './POI.js';
import Camera from './Camera.js';
import Image from './Image.js'
import '../../styles/editor/Scene3D.scss';
import { randFloat } from 'three/src/math/MathUtils.js';
import Noon from './lighting/noon.js';
import Goldenhour from './lighting/golden-hour.js';
import Midnight from './lighting/midnight.js';
import { Scene1 } from './Scenes/Scene_1_comp.js';

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
    }

    const bruh = [
        {
            position: new Vector3(1, 2, 3),
            pivotEnabled: false,
            sessionStorageKey: selectedImageKey,
            lookAtPoint: new Vector3(1, 2, 3)
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
                newPosition.add(normal.multiplyScalar(randFloat(0.01, 0.05)));
                lookAt.add(normal.multiplyScalar(50));
                
                const newImage = {
                    position: newPosition, 
                    pivotEnabled: false,
                    sessionStorageKey: selectedImageKey,
                    lookAtPoint: lookAt
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
            <Canvas shadows>
                <Suspense fallback={null}>
                    <Camera cameraPosition={cameraPosition} editorState={editorState} />
                    <Scene1/>
                    {POIsEnabled &&
                        <group>
                            <POI
                                position={new Vector3(4, 2, 1)}
                                setCameraPosition={setCameraPosition}
                            />
                        </group>
                    }
                    {lighting == 'noon' &&
                      <>
                      <Noon/>
                      </>
                    }
                    {lighting == 'goldenHour' &&
                      <>
                      <Goldenhour/>
                      </>
                    }
                    {lighting == 'midnight' &&
                      <>
                      <Midnight/>
                      </>
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
                            lookAtPoint={image.lookAtPoint} />
                    ))}
                    <mesh castShadow name='scene' position={[0, 2, -4]} scale={[3, 3, 3]} onClick={(e) => handleSceneClicked(e)}>
                        <boxGeometry />
                        <meshStandardMaterial color='grey' />
                    </mesh> 
                    <mesh castShadow receiveShadow position={[0, 1, -4]} scale={[5, 5, 5]} rotation={[-90,0,0]}>
                        <planeGeometry/>
                        <meshStandardMaterial color='grey' />
                    </mesh>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
