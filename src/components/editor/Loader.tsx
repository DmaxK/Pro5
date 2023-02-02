import { useProgress } from '@react-three/drei';
import React from 'react';

function Loader({handleLoad} : any) {
  const { active } = useProgress();

  console.log(active);

  if (!active) handleLoad();
  
  return <></>
}

export default Loader;