/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 scene2.glb
*/
// @ts-nocheck

import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Color, DoubleSide, Mesh, MeshStandardMaterial, Vector3 } from 'three';

export function Scene2() {
  const { nodes, materials } = useGLTF('/models/scene2.glb')
  const windowRef1 = useRef<Mesh | null>(null);

  const glassMat = new MeshStandardMaterial();
  glassMat.transparent = true;
  glassMat.opacity = 0.95;
  glassMat.roughness = 0.05;
  glassMat.color = new Color('#e6fcf9');
  glassMat.metalness = 0.5;
  glassMat.side = DoubleSide;

  useEffect(() => {
    if(windowRef1.current){
      windowRef1.current.material = glassMat;
    }
    
  }, [windowRef1]);
  return (
    <group dispose={null} position={new Vector3(-5,0,-5)}>
      <mesh receiveShadow geometry={nodes.walkway.geometry} material={materials.sidewalk} />
      <mesh receiveShadow castShadow geometry={nodes.cobblestone_new.geometry} material={materials.cobblestone} />
      <mesh receiveShadow castShadow geometry={nodes.Fireexit.geometry} material={materials.fireexit} />
      <mesh receiveShadow castShadow geometry={nodes.cement_bollard.geometry} material={materials.Cement_Bollard} />
      <mesh receiveShadow castShadow geometry={nodes.cones.geometry} material={materials.Traffic_Cone} />
      <mesh receiveShadow castShadow geometry={nodes.trash_cans.geometry} material={materials.Trash_Can} />
      <mesh receiveShadow castShadow geometry={nodes.trash_bags.geometry} material={materials.Trash_Bag} />
      <mesh receiveShadow castShadow geometry={nodes.barriers.geometry} material={materials.barrier} />
      <mesh receiveShadow castShadow geometry={nodes.ladders.geometry} material={materials.Ladder} />
      <mesh receiveShadow castShadow geometry={nodes.electric_box.geometry} material={materials.electric_box} />
      <mesh receiveShadow castShadow geometry={nodes.electric_wall.geometry} material={materials.electric_wall} />
      <mesh receiveShadow castShadow geometry={nodes.gas_tank.geometry} material={materials.gas_tank} />
      <mesh receiveShadow castShadow geometry={nodes.pallets.geometry} material={materials.pallet} />
      <mesh receiveShadow castShadow geometry={nodes.rubble.geometry} material={materials.rubble} />
      <mesh receiveShadow castShadow geometry={nodes.wagon.geometry} material={materials.wagon} />
      <mesh receiveShadow castShadow geometry={nodes.wooden_beam.geometry} material={materials.wooden_beam} />
      <mesh receiveShadow castShadow geometry={nodes.railing.geometry} material={materials.railing} />
      <mesh receiveShadow castShadow geometry={nodes.pipes.geometry} material={materials.pipes} />
      <mesh receiveShadow castShadow ref={windowRef1} geometry={nodes.Windows.geometry} material={materials.Glass_Placeholder_Windows} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004.geometry} material={materials.house_1_roof} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_1.geometry} material={materials.house_1_base_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_2.geometry} material={materials.house_1_corner_big} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_3.geometry} material={materials.house_1_base_2} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_4.geometry} material={materials.house_1_corner_small} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_5.geometry} material={materials.house_1_floor_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_6.geometry} material={materials.house_1_corner_middle} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_7.geometry} material={materials.house_1_trim} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_8.geometry} material={materials.house_1_floor_4} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_9.geometry} material={materials.house_1_floor_2} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_10.geometry} material={materials.house_1_floor_3} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_wdhkcccdw_02_LOD5004_11.geometry} material={materials.house_1_window_roof} />
      <mesh castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001.geometry} material={materials.house_2_roof} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_1.geometry} material={materials.house_2_base_3} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_2.geometry} material={materials.house_2_trim_1} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_3.geometry} material={materials.house_2_floor_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_4.geometry} material={materials.house_2_trim_2} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_5.geometry} material={materials.house_2_floor_2} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_6.geometry} material={materials.house_2_floor_3} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_7.geometry} material={materials.house_2_floor_4} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_8.geometry} material={materials.house_2_trim_3} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_9.geometry} material={materials.house_2_trim_4} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_10.geometry} material={materials.house_2_base_2} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_11.geometry} material={materials.house_2_base_1} />
      <mesh receiveShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_12.geometry} material={materials.house_2_floor_4_alt} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_13.geometry} material={materials.house_2_window_roof_2} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_14.geometry} material={materials.house_2_window_roof_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_building_combined_L_vliqebjdw_01_LOD5001_15.geometry} material={materials.house_2_window_roof_3} />
      <mesh receiveShadow castShadow geometry={nodes.Cube005.geometry} material={materials.M_Scaffholding_Wood} />
      <mesh receiveShadow castShadow geometry={nodes.Cube005_1.geometry} material={materials.M_Scaffholding} />
      <mesh receiveShadow castShadow geometry={nodes.Mesh.geometry} material={materials.billboard_wall_lamps} />
      <mesh receiveShadow castShadow geometry={nodes.Mesh_1.geometry} material={materials.fireexit} />
      <mesh receiveShadow castShadow geometry={nodes.Mesh_2.geometry} material={materials.Ad_Billboard_Wall} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_cardboard_box_S_tfnndjepa_LOD5.geometry} material={materials.box} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_cardboard_box_S_tfnndjepa_LOD5_1.geometry} material={materials.boxes} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_hardware_S_vgyiea1aw_LOD5.geometry} material={materials.cable} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_hardware_S_vgyiea1aw_LOD5_1.geometry} material={materials.cable_2} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_hardware_S_vgyiea1aw_LOD5_2.geometry} material={materials.cable_roll} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_industrial__M_vb1lafx_LOD5.geometry} material={materials.metal_plate} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_industrial__M_vb1lafx_LOD5_1.geometry} material={materials.metal_bin} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_storage_M_vjwtbd1_LOD5.geometry} material={materials.paper_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_storage_M_vjwtbd1_LOD5_1.geometry} material={materials.paper_2} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_hardware_M_vh2mee1_LOD5001.geometry} material={materials.plastic_1} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_props_hardware_M_vh2mee1_LOD5001_1.geometry} material={materials.plastic_bin} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_industrial_storage_M_vhtibbe_LOD5.geometry} material={materials.storage} />
      <mesh receiveShadow castShadow geometry={nodes.Aset_industrial_storage_M_vhtibbe_LOD5_1.geometry} material={materials.storage_2} />
    </group>
  )
}

useGLTF.preload('/models/scene2.glb')
