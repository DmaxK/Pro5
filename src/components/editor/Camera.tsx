import React, { useEffect, useRef } from 'react';
import { CameraControlsWrapper } from './camera-controls';
import CameraControls from 'camera-controls';
import { Vector3 } from 'three';


//CameraControls.install( { THREE: THREE } );

const Camera: React.FC<{cameraPosition: Vector3}> = ({cameraPosition}) => {
    
    const cameraControls = useRef<CameraControls | null>(null);
    
    useEffect(() => {
      if(cameraControls.current){
        cameraControls.current.dollyToCursor = true;
        cameraControls.current.infinityDolly = true;
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
        cameraControls.current.dolly(0.01, true);
        cameraControls.current.saveState();
    }
  }, []);
  useEffect(() => {
    if(cameraControls.current){
      cameraControls.current.moveTo(cameraPosition.x, cameraPosition.y, cameraPosition.z, true);
    }
  }, [cameraPosition])
    return(
        <CameraControlsWrapper ref={cameraControls}/>
    );
}

  export default Camera;