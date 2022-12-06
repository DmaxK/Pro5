import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PivotControls, Center, calcPosFromAngles, TransformControls } from '@react-three/drei'
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three'
import { ThreeElements, useFrame } from '@react-three/fiber'

const Image: React.FC<{
    index: number,
    spawnPosition: THREE.Vector3,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>,
    pivotEnabled: boolean,
    enableThisPivot: (arg0: number, arg1: boolean) => void,
    sessionStorageKey: string,
    lookAtPoint: THREE.Vector3
}> = ({ index, spawnPosition, editorState, setEditorState, pivotEnabled, enableThisPivot, sessionStorageKey, lookAtPoint }) => {

    const [draggingGizmo, setDraggingGizmo] = useState<boolean>(false); // is the gizmo currently being interacted with?

    const centerRef = useRef<THREE.Group>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);

    useEffect(() => {
        // position and rotate image correctly
        if (groupRef.current) {
            groupRef.current.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            groupRef.current.lookAt(lookAtPoint);
        }

        // create materials and geometry
        if (meshRef.current) {

            const material = new THREE.MeshPhongMaterial({ side: DoubleSide });

            const img = document.createElement('img');
            const texture = new THREE.Texture(img);
            img.onload = function () {
                texture.needsUpdate = true;

                material.map = texture;
                meshRef.current.material = material;

                meshRef.current.visible = true;
            };
            img.src = (sessionStorage.getItem(sessionStorageKey) || '');

            //geometry
            // const imageWidth = texture.image.width;
            // const imageHeight = texture.image.height;

            // const largerSide = Math.max(imageWidth, imageHeight);
            // const scaledWidth = imageWidth / largerSide;
            // const scaledHeight = imageHeight / largerSide;
            // console.log(scaledWidth  + ' ' + scaledHeight)

            // const geometry = new THREE.PlaneGeometry(scaledWidth * 2, scaledHeight * 2)
            // meshRef.current.geometry = geometry;



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

    return (
        // <PivotControls
        //     fixed={false}
        //     activeAxes={[true, true, false]}
        //     depthTest={false}
        //     anchor={[0, 0, 0]}
        //     scale={pivotEnabled ? 1 : 0}
        //     onDragStart={() => { setEditorState('edit'); setDraggingGizmo(true) }}
        //     onDragEnd={() => { setEditorState('navigate'); setDraggingGizmo(false) }}>
        //     <Center ref={centerRef} visible={false} top>
        //         <mesh
        //             ref={meshRef}
        //             onClick={() => handleImageClick()}>
        //             <planeGeometry />
        //             {/* <boxGeometry /> */}
        //             {/* <meshStandardMaterial side={THREE.DoubleSide}/> */}
        //         </mesh>
        //         <axesHelper args={[2]} />
        //     </Center>
        // </PivotControls>
        <PivotControls
            fixed={false}
            activeAxes={[true, true, false]}
            depthTest={false}
            anchor={[0, 0, 0]}
            scale={pivotEnabled ? 1 : 0}
            onDragStart={() => { setEditorState('edit'); setDraggingGizmo(true) }}
            onDragEnd={() => { setEditorState('navigate'); setDraggingGizmo(false) }}>
            <group ref={groupRef}>
                <mesh
                    ref={meshRef}
                    onClick={() => handleImageClick()}>
                    <planeGeometry />
                    {/* <boxGeometry /> */}
                    {/* <meshStandardMaterial side={THREE.DoubleSide}/> */}
                </mesh>
                {/* <axesHelper args={[2]} /> */}
            </group>
        </PivotControls>


    )
}

export default Image

