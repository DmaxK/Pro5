import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PivotControls, Center, calcPosFromAngles, TransformControls } from '@react-three/drei'
import { DoubleSide, Vector3 } from 'three'
import { ThreeElements, useFrame } from '@react-three/fiber'

const Image: React.FC<{
    spawnPosition: THREE.Vector3,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>
}> = ({ spawnPosition, editorState, setEditorState }) => {

    const [draggingGizmo, setDraggingGizmo] = useState<boolean>(false); // is the gizmo currently being interacted with?
    const [pivotEnabled, setPivotEnabled] = useState<boolean>(false);

    // function imageClickedHandleState(state: string) {

    //     if (state === 'navigate') return 'edit';
    //     if (state === 'edit') {
    //         if(!draggingGizmo) return 'navigate';
    //         else return 'edit';
    //     }
    //     if (state === 'place') return 'edit';
    //     else return 'ERROR: WRONG STATE INPUT! Check for misspells where you set the editorState'
    // }

    // function imageMissedHandleState(state: string) {
    //     if (state === 'navigate') return 'navigate';
    //     if (state === 'edit') {
    //         if(!draggingGizmo) return 'navigate';
    //         else return 'edit';
    //     }
    //     if (state === 'place') return 'place';
    //     else return 'ERROR: WRONG STATE INPUT! Check for misspells where you set the editorState'
    // }

    const centerRef = useRef<THREE.Group>(null!);

    useEffect(() => {
        if (centerRef.current) {
            centerRef.current.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
        }
    }, []);

    const image_MAT = new THREE.MeshStandardMaterial({ color: 'green', side: DoubleSide });

    function handleImageClick() {
        // if(draggingGizmo) setPivotEnabled(true);
        // else setPivotEnabled(true); 
        if(pivotEnabled){
            if(!draggingGizmo) setPivotEnabled(false)
        } else {
            setPivotEnabled(true);
        }
    }

    return (
        <PivotControls
            fixed={false}
            activeAxes={[true, true, false]}
            depthTest={false}
            anchor={[0, 0, 0]}
            scale={pivotEnabled ? 1 : 0}
            onDragStart={() => {setEditorState('edit'); setDraggingGizmo(true)}}
            onDragEnd={() => {setEditorState('navigate'); setDraggingGizmo(false)}}>
            <Center ref={centerRef} top>
                <mesh 
                material={image_MAT}
                onClick={() => handleImageClick()}>
                    <planeGeometry args={[1.0, 1.0]} />
                </mesh>
            </Center>
        </PivotControls>
    )
}

export default Image

