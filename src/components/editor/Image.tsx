import React, { Dispatch, SetStateAction, useState } from 'react'
import { Vector3 } from 'three'
import { PivotControls, Center, calcPosFromAngles } from '@react-three/drei'

const Image: React.FC<{
    spawnPosition: THREE.Vector3,
    pivotEnabled: boolean,
    editorState: string,
    setEditorState: Dispatch<SetStateAction<string>>
}> = ({ spawnPosition, pivotEnabled, editorState, setEditorState }) => {

    const [pos, setPos] = useState<Vector3>(spawnPosition);

    function imageHandleState(state: string) {
        if (state == 'navigate') return 'edit';
        if (state == 'edit') return 'navigate';
        if (state == 'place') return 'edit';
        else return 'ERROR: WRONG STATE INPUT! Check for misspells where you set the editorState'
    }

    return (
        <>
            {(editorState === 'edit' && pivotEnabled) ?
                <PivotControls activeAxes={[true, true, false]} depthTest={false} anchor={[0, 0, 0]} scale={0.75}>
                    <Center top position={pos}>
                        <mesh onClick={() => setEditorState(imageHandleState(editorState))}>
                            <planeGeometry args={[1.0, 1.0]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                    </Center>
                </PivotControls>
                :
                <Center top position={pos}>
                    <mesh onClick={() => setEditorState(imageHandleState(editorState))}>
                        <planeGeometry args={[1.0, 1.0]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                </Center>
            }
        </>
    )
}

export default Image

