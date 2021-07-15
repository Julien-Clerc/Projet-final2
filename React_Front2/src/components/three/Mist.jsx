import * as THREE from 'three'
import React, { useRef, Component, useState } from 'react'
import { a } from 'react-spring/three'
import getRandomInt from './utils/getRandomInt'

function Mist(props, mistTrue) {
    var numbermist
    var mistpositions = []
    if ( props.mistTrue == 1){
        numbermist = 100
        for (let i = 0; i < numbermist; i++) {
            let mistNewPosX = getRandomInt(45);
            let mistNewPosY = getRandomInt(25)+10; 
            let mistNewPosZ = getRandomInt(45);
            let object = {
            x: mistNewPosX,
            y: mistNewPosY,
            z: mistNewPosZ
            } 
            mistpositions.push(object)
        }
    }
    else
    {
        numbermist = 0
        mistpositions = []
    }

    const groupmist = useRef();

    //Basic expand state
    const [expand, setExpand] = useState(false);
  
    return  (
      <group ref={groupmist}>
        { mistpositions.map((d, index) =>  (
        <a.mesh
          position={[d.x, d.y, d.z]}
          key={index}
          onClick={() => setExpand(!expand)}
          scale={[ 20, 10, 20 ]}
          castShadow>
          <boxBufferGeometry attach="geometry" args={d.args} />
          <a.meshPhysicalMaterial attach="material" color={'#ffffff'} opacity={0.1} transparent={true} />
        </a.mesh>
      ))}
      </group>
    );
}
    
class Trees extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Mist mistTrue={this.props.mistTrue}/>
        )
    }
}

export default Trees;