import { Environment, Sky, Cloud } from '@react-three/drei'


const Noon = () => {
    return(
        <>
        <directionalLight color={"#fffbd4"} castShadow position={[20, 100, 20]} intensity = {0.7}/>
        <Environment files="../../../../public/images/cloudy_sky.hdr"/>
        < Sky distance={30000} inclination={1} turbidity={0.1} azimuth={-90} rayleigh={0.07} mieCoefficient={0.01} mieDirectionalG={0.3} sunPosition={[2, 10, 2]}/>
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

export default Noon;