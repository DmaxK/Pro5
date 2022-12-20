import { Canvas } from '@react-three/fiber';
import { Color, DoubleSide, MeshPhongMaterial, Vector3 } from 'three';
import React, { Dispatch, useEffect, useRef, useState } from 'react';

const POI: React.FC<{position: Vector3, setCameraPosition: Dispatch<React.SetStateAction<Vector3>>}> = ({position, setCameraPosition}) => {
	const [hovered, setHovered] = useState(false)
	const mat = useRef<MeshPhongMaterial | null>(null);

	useEffect(() => {
  		document.body.style.cursor = hovered ? 'pointer' : 'auto'
		if(mat.current){
			console.log("bruh")
			mat.current.opacity = hovered ? 0.8 : 0.5;
			mat.current.color = hovered ? new Color(0xF88DDF)  : new Color(0xF88DD5);
		}
	}, [hovered])
    return(
    <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={position} scale={[0.5,0.5,0.5]} onClick={() => setCameraPosition(new Vector3(position.x, position.y + 2, position.z))}>
        <sphereBufferGeometry attach={"geometry"} args={[1, 32, 32, 0, 2*Math.PI, 0, Math.PI/2]}/>
        <meshPhongMaterial ref={mat} color={"#F88DD5"} opacity={0.5} emissive={"#F88DD5"} emissiveIntensity={1} transparent/>
    </mesh>
    );
}

export default POI;