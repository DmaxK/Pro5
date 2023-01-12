import { Cloud, Environment, Sky } from '@react-three/drei';

const Goldenhour = () => {
  //        < Sky inclination={0.4} turbidity={0.3} azimuth={-180} rayleigh={1.5} sunPosition={[5, 0.3, 6]}/>
  return (
    <>
        <directionalLight color={"#f5ad6e"} castShadow={true} position={[50, 40, 60]} intensity={0.2}>
          <orthographicCamera attach={"shadow-camera"} args={[-30,30,30,-30]}/>
        </directionalLight>
        <hemisphereLight color={"#f5ad6e"} intensity={0.03}/>
        <Environment files="./images/sunset5.hdr" background/>
        </>
  )
}

export default Goldenhour;