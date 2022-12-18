import { Canvas } from '@react-three/fiber';
import { MeshPhongMaterial, Vector3 } from 'three';
import React, { Dispatch, useEffect, useRef, useState } from 'react';

const POI: React.FC<{position: Vector3, setCameraPosition: Dispatch<React.SetStateAction<Vector3>>}> = ({position, setCameraPosition}) => {
	const [hovered, setHovered] = useState(false)
	const mat = useRef<MeshPhongMaterial | null>(null);

	useEffect(() => {
  		document.body.style.cursor = hovered ? 'pointer' : 'auto'
		if(mat.current){
			mat.current.opacity = hovered ? 0.5 : 0.3;
			//mat.current.color = hovered ? "#F88DDF" : "#F88DD5";
		}
	}, [hovered])
    return(
    <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={position} scale={[0.5,0.5,0.5]} onClick={() => setCameraPosition(position)}>
        <sphereBufferGeometry attach={"geometry"} args={[1, 32, 32, 0, 2*Math.PI, 0, Math.PI/2]}/>
        <meshPhongMaterial color={"#F88DD5"} opacity={0.3} emissive={"#F88DD5"} emissiveIntensity={1} transparent />
    </mesh>
    );
}

export default POI;