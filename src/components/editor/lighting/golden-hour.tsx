import { Environment } from '@react-three/drei'

const Goldenhour = () => {
  return (
    <>
        <hemisphereLight color={"#badbf5"} intensity={0.0}/>
        <directionalLight color={"#f5ad6e"} castShadow={true} position={[5, 4, 6]} intensity={0.7}/>
        <Environment files="../../../../public/images/sunset3.hdr" background />
        </>
  )
}

export default Goldenhour;