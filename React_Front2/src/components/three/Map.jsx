import React, { useRef, useState, Component } from 'react'
import { useFrame } from 'react-three-fiber'

function Terrain(props, terraincolor) {
    // This reference will give us direct access to the mesh
    const meshterrain = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
      <mesh
        {...props}
        ref={meshterrain}
        scale={active ? [1, 1, 1] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxBufferGeometry args={[105, 3, 105]} />
        <meshStandardMaterial color={props.terraincolor} />
      </mesh>
    )
}

function CornField(props, fieldcolor) {
  // This reference will give us direct access to the mesh
  const meshfield = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={meshfield}
      scale={active ? [1, 1, 1] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[10, 4,40]} />
      <meshStandardMaterial color={props.fieldcolor} opacity={[0.9]} transparent={[true]} />
    </mesh>
  )
}

function Road(props, roadcolor) {
    // This reference will give us direct access to the mesh
    const meshfield = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
      <mesh
        {...props}
        ref={meshfield}
        scale={active ? [1, 1, 1] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxBufferGeometry args={[5, 0.3, 64]} />
        <meshStandardMaterial color={props.roadcolor} />
      </mesh>
    )
  }

class Map extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <group>
                <Terrain 
                    position={[0, 0, 0]} 
                    terraincolor = {this.props.terraincolor}
                />
                <CornField position={[-3, 2, 20]} fieldcolor={this.props.fieldcolor}/>
                <Road position={[5, 2, 20]} roadcolor={this.props.roadcolor}/>
            </group>
        )
    }
}

export default Map;