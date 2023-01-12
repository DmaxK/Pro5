import React, { useEffect, useRef } from 'react';
import { CameraControlsWrapper } from './camera-controls';
import CameraControls from 'camera-controls';
import { Mesh, Vector3 } from 'three';


//CameraControls.install( { THREE: THREE } );

const Camera: React.FC<{ 
    cameraPosition: Vector3, 
    editorState: string,
    scene: string 
    }> = 
    ({ cameraPosition, editorState, scene }) => {

    const meshesScene1:Mesh[] = [];
    const meshesScene2:Mesh[] = [];
    const meshesScene3:Mesh[] = [];

    const cameraControls = useRef<CameraControls | null>(null);
    const meshRef = useRef<Mesh | null>(null);

    if(meshRef.current){
        meshesScene1.push(meshRef.current);
    }

    useEffect(() => {
        if (cameraControls.current) {
            if (editorState === 'navigate') {
                // this enables the camera:
                cameraControls.current.dollyToCursor = true;
                cameraControls.current.infinityDolly = true;
                cameraControls.current.minDistance = cameraControls.current.maxDistance = 0.3;
                cameraControls.current.azimuthRotateSpeed = - 0.3; // negative value to invert rotation direction
                cameraControls.current.polarRotateSpeed = - 0.3; // negative value to invert rotation direction
                cameraControls.current.truckSpeed = 20;
                cameraControls.current.dollySpeed = 1.0;
                cameraControls.current.dampingFactor = 0.18;
                cameraControls.current.draggingDampingFactor = 0.8;
                cameraControls.current.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
                cameraControls.current.mouseButtons.right = CameraControls.ACTION.TRUCK;
                cameraControls.current.mouseButtons.middle = CameraControls.ACTION.NONE;
                cameraControls.current.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK;
                cameraControls.current.dolly(0.01, true);
                cameraControls.current.saveState();
            } else if(editorState === 'edit' || editorState === 'place') {
                // this disables the camera:
                cameraControls.current.dollyToCursor = true;
                cameraControls.current.infinityDolly = true;
                cameraControls.current.minDistance = cameraControls.current.maxDistance = 0.0;
                cameraControls.current.azimuthRotateSpeed = 0.0;
                cameraControls.current.polarRotateSpeed = 0.0; 
                cameraControls.current.truckSpeed = 0;
                cameraControls.current.dollySpeed = 0.0;
                cameraControls.current.dampingFactor = 0.0;
                cameraControls.current.draggingDampingFactor = 0.0;
                cameraControls.current.mouseButtons.wheel = CameraControls.ACTION.NONE;
                cameraControls.current.mouseButtons.right = CameraControls.ACTION.NONE;
                cameraControls.current.mouseButtons.middle = CameraControls.ACTION.NONE;
                cameraControls.current.touches.two = CameraControls.ACTION.NONE;
                cameraControls.current.dolly(0.00, true);
                cameraControls.current.saveState();
            } else {
                console.log('ERROR: WRONG STATE INPUT! Check for misspells where you set the editorState')
            }
        }
    }, [editorState]);

    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.moveTo(cameraPosition.x, cameraPosition.y, cameraPosition.z, true);
        }
    }, [cameraPosition])

    useEffect(() => {
        if(cameraControls.current){
            cameraControls.current.colliderMeshes = [];
            if(scene === 'scene1'){
                cameraControls.current.colliderMeshes = meshesScene1;
            }
            if(scene === 'scene2'){
                cameraControls.current.colliderMeshes = meshesScene2;
            }
            if(scene === 'scene2'){
                cameraControls.current.colliderMeshes = meshesScene3;
            }
        }
    }, [scene])

    return (
        <>
        <CameraControlsWrapper ref={cameraControls} />
        <mesh ref={meshRef} position={[0, 2, -4]} scale={[3, 3, 3]}>
            <boxGeometry />
        </mesh> 
        </>
    );
}

export default Camera;