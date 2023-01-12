import { Cloud, Environment, Sky, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { CameraHelper, DirectionalLight } from 'three';


const Noon = () => {
    return(
        <>
        <directionalLight color={"#fff8e3"} castShadow position={[20, 100, 20]} intensity = {0.6}>
            <orthographicCamera attach={"shadow-camera"} args={[-35,35,35,-35]}/>
        </directionalLight>
        <Environment files="./images/cloudy_sky.hdr" background/>
        <hemisphereLight color={"#dbf4ff"} intensity={0.1}/>
        </>
    )
}

export default Noon;