import { Environment } from '@react-three/drei'


const Noon = () => {
    return(
        <>
        <hemisphereLight color={"#badbf5"} intensity={0.4}/>
        <directionalLight color={"#fffbd4"} castShadow={true} position={[2, 10, 2]} intensity = {1}/>
        <Environment files="../../../../public/images/cloudy_sky.hdr" background/>
        </>
    )
}

export default Noon;