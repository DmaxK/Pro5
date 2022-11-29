import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { CameraControls } from './camera-controls';

const cameraControls = useRef<CameraControls | null>(null);

const Camera = () => {
    return (
		<>
			<CameraControls ref={cameraControls} />
			<div style={{ position: 'absolute', top: '0' }}>
				<button
					type="button"
					onClick={() => {
						cameraControls.current?.rotate(DEG45, 0, true);
					}}
				>
					rotate theta 45deg
				</button>
				<button
					type="button"
					onClick={() => {
						cameraControls.current?.reset(true);
					}}
				>
					reset
				</button>
			</div>
		</>
	);
}

/*
const cursor = {
    x: 0,
    y: 0
};

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

const Camera = () => {
    const camera = useRef<THREE.PerspectiveCamera>();
  
    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });
    useFrame(() => {
      if (camera.current) {
        camera.current.rotation.x = Math.sin(cursor.x * Math.PI * 2) * 2;
        camera.current.rotation.z = Math.cos(cursor.x * Math.PI * 2) * 2;
        camera.current.rotation.y = cursor.y * 3;
        }
    });
    return (
      <perspectiveCamera
        ref={camera}
        fov={75}
        aspect={sizes.width / sizes.height}
        near={0.1}
        far={100}
      >
      </perspectiveCamera>
    );
  };
  */