import React, { useRef, Suspense, Component } from 'react'
import { useGLTF, useAnimations } from "@react-three/drei";


//Checker react.useRef mais dans un component


function Hut(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('scene.gltf')
    const { actions } = useAnimations(animations, group)
    return (
      <group ref={group} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-502.64, 422.99, -132.71]}>
              <group
                name="������������_��������������_2"
                position={[-10.87, 231.34, -23.05]}
                rotation={[Math.PI / 2, -0.91, -Math.PI]}>
                <group position={[13.88, -40, -33.71]} rotation={[1.77, -0.46, -2.71]}>
                  <mesh
                    material={materials.material_2}
                    geometry={nodes['������������_������_����������������2_0'].geometry}
                  />
                </group>
                <mesh
                  material={materials.material_2}
                  geometry={nodes['������������_��������������_2_����������������2_0'].geometry}
                />
              </group>
              <group position={[21.39, -295, 98.38]}>
                <mesh
                  material={materials.material}
                  geometry={nodes['������������_������_2_����������������_0'].geometry}
                />
                <mesh
                  material={materials.material}
                  geometry={nodes['������������_������_2_����������������_0_1'].geometry}
                />
              </group>
              <group position={[-10.52, 63.66, -75.33]} rotation={[Math.PI, 0, Math.PI]}>
                <mesh material={materials.material_1} geometry={nodes['rr_����������������1_0'].geometry} />
              </group>
            </group>
          </group>
        </group>
      </group>
    )
}

useGLTF.preload('/Cottage.glb')
    
class Farm extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Suspense fallback={null}>
            <Hut scale={[0.03, 0.03, 0.03]} position={[5.5, 5, -20]}/>
          </Suspense>
        )
    }
}

export default Farm;