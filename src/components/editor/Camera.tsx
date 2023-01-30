import React, { useEffect, useRef, useState } from 'react';
import { CameraControlsWrapper } from './camera-controls';
import CameraControls from 'camera-controls';
import { Mesh, Vector3, Object3D, Event, BoxGeometry } from 'three';
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



//CameraControls.install( { THREE: THREE } );

const Camera: React.FC<{ 
    cameraPosition: Vector3, 
    cameraLookAt: Vector3,
    cameraPositionReset: Vector3,
    editorState: string,
    scene: string 
    }> = 
    ({ cameraPosition, cameraLookAt, cameraPositionReset, editorState, scene }) => {

    const ColliderScene1 = useLoader(GLTFLoader, './models/scene_1_colliderMesh.glb')
    const ColliderScene2 = useLoader(GLTFLoader, './models/scene_2_colliderMesh.glb')

    const cameraControls = useRef<CameraControls | null>(null);

    useEffect(() => {
        if (cameraControls.current) {
            if (editorState === 'navigate') {
                // this enables the camera:
                cameraControls.current.dollyToCursor = true;
                //cameraControls.current.infinityDolly = true;
                cameraControls.current.minDistance = cameraControls.current.maxDistance = 0.3;
                cameraControls.current.azimuthRotateSpeed = - 0.3; // negative value to invert rotation direction
                cameraControls.current.polarRotateSpeed = - 0.3; // negative value to invert rotation direction
                cameraControls.current.truckSpeed = 20;
                cameraControls.current.dollySpeed = 0.1;
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
            cameraControls.current.setLookAt(cameraPosition.x, cameraPosition.y, cameraPosition.z, cameraLookAt.x, cameraLookAt.y, cameraLookAt.z, true);
        }
    }, [cameraLookAt, cameraPosition])

    useEffect(() => {
        if(cameraControls.current){
            cameraControls.current.setPosition(cameraPositionReset.x, cameraPositionReset.y, cameraPositionReset.z, false);
            cameraControls.current.setTarget(0.1,2,0.1);
            cameraControls.current.dolly(0.01, true);
        }
    },[cameraPositionReset])

    useEffect(() => {
        if (cameraControls.current) {
            cameraControls.current.setTarget(0.1,2,0.1);
            cameraControls.current.dolly(0.01, true);
        }
    }, [])

    /*
    useEffect(() => {
        meshesScene1.push(colliderScene1)
    }, [colliderScene1])
*/
    useEffect(() => {
        if(cameraControls.current){
            cameraControls.current.colliderMeshes = [];
            if(scene === 'scene1'){
                cameraControls.current.colliderMeshes.push(ColliderScene1.scene.children[0]);
            }
            if(scene === 'scene2'){
                cameraControls.current.colliderMeshes.push(ColliderScene2.scene.children[0]);
            }
        }
    }, [scene])

    return (
        <>
        <CameraControlsWrapper ref={cameraControls} />
        </>
    );
}

export default Camera;