// @ts-nocheck
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { useDrag } from '@use-gesture/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DoubleSide, MeshStandardMaterial, Vector3 } from 'three';
import ImageDimension from './ImageDimension';
import ImageUI from './ImageUI';

const CornerPivot: React.FC<{
    spawnPosition: THREE.Vector3;
    enabled: boolean;
    editorState: string;
    setEditorState: Dispatch<SetStateAction<string>>;
    imagePos: THREE.Vector3;
    scale: Vector3;
    setCornerPivotScale: Dispatch<SetStateAction<THREE.Vector3>>;
    groupScale: THREE.Vector3;
    setGroupScale: Dispatch<SetStateAction<THREE.Vector3>>;
    setUIScale: Dispatch<SetStateAction<THREE.Vector3>>;
    setWidthScale: Dispatch<SetStateAction<THREE.Vector3>>;
    setHeightScale: Dispatch<SetStateAction<THREE.Vector3>>;
    imageHighlighted: boolean;
}> = ({
    spawnPosition,
    enabled,
    editorState,
    setEditorState,
    imagePos,
    scale,
    setCornerPivotScale,
    groupScale,
    setGroupScale,
    setUIScale,
    setWidthScale,
    setHeightScale,
    imageHighlighted,
}) => {
        const meshRef = useRef<THREE.Mesh>(null);

        const [latestCenter, setLatestCenter] = useState<THREE.Vector3>(new Vector3(0, 0, 0));
        const [latestCorner, setLatestCorner] = useState<THREE.Vector3>(new Vector3(0, 0, 0));
        const [latestGroupScale, setLatestGroupScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [latestCornerPivotScale, setLatestCornerPivotScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [highlighted, setHighlighted] = useState<boolean>(false);

        const { camera } = useThree();

        // set potition at start
        useEffect(() => {
            if (meshRef.current) {
                meshRef.current.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z + 0.02);
            }
        }, []);

        // set pointer when being hovered
        useEffect(() => {
            if (highlighted) {
                document.body.style.cursor = 'pointer';
            } else {
                if (!imageHighlighted) {
                    document.body.style.cursor = 'auto';
                }
            }
        }, [highlighted]);

        const bind = useDrag(({ active, first, xy: [x, y], event }) => {
            if (active) {
                event.stopPropagation();
                if (editorState !== 'edit' && enabled) {
                    setEditorState('edit');
                }
                if (first) {
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;

                    // calculating screen pixel position of new center
                    const newCenter = new THREE.Vector3();
                    newCenter.copy(imagePos);
                    newCenter.project(camera);
                    newCenter.x = ((newCenter.x + 1) * windowWidth) / 2;
                    newCenter.y = (-(newCenter.y - 1) * windowHeight) / 2;
                    newCenter.z = 0;
                    setLatestCenter(newCenter);

                    // calculating screen pixel position of new corner
                    const newCorner = new THREE.Vector3();
                    if (meshRef.current) {
                        meshRef.current.getWorldPosition(newCorner);
                    }
                    newCorner.project(camera);
                    newCorner.x = ((newCorner.x + 1) * windowWidth) / 2;
                    newCorner.y = (-(newCorner.y - 1) * windowHeight) / 2;
                    newCorner.z = 0;
                    setLatestCorner(newCorner);

                    setLatestGroupScale(groupScale);
                    setLatestCornerPivotScale(scale);
                }

                const distanceCenterCorner = Math.sqrt(
                    Math.pow(latestCenter.x - latestCorner.x, 2) + Math.pow(latestCenter.y - latestCorner.y, 2)
                );
                const distanceCenterPointer = Math.sqrt(Math.pow(latestCenter.x - x, 2) + Math.pow(latestCenter.y - y, 2));
                let scaleFactor = distanceCenterPointer / distanceCenterCorner;
                if (!isFinite(scaleFactor)) {
                    scaleFactor = 1;
                }
                const invScaleFactor = 1 / scaleFactor;

                // the following if fixes the problem that latestGroupScale isnt updated in the same frame as setLatestGroupScale is called
                if (!first) {
                    setGroupScale(
                        new Vector3(latestGroupScale.x * scaleFactor, latestGroupScale.y * scaleFactor, latestGroupScale.z)
                    );

                    setCornerPivotScale(
                        new Vector3(
                            latestCornerPivotScale.x * invScaleFactor,
                            latestCornerPivotScale.y * invScaleFactor,
                            latestCornerPivotScale.z
                        )
                    ); // resize corner pivots so that they stay constant in size when parent group is scaled

                    setUIScale(
                        new Vector3(
                            latestCornerPivotScale.x * invScaleFactor,
                            latestCornerPivotScale.y * invScaleFactor,
                            latestCornerPivotScale.z
                        )
                    ); // rezize UI for the same reason as above

                    setWidthScale(
                        new Vector3(
                            latestCornerPivotScale.x * invScaleFactor,
                            latestCornerPivotScale.y * invScaleFactor,
                            latestCornerPivotScale.z
                        )
                    );

                    setHeightScale(
                        new Vector3(
                            latestCornerPivotScale.x * invScaleFactor,
                            latestCornerPivotScale.y * invScaleFactor,
                            latestCornerPivotScale.z
                        )
                    );
                }
            } else {
                setEditorState('navigate');
            }
        });

        return (
            <mesh
                {...bind()}
                scale={scale}
                ref={meshRef}
                visible={enabled}
                onPointerEnter={() => setHighlighted(true)}
                onPointerLeave={() => setHighlighted(false)}
            >
                <planeGeometry args={[0.1, 0.1]} />
                <meshBasicMaterial color={highlighted ? '#FF31BB' : '#FF62CB'} />
            </mesh>
        );
    };

//--------------------------------------------------------------------

const Image: React.FC<{
    index: number;
    spawnPosition: THREE.Vector3;
    editorState: string;
    setEditorState: Dispatch<SetStateAction<string>>;
    pivotEnabled: boolean;
    enableThisPivot: (arg0: number, arg1: boolean) => void;
    sessionStorageKey: string;
    spawnLookAtPoint: THREE.Vector3;
    spawnNormal: THREE.Vector3;
    distanceFromWall: number;
    deleteImage: (thisIndex: number) => void;
}> = ({
    index,
    spawnPosition,
    editorState,
    setEditorState,
    pivotEnabled,
    enableThisPivot,
    sessionStorageKey,
    spawnLookAtPoint,
    spawnNormal,
    distanceFromWall,
    deleteImage,
}) => {
        const [position, setPosition] = useState<Vector3>(spawnPosition);
        const [roughness, setRoughness] = useState<number>(1);
        const [emissive, setEmissive] = useState<boolean>(false);
        const [meshScale, setMeshScale] = useState<Vector3>(new Vector3(1, 1, 1));
        const [groupScale, setGroupScale] = useState<Vector3>(new Vector3(1, 1, 1));
        const [cornerPivotPositions, setCornerPivotPositions] = useState<Array<THREE.Vector3>>([]);
        const [cornerPivotScale, setCornerPivotScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [UIPosition, setUIPosition] = useState<THREE.Vector3>(new Vector3(0, 0, 0));
        const [UIScale, setUIScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [widthPosition, setWidthPosition] = useState<THREE.Vector3>(new Vector3(0, 0, 0));
        const [widthScale, setwidthScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [heightPosition, setHeightPosition] = useState<THREE.Vector3>(new Vector3(0, 0, 0));
        const [heightScale, setHeightScale] = useState<THREE.Vector3>(new Vector3(1, 1, 1));
        const [highlighted, setHighlighted] = useState<boolean>(false);
        const [pointerMoved, setPointerMoved] = useState<boolean>(false);
        const [activelyPlacing, setActivelyPlacing] = useState<boolean>(false);
        const [pointer, setPointer] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));

        const groupRef = useRef<THREE.Group>(null!);
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

        useEffect(() => {
            // position and rotate image correctly
            if (groupRef.current) {
                setPosition(new Vector3(spawnPosition.x, spawnPosition.y, spawnPosition.z));
                groupRef.current.lookAt(spawnLookAtPoint);
            }

            // create materials and geometry
            if (meshRef.current) {
                const material = new THREE.MeshStandardMaterial({ side: DoubleSide });

                const img = document.createElement('img');
                const texture = new THREE.Texture(img);
                img.onload = function () {
                    texture.needsUpdate = true;

                    material.map = texture;
                    material.roughness = roughness;
                    material.metalness = 0;
                    material.emissiveMap = texture;
                    material.emissive = new THREE.Color('#414141');
                    material.emissiveIntensity = 0;
                    meshRef.current.material = material;

                    meshRef.current.visible = true;

                    const imageWidth = texture.image.width;
                    const imageHeight = texture.image.height;
                    const largerSide = Math.max(imageWidth, imageHeight);
                    const scaledWidth = imageWidth / largerSide;
                    const scaledHeight = imageHeight / largerSide;

                    meshRef.current.geometry = new THREE.PlaneGeometry(scaledWidth, scaledHeight);

                    // set positions for corner pivots
                    const tl = new Vector3(scaledWidth * -0.5, scaledHeight * 0.5, 0);
                    const tr = new Vector3(scaledWidth * 0.5, scaledHeight * 0.5, 0);
                    const bl = new Vector3(scaledWidth * -0.5, scaledHeight * -0.5, 0);
                    const br = new Vector3(scaledWidth * 0.5, scaledHeight * -0.5, 0);
                    setCornerPivotPositions([tl, tr, bl, br]);

                    // set position for ImageUI
                    const p = new Vector3();
                    p.copy(tr);
                    setUIPosition(p);

                    // set positions for image dimensions
                    const w = new Vector3(0, scaledHeight * -0.5, 0);
                    setWidthPosition(w);
                    const h = new Vector3(scaledWidth * -0.5, 0, 0);
                    setHeightPosition(h);
                };
                img.src = sessionStorage.getItem(sessionStorageKey) || '';
            }
        }, []);

        // change material when roughness is adjusted
        useEffect(() => {
            if (meshRef.current) {
                meshRef.current.material.roughness = roughness;
            }
        }, [roughness]);

        // change material when emissive is enabled/disabled
        useEffect(() => {
            if (meshRef.current) {
                if (emissive) {
                    meshRef.current.material.emissiveIntensity = 5;
                } else {
                    meshRef.current.material.emissiveIntensity = 0;
                }
            }
        }, [emissive]);

        // set pointer when being hovered
        useEffect(() => {
            document.body.style.cursor = highlighted ? 'pointer' : 'auto';
        }, [highlighted]);

        function handleImageUp() {
            if (!pointerMoved) {
                if (pivotEnabled) {
                    enableThisPivot(index, false);
                } else {
                    enableThisPivot(index, true);
                }

                setEditorState('navigate');
            }
        }

        function handleImageDown() {
            setPointerMoved(false);
        }

        const bind = useDrag(({ active, movement: [x, y], timeStamp, event }) => {
            if (active) {
                if (editorState !== 'edit' && pivotEnabled) {
                    setEditorState('edit');
                }
                if (pivotEnabled) {
                    if (x !== 0 && y !== 0) {
                        if(!activelyPlacing){
                            setActivelyPlacing(true);
                        }
                    }
                }
            } else {
                setEditorState('navigate');
                setActivelyPlacing(false);
            }
        });

        // perform positioning and rotation of preview image
        useFrame(() => {
            if (activelyPlacing) {
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
                                if (groupRef.current) {
                                    groupRef.current.lookAt(newLookAt);
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
                <group scale={groupScale} ref={groupRef} position={position} {...bind()}>
                    <mesh
                        scale={meshScale}
                        ref={meshRef}
                        onPointerOver={() => setHighlighted(true)}
                        onPointerOut={() => setHighlighted(false)}
                        onPointerDown={() => handleImageDown()}
                        onPointerMove={() => setPointerMoved(true)}
                        onPointerUp={() => handleImageUp()}
                    />
                    {pivotEnabled &&
                        cornerPivotPositions.map((pos, i) => (
                            <CornerPivot
                                key={i}
                                spawnPosition={pos}
                                enabled={pivotEnabled}
                                editorState={editorState}
                                setEditorState={setEditorState}
                                imagePos={position}
                                scale={cornerPivotScale}
                                setCornerPivotScale={setCornerPivotScale}
                                groupScale={groupScale}
                                setGroupScale={setGroupScale}
                                setUIScale={setUIScale}
                                setWidthScale={setwidthScale}
                                setHeightScale={setHeightScale}
                                imageHighlighted={highlighted}
                            />
                        ))}
                    {pivotEnabled && (
                        <>
                            <ImageUI
                                position={UIPosition}
                                scale={UIScale}
                                deleteImage={deleteImage}
                                index={index}
                                roughness={roughness}
                                setRoughness={setRoughness}
                                emissive={emissive}
                                setEmissive={setEmissive}
                            />
                            <ImageDimension
                                text={(groupScale.x * Math.abs(heightPosition.x) * 2).toFixed(2) + ' m'}
                                position={widthPosition}
                                rotation={0}
                                scale={widthScale}
                            />
                            <ImageDimension
                                text={(groupScale.x * Math.abs(widthPosition.y) * 2).toFixed(2) + ' m'}
                                position={heightPosition}
                                rotation={-Math.PI / 2}
                                scale={heightScale}
                            />
                        </>
                    )}
                </group>
                <raycaster ref={raycasterRef} />
            </>
        );
    };

export default Image;
