import React, { useRef, useState, Component } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import JSONfont from "../../fonts/Cocogoose.json";
import JSONfontQ from "../../fonts/LGCR.json";

function Town(props, text, position, night) {
    const [hovered, setHover] = useState(false);
    const mesh = useRef();
    /*
    let margin = 0;
    for (let i=0; i < (props.text).length; i++ ){

        margin = margin + 40
    }
    console.log("Margin "+margin)*/

    let color
    if ( props.night == true ){
        color = '#ffffff'
    }
    else{
        color = '#37edcc'
    }
    // actions to perform in current frame
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
      mesh.current.geometry.center();
    });
    
    // load in font
    const font = new THREE.FontLoader().parse(JSONfont);
  
    // configure font mesh
    const textOptions = {
      font,
      size: 100,
      height: hovered ? 0 : 0
    };
    //qqch qui ne se fait pas dans le update !!!!!!!!!!!
  
    return (
      <mesh
        ref={mesh}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        position={[0, 0, -300]}
      >
        <textGeometry  attach="geometry" args={[props.text, textOptions]} />
        <meshBasicMaterial color={hovered ? color : color} />
      </mesh>
    );
}

function Temperature(props, text, position, night) {
  const [hovered, setHover] = useState(false);
  const mesh = useRef();

  /*
  let margin = 0;
  for (let i=0; i < (props.text).length; i++ ){

      margin = margin + 40
  }
  console.log("Margin "+margin)*/

  let color
  if ( props.night == true ){
      color = '#ffffff'
  }
  else{
      color = '#37edcc'
  }
  // actions to perform in current frame
  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    mesh.current.geometry.center();
  });
  
  // load in font
  const font = new THREE.FontLoader().parse(JSONfontQ);

  // configure font mesh
  const textOptions = {
    font,
    size: 100,
    height: hovered ? 0 : 0
  };
  //qqch qui ne se fait pas dans le update !!!!!!!!!!!

  return (
    <mesh
      ref={mesh}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      position={[0, -150, -300]}
    >
      <textGeometry  attach="geometry" args={[props.text, textOptions]} />
      <meshBasicMaterial color={hovered ? color : color} />
    </mesh>
  );
}

class Text extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <group>
            <Town text={this.props.location} night={this.props.night}/>
            <Temperature text={this.props.temperature} night={this.props.night}/>
          </group>
        )
    }
}

export default Text;