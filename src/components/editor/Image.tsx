import React, { Dispatch, SetStateAction, useState } from 'react'
import * as THREE from 'three'
import { PivotControls, Center, calcPosFromAngles, TransformControls } from '@react-three/drei'
import { DoubleSide } from 'three'

const Image: React.FC<{
    spawnPosition: THREE.Vector3,
    pivotEnabled: boolean,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>
}> = ({ spawnPosition, pivotEnabled, editorState, setEditorState }) => {

    const [pos, setPos] = useState<THREE.Vector3>(spawnPosition);

    function imageHandleState(state: string) {
        if (state == 'navigate') return 'edit';
        if (state == 'edit') return 'navigate';
        if (state == 'place') return 'edit';
        else return 'ERROR: WRONG STATE INPUT! Check for misspells where you set the editorState'
    }

    const image_MAT = new THREE.MeshStandardMaterial({ color: 'green', side: DoubleSide });

    return (
        <PivotControls fixed={editorState === 'navigate'} activeAxes={[true, true, false]} depthTest={false} anchor={[0, 0, 0]} scale={10}>
        {/* <TransformControls enabled={editorState==='edit'} showX={editorState==='edit'} showZ={false} showY={editorState==='edit'}> */}
            <Center top position={[-2, 1, 1]}>
            <mesh onClick={() => setEditorState(imageHandleState(editorState))} material={image_MAT}>
                <planeGeometry args={[1.0, 1.0]} />
            </mesh>
            </Center>
        {/* </TransformControls> */}
        </PivotControls>
    )
}

export default Image

