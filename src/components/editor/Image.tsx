import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PivotControls, Center, calcPosFromAngles, TransformControls } from '@react-three/drei'
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three'
import { events, ThreeElements, useFrame, ThreeEvent, useThree } from '@react-three/fiber'
import { useGesture, useDrag } from '@use-gesture/react'
import { randFloat } from 'three/src/math/MathUtils.js';


const Image: React.FC<{
    index: number,
    spawnPosition: THREE.Vector3,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>,
    pivotEnabled: boolean,
    enableThisPivot: (arg0: number, arg1: boolean) => void,
    sessionStorageKey: string,
    spawnLookAtPoint: THREE.Vector3,
    spawnNormal: THREE.Vector3,
    distanceFromWall: number
}> = ({ index, spawnPosition, editorState, setEditorState, pivotEnabled, enableThisPivot, sessionStorageKey, spawnLookAtPoint, spawnNormal, distanceFromWall }) => {

    const [isDragging, setIsDragging] = useState<boolean>(false); // is the gizmo currently being interacted with?
    const [position, setPosition] = useState<Vector3>(spawnPosition);
    const [scale, setScale] = useState<Vector3>(new Vector3(1, 1, 1));

    const groupRef = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const raycasterRef = useRef<THREE.Raycaster>(null!);

    const { camera, scene } = useThree();

    useEffect(() => {
        // position and rotate image correctly
        if (groupRef.current) {
            setPosition(new Vector3(spawnPosition.x, spawnPosition.y, spawnPosition.z));
            groupRef.current.lookAt(spawnLookAtPoint);
        }

        // create materials and geometry
        if (meshRef.current) {

            const material = new THREE.MeshStandardMaterial({ side: DoubleSide });

            const img = document.createElement('img');
            const texture = new THREE.Texture(img);
            img.onload = function () {
                texture.needsUpdate = true;

                material.map = texture;
                meshRef.current.material = material;

                meshRef.current.visible = true;

                const imageWidth = texture.image.width;
                const imageHeight = texture.image.height;
                const largerSide = Math.max(imageWidth, imageHeight);
                const scaledWidth = imageWidth / largerSide;
                const scaledHeight = imageHeight / largerSide;

                meshRef.current.geometry = new THREE.PlaneGeometry(scaledWidth, scaledHeight);

            };
            img.src = (sessionStorage.getItem(sessionStorageKey) || '');
        }
    }, []);

    function handleImageClick() {
        let newEnabled = false
        if (pivotEnabled) {
            if (isDragging) newEnabled = true;
        } else {
            newEnabled = true;
        }
        enableThisPivot(index, newEnabled);
    }

    const bind = useDrag(({ active, movement: [x, y], timeStamp, event }) => {
        if (active) {
            if (editorState !== 'edit' && pivotEnabled) {
                setEditorState('edit');
            }
            if (pivotEnabled) {
                const threeEvent = event as unknown as ThreeEvent<MouseEvent>;  
                if(raycasterRef.current){
                    raycasterRef.current.set(threeEvent.ray.origin, threeEvent.ray.direction);

                    const intersects = raycasterRef.current.intersectObjects( scene.children, true );
                    for (const intersect of intersects) {
                        if(intersect.object.name === 'scene') {
                            const point = intersect.point.clone();
                            if(intersect.face){
                                const normal = intersect.face?.normal.clone();
                                const normalClone = normal.clone();
                                setPosition(point.add(normal.multiplyScalar(distanceFromWall)));
                                const newLookAt = intersect.point.clone();
                                newLookAt.add(normalClone.multiplyScalar(10));
                                if(groupRef.current){
                                    groupRef.current.lookAt(newLookAt);
                                }


                            }
                            return;
                        }
                    }

                    // SET ROTATION!
                }
            }
        } else {
            setEditorState('navigate')
        }
    })

    return (
        <>
        <group ref={groupRef} position={position}>
            <mesh
                scale={scale}
                {...bind()}
                ref={meshRef}
                onClick={() => handleImageClick()}
            >
            </mesh>
            {pivotEnabled && 
                <mesh scale={0.1}>
                    <boxGeometry />
                    <meshPhongMaterial color={'red'} />
                </mesh>
            }
        </group>
        <raycaster ref={raycasterRef} />
        </>
    )
}

export default Image

