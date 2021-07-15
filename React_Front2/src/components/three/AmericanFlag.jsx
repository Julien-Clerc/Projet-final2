import React, { useRef, Component, Suspense } from 'react'
import { useGLTF } from "@react-three/drei";

//3D thanks : https://sketchfab.com/United4192

function Flag(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('Americanflag.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.FlagBrown} geometry={nodes.Post_Cylinder.geometry} rotation={[Math.PI / 2, 0, 0]} />
      <mesh material={materials.FlagRed} geometry={nodes.BlankFlag_Cube.geometry} rotation={[Math.PI / 2, 0, 0]} />
      <mesh
        material={materials.FlagWhite}
        geometry={nodes.WhiteStripes_Cube001.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh material={materials.FlagBlue} geometry={nodes.Blue_Cube002.geometry} rotation={[Math.PI / 2, 0, 0]} />
      <mesh material={materials.FlagWhite} geometry={nodes.Stars_Plane.geometry} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/Americanflag.glb')

class AmericanFlag extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Suspense fallback={null}>
             <Flag position={[12, 20, 40]} scale={[3, 3, 3]}/>
          </Suspense>
        )
    }
}

export default AmericanFlag;