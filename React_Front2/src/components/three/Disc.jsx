import React, { useRef, Suspense, Component, useState, useContext, createContext } from 'react'
import { useGLTF } from "@react-three/drei";
import { useFrame } from 'react-three-fiber'
import { connect } from 'react-redux'
import * as THREE from 'three'
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler'
import ThreeContext from '../../context'
import { BearCounter, useStore } from '../../zustand'


//credit 3D https://sketchfab.com/ilyafom1
//credits https://www.youtube.com/watch?v=5ZCtTdwc4GI

function Vinyl(props) {
  const groupradio = useRef()
  const { nodes, materials } = useGLTF('3DAssets/scene.gltf')
  const [active, setActive] = useState(false)

  useFrame(() => {
    groupradio.current.rotation.y = groupradio.current.rotation.y += 0.01;
  });

  const state = useStore.getState()
  
  function Clicked(){
      const state = useStore.getState()
      props.updatePlayer()
  }

  return (
    <group 
    ref={groupradio} 
    {...props} 
    dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}
        scale={active ? [1.25, 1.25, 1.25] : [1, 1, 1]}
        onPointerOver={(e) => setActive(!active)}
        onPointerOut={(e) => setActive(!active)}
        onClick={Clicked}
         >
          <mesh material={materials['Material.001']} geometry={nodes.defaultMaterial.geometry} />
          <mesh material={materials['Material.005']} geometry={nodes.defaultMaterial_1.geometry} />
          <mesh material={materials['Material.004']} geometry={nodes.defaultMaterial_2.geometry} />
          <mesh material={materials['Material.006']} geometry={nodes.defaultMaterial_3.geometry} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('3DAssets/scene.gltf')


const Disc = (props) => {
      return(
          <group>
              <Suspense fallback={null}>
                <Vinyl position={[-100, 100, 10]} scale={[3, 3, 3]} updatePlayer={props.updatePlayer}/>
              </Suspense>
          </group>
      )
}

export default Disc;