import React, { useRef, useState, useEffect } from 'react'
import { ThreeEvent, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';

const PreviewImage: React.FC<{
    enabled: boolean,
    selectedImageKey: string
}> = ({ enabled, selectedImageKey }) => {

    const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [pointer, setPointer] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));
    const [distanceFromWall, setDistanceFromWall] = useState<number>(randFloat(0.01, 0.02))

    const meshRef = useRef<THREE.Mesh>(null!);
    const raycasterRef = useRef<THREE.Raycaster>(null!);

    const { scene, camera } = useThree();

    // set event listener on mouse move to get pointer position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPointer = new THREE.Vector2();
            newPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            newPointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
            setPointer(newPointer);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    // update the image and size of PreviewImage, whenever selectedImageKey changes
    useEffect(() => {
        // make new mesh
        // update material map probably
        if (meshRef.current) {
            const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });

            const img = document.createElement('img');
            const texture = new THREE.Texture(img);
            img.onload = function () {
                texture.needsUpdate = true;

                material.map = texture;
                material.roughness = 0.6;
                material.metalness = 0;
                material.transparent = true;
                material.opacity = 0.3;
                meshRef.current.material = material;

                const imageWidth = texture.image.width;
                const imageHeight = texture.image.height;
                const largerSide = Math.max(imageWidth, imageHeight);
                const scaledWidth = imageWidth / largerSide;
                const scaledHeight = imageHeight / largerSide;

                meshRef.current.geometry = new THREE.PlaneGeometry(scaledWidth, scaledHeight);

            };
            img.src = (sessionStorage.getItem(selectedImageKey) || '');
        }

    }, [selectedImageKey]);

    // perform positioning and rotation of preview image
    useFrame(() => {
        if (enabled) {
            if (raycasterRef.current) {
                raycasterRef.current.setFromCamera(pointer, camera);
                const intersects = raycasterRef.current.intersectObjects(scene.children, true);

                for (const intersect of intersects) {
                    if (intersect.object.name === 'scene') {

                        const point = intersect.point.clone();
                        if (intersect.face) {
                            const normal = intersect.face?.normal.clone();
                            const normalClone = normal.clone();
                            setPosition(point.add(normal.multiplyScalar(distanceFromWall)));

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
    });

    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                scale={1}
                visible={enabled}
            />
            <raycaster ref={raycasterRef} />
        </>
    );
};

export default PreviewImage