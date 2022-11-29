import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CameraControlsWrapper } from './camera-controls';
import CameraControls from 'camera-controls';

//CameraControls.install( { THREE: THREE } );

const Camera = () => {
    
    const cameraControls = useRef<CameraControls | null>(null);
    
    useEffect(() => {
      if(cameraControls.current){
        cameraControls.current.dollyToCursor = true;
        cameraControls.current.infinityDolly = true;
        cameraControls
        cameraControls.current.minDistance = cameraControls.current.maxDistance = 0.3;
        cameraControls.current.azimuthRotateSpeed = - 0.3; // negative value to invert rotation direction
        cameraControls.current.polarRotateSpeed   = - 0.3; // negative value to invert rotation direction
        cameraControls.current.truckSpeed = 10;
        cameraControls.current.dollySpeed = 1.0;
        cameraControls.current.dampingFactor = 0.4;
        cameraControls.current.draggingDampingFactor = 0.8;
        cameraControls.current.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
        cameraControls.current.mouseButtons.right = CameraControls.ACTION.NONE;
        cameraControls.current.mouseButtons.middle = CameraControls.ACTION.NONE;
        cameraControls.current.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK;
        cameraControls.current.saveState();
    }
  }, []);
    return(
        <CameraControlsWrapper ref={cameraControls}/>
    );
}

  export default Camera;