import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PivotControls, Center, calcPosFromAngles, TransformControls } from '@react-three/drei'
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useGesture, useDrag } from 'react-use-gesture'


const Image: React.FC<{
    index: number,
    spawnPosition: THREE.Vector3,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>,
    pivotEnabled: boolean,
    enableThisPivot: (arg0: number, arg1: boolean) => void,
    sessionStorageKey: string,
    lookAtPoint: THREE.Vector3,
    normal: THREE.Vector3
}> = ({ index, spawnPosition, editorState, setEditorState, pivotEnabled, enableThisPivot, sessionStorageKey, lookAtPoint, normal }) => {

    const [draggingGizmo, setDraggingGizmo] = useState<boolean>(false); // is the gizmo currently being interacted with?
    const [scale, setScale] = useState<Vector3>(new Vector3(1, 1, 1));
    const [pivotRotation, setPivotRotation] = useState<[number, number, number]>([1,2,3]);

    const pivotRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);

    useEffect(() => {
        // position and rotate image correctly
        if (groupRef.current && pivotRef.current) {
            groupRef.current.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            groupRef.current.lookAt(lookAtPoint);

            // rotate pivot correctly .... bruh 
            const q = new THREE.Quaternion();
            const pivotDirection = new THREE.Vector3();
            pivotRef.current.getWorldDirection(pivotDirection);
            q.setFromUnitVectors(pivotDirection, normal);

            const e = new THREE.Euler();
            e.setFromQuaternion(q);

            setPivotRotation([e.x, e.y, e.z]);
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
            if (draggingGizmo) newEnabled = true;
        } else {
            newEnabled = true;
        }
        enableThisPivot(index, newEnabled);
    }

    function handleSceneClick() {

    }

    const bind = useDrag(({ active, movement: [x, y] }) => {
        if (active) {
            if (editorState != 'edit') {
                setEditorState('edit');
            } else {
                const d = Math.sqrt((x ** 2 + y ** 2)) * 0.03;
                setScale(new Vector3(1 + d, 1 + d, 1 + d));
            }
        } else {
            setEditorState('navigate')
        }
    })

    return (
        <PivotControls
            rotation={pivotRotation}
            ref={pivotRef}
            fixed={false}
            activeAxes={[true, true, false]}
            depthTest={false}
            anchor={[0, 0, 0]}
            scale={pivotEnabled ? 1 : 0}
            onDragStart={() => { setEditorState('edit'); setDraggingGizmo(true) }}
            onDragEnd={() => { setEditorState('navigate'); setDraggingGizmo(false) }}
            axisColors={['red', 'blue', 'purple']}
        >

            <group ref={groupRef}>
                <mesh
                    scale={scale}

                    ref={meshRef}
                    onClick={() => handleImageClick()}
                >
                </mesh>
                {pivotEnabled &&
                    <mesh
                        scale={0.2}
                        {...bind()}
                    >
                        <meshPhongMaterial color={'purple'} />
                        <boxGeometry />
                    </mesh>
                }
            </group>
        </PivotControls>
    )
}

export default Image

