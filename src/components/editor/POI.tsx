import { Canvas } from '@react-three/fiber';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { Color, DoubleSide, MeshPhongMaterial, Vector3 } from 'three';

const POI: React.FC<{
	position: Vector3, 
	lookAt: Vector3, 
	setCameraPosition: Dispatch<React.SetStateAction<Vector3>>,
	setCameraRotation: Dispatch<React.SetStateAction<Vector3>>
	}> = ({
		position, 
		lookAt, 
		setCameraPosition, 
		setCameraRotation
	}) => {
	const [hovered, setHovered] = useState(false)
	const mat = useRef<MeshPhongMaterial | null>(null);

	useEffect(() => {
  		document.body.style.cursor = hovered ? "url('./images/teleport_icon.cur'), pointer" : 'auto'
		if(mat.current){
			mat.current.opacity = hovered ? 0.8 : 0.5;
			mat.current.color = hovered ? new Color(0xF88DDF)  : new Color(0xF88DD5);
		}
	}, [hovered])
    return(
    <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={position} scale={[0.3,0.3,0.3]} onClick={() => {setCameraPosition(new Vector3(position.x, position.y + 2, position.z)); setCameraRotation(new Vector3(lookAt.x, lookAt.y + 2, lookAt.z))}}>
        <sphereBufferGeometry attach={"geometry"} args={[1, 32, 32, 0, 2*Math.PI, 0, Math.PI/2]}/>
        <meshPhongMaterial ref={mat} color={"#F88DD5"} opacity={0.5} emissive={"#F88DD5"} emissiveIntensity={1} transparent/>
    </mesh>
    );
}

export default POI;

