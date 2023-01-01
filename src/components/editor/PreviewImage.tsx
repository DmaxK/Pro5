import React, { useRef, useState, useEffect } from 'react'
import { ThreeEvent, useThree, useFrame } from '@react-three/fiber'
import { Vector2, Vector3 } from 'three';

const PreviewImage: React.FC<{
    enabled: boolean
}> = ({ enabled }) => {

    const [position, setPosition] = useState<THREE.Vector3>(new Vector3(0, 0, 0));

    const meshRef = useRef<THREE.Mesh>(null!);
    const raycasterRef = useRef<THREE.Raycaster>(null!);

    const { scene, camera } = useThree();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (enabled) {
                const pointer = new Vector2();
                pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
                pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
                
                if (raycasterRef.current) {
                    raycasterRef.current.setFromCamera(pointer, camera);
                    const intersects = raycasterRef.current.intersectObjects(scene.children, true);


                    for (const intersect of intersects) {
                        if (intersect.object.name === 'scene') {
   
                            const point = intersect.point.clone();
                            if (intersect.face) {
                                const normal = intersect.face?.normal.clone();
                                const normalClone = normal.clone();
                                setPosition(point.add(normal.multiplyScalar(0.001)));
                                
                                const newLookAt = intersect.point.clone();
                                newLookAt.add(normalClone.multiplyScalar(10));
                                if (meshRef.current) {
                                    meshRef.current.lookAt(newLookAt);
                                }
                            }
                            return;
                        }
                    }
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);


    return (
        <>
            {
                enabled &&
                <mesh
                    // name={'scene'}
                    ref={meshRef}
                    position={position}
                    scale={0.1}
                >
                    <meshBasicMaterial color={'#22ff22'} />
                    <planeGeometry />
                </mesh>
            }
            <raycaster ref={raycasterRef} />
        </>
    );
};

export default PreviewImage