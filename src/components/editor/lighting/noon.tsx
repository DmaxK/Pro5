import { Environment } from '@react-three/drei'


const Noon = () => {
    return(
        <>
        <hemisphereLight color={"#badbf5"} intensity={1.2}/>
        <directionalLight color={"#fffbd4"} castShadow={true} position={[0, 10, 0]}/>
        <Environment files="../../../../public/images/cloudy_sky.hdr" background />
        </>
    )
}

export default Noon;