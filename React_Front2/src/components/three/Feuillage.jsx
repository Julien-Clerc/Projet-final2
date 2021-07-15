import * as THREE from 'three'
import React, { useRef, Component, useState } from 'react'
import { useGLTF } from "@react-three/drei";
import { a } from 'react-spring/three'
import getRandomInt from './utils/getRandomInt'
import randomBetween from './utils/randomBetween'

function Feuillage(props, color, numbertrees, treepositions) {
    let treepos = props.treepositions
    const grouptrees = useRef();

    //Basic expand state
    const [expand, setExpand] = useState(false);
  
    return  (
      <group ref={grouptrees}>
        { treepos.map((d, index) =>  (
        <a.mesh
          position={[d.x, d.y, d.z]}
          key={index}
          onClick={() => setExpand(!expand)}
          scale={[ 5, 15, 5 ]}
          castShadow>
          <coneBufferGeometry attach="geometry" args={d.args} />
          <a.meshPhysicalMaterial attach="material" color={props.color} />
        </a.mesh>
      ))}
      </group>
    );
}
    
class Trees extends Component {
    constructor(props){
        super(props)
        this.state = {
          trees: [
            {x: 10, y: 8, z: 20}
          ]
        } 
    }
    async componentDidMount() {
      var treepositions = []
      for (let i = 0; i < 300; i++) {
          let treeNewPosX = randomBetween(45);
          let treeNewPosZ = getRandomInt(45); 
          let object = {
            x: treeNewPosX,
            y: 8,
            z: treeNewPosZ
          } 
          treepositions.push(object)
      }
      this.setState({
        trees: treepositions
      })
    }
    render(){
        return(
            <Feuillage color={this.props.treecolor} treepositions={this.state.trees}/>
        )
    }
}

export default Trees;