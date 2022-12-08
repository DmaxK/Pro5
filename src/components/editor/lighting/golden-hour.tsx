import { Environment, Sky, Cloud } from '@react-three/drei'

const Goldenhour = () => {
  //        < Sky inclination={0.4} turbidity={0.3} azimuth={-180} rayleigh={1.5} sunPosition={[5, 0.3, 6]}/>
  return (
    <>
        <directionalLight color={"#f5ad6e"} castShadow={true} position={[5, 4, 6]} intensity={0.2}/>
        <Environment files="/images/sunset5.hdr" background/>
        </>
  )
}

export default Goldenhour;