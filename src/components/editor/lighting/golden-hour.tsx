import { Environment, Sky, Cloud } from '@react-three/drei'

const Goldenhour = () => {
  return (
    <>
        <directionalLight color={"#f5ad6e"} castShadow={true} position={[5, 4, 6]} intensity={0.2}/>
        <Environment files="/images/sunset6.hdr"/>
        < Sky inclination={0.4} turbidity={0.3} azimuth={-180} rayleigh={1.5} sunPosition={[5, 0.3, 6]}/>
        <Cloud position={[40, 50, 20]} speed={0.1} opacity={1} segments={8}  width={30}/>
        <Cloud position={[-35, 35, 30]} speed={0.1} opacity={1} segments={8}  width={40}/>
        <Cloud position={[30, 40, -35]} speed={0.1} opacity={1} segments={8}  width={20}/>
        <Cloud position={[-27, 40, -20]} speed={0.1} opacity={1} segments={8}  width={25}/>
        <Cloud position={[-2, 60, -3]} speed={0.1} opacity={1} segments={8}  width={25}/>
        <Cloud position={[3, 50, 70]} speed={0.1} opacity={1} segments={8}  width={30}/>
        <Cloud position={[-80, 35, 2]} speed={0.1} opacity={1} segments={8}  width={40}/>
        <Cloud position={[75, 40, -4]} speed={0.1} opacity={1} segments={8}  width={20}/>
        <Cloud position={[-3, 40, -85]} speed={0.1} opacity={1} segments={8}  width={25}/>
        </>
  )
}

export default Goldenhour;