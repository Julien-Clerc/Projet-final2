import React, { useRef, useState, Component, useContext, context } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
import { softShadows, Sky, Stars, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useSpring, a } from 'react-spring/three'
import JSONfont from "../fonts/Cocogoose.json"
import axios from 'axios'
import ReactHowler from 'react-howler'

//JSX
import Farm from "./three/Farm.jsx"
import Twitter from "./three/TwitterBird.jsx"
import Trees from "./three/Feuillage.jsx"
import Text from "./three/Text.jsx"
import Map from "./three/Map.jsx"
import Disc from "./three/Disc.jsx"
import Mist from "./three/Mist.jsx"
import AmericanFlag from "./three/AmericanFlag.jsx"

var night = false
//const hourtest = 12

function azimuth(daystart, daylength, weather, description){
  //Get current geographic hour
  var d = new Date();
  //get current hour
  var currenthour = d.getHours();

  //get by API
  daystart = Number(daystart)
  daylength = Number(daylength)

  //Ex : Valeur de départ Azimuth: 0.1171
  //Ex : Valeur de fin Azimuth: 0.3882
  //Ex : longueur totale de la translation d'azimuth : 0.3882 - 0.1171
  let total = 0.5

  //déclaration de la valeur courante
  let azimuthNow

  azimuthNow = (total * (currenthour-daystart))/daylength

  //sets night to true if night it is
  if ( (currenthour > (daylength + daystart)-1)||(currenthour < daystart) ){
    night = true
  }
  else
  {
    night = false
  }

  return azimuthNow
}

function inclination(daystart, daylength){
  //Get current geographic hour
  var d = new Date();
  //get current hour
  var currenthour = d.getHours();
  daystart = Number(daystart)
  daylength = Number(daylength)

  //get by API
  let noon = daylength/2 + daystart //midi = la moitié de la journée de soleil + l'heure de démarrage
  //soit pour un jour d'ensoleillement de 11h = 11/2 + 6 = 11.5

  //currenthour = hourtest

  //Ex : Valeur de départ Inclination: 0.1171
  //Ex : Valeur de fin Inclination: 0.3882
  //Ex : longueur totale de la translation d'azimuth : 0.3882 - 0.1171
  let total = 0.5 - 0.388

  //déclaration de la valeur courante
  let inclinationNow

  

  if (currenthour < noon) {
    inclinationNow = (currenthour - daystart) * total / (daylength/2);
  }
  else
  {
    let diffHour = noon - (currenthour - noon)
    inclinationNow = (diffHour - daystart) * total / (daylength/2);
  }

  return inclinationNow + 0.5
  /*
  azimuth
  0.1171
  0.3882

  inclination
  0.5
  0.388
  0.5

  exposure
  0.1171   */
}

// soft Shadows
softShadows();

//globals
var forestNumber = []
const numbertrees = 300
const numberclouds = 100

const Rain = ({ position, color, args, numberrain }) => {

  var rainpositions = []
  for (let i = 0; i < numberrain; i++) {
      let rainNewPosX = getRandomInt(45);
      let rainNewPosZ = getRandomInt(45); 
      let object = {
        x: rainNewPosX,
        y: 40+getRandomInt(10),
        z: rainNewPosZ
      }
      rainpositions.push(object)
  }


  //ref to target the mesh
  const grouprain = useRef();

  //useFrame allows us to re-render/update on each frame
  useFrame(() => {
    if (grouprain.current == null ){
    }
    else
    {
      if (grouprain.current.position.y >= -40){
        grouprain.current.position.y = grouprain.current.position.y -= 1.2
      }
      else
      {
        grouprain.current.position.y = 5;
      }
    }
  });

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return  (
    <group ref={grouprain}>
      { rainpositions.map((d, index) =>  (
      <a.mesh
        position={[d.x, d.y, d.z]}
        key={index}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <meshBasicMaterial color={color} />
      </a.mesh>
    ))}
    </group>
  );
};

const Snow = ({ position, color, args, numbersnow }) => {

  var snowpositions = []
  for (let i = 0; i < numbersnow; i++) {
      let snowNewPosX = getRandomInt(45);
      let snowNewPosZ = getRandomInt(45); 
      let object = {
        x: snowNewPosX,
        y: 40+getRandomInt(10),
        z: snowNewPosZ
      }
      snowpositions.push(object)
  }


  //ref to target the mesh
  const groupsnow = useRef();

  //useFrame allows us to re-render/update on each frame
  useFrame(() => {
    if (groupsnow.current == null ){
      //console.log("groupsnow null")
    }
    else
    {
      if (groupsnow.current.position.y >= -40){
        groupsnow.current.position.y = groupsnow.current.position.y -= 1.2
      }
      else
      {
        groupsnow.current.position.y = 5;
      }
    }
  });

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return  (
    <group ref={groupsnow}>
      { snowpositions.map((d, index) =>  (
      <a.mesh
        position={[d.x, d.y, d.z]}
        key={index}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <sphereBufferGeometry attach='geometry' args={args} />
        <meshBasicMaterial color={color} />
      </a.mesh>
    ))}
    </group>
  );
};

function Clouds(props, color, number) {
  var cloudpositions = []
  for (let i = 0; i < props.number; i++) {
      let cloudNewPosX = getRandomInt(45);
      let cloudNewPosY = 50+getRandomInt(15); 
      let cloudNewPosZ = getRandomInt(45);
      let object = {
        x: cloudNewPosX,
        y: cloudNewPosY,
        z: cloudNewPosZ
      } 
      cloudpositions.push(object)
  }

  const groupclouds = useRef();

  //Basic expand state
  const [expand, setExpand] = useState(false);

  return  (
    <group ref={groupclouds}>
      { cloudpositions.map((d, index) =>  (
      <a.mesh
        position={[d.x, d.y, d.z]}
        key={index}
        onClick={() => setExpand(!expand)}
        scale={[ 20, 8, 20 ]}
        castShadow
        receiveshadow>
        <boxBufferGeometry attach="geometry" args={d.args} />
        <a.meshPhysicalMaterial attach="material" color={props.color} roughness={0} opacity={0.8} transparent={true} />
      </a.mesh>
    ))}
    </group>
  );
}
/*
function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ camera }) => {
    camera.position.z = 200
  })
  return null
}*/

function Lights() {
  return (
    <group>
      <pointLight intensity={1} />
      <ambientLight intensity={0.3} />
      <spotLight
        castShadow
        intensity={0.1}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) - Math.floor(Math.random() * Math.floor(max));
}

function cloudsNumber(val="Clear"){
  if (val == "Clear"){
    return 0
  }
  else if (val == "Rain"){
    return 30
  }
  else if (val == "Snow"){
    return 30
  }
  else if (val == "Thunderstorm"){
    return 100
  }
  else if (val == "Drizzle"){
    return 20
  }
  else if (val == "Clouds"){
    return 50
  }
  else if (val == "Mist"){
    return 5
  }
  else{
    return 2
  }
}

function GetNumberRain(propval, val="Clear"){
  if (propval == 0){
    if (val == "Clear"){
      return 0
    }
    else if (val == "Rain"){
      return 100
    }
    else if (val == "Snow"){
      return 0
    }
    else if (val == "Thunderstorm"){
      return 20
    }
    else if (val == "Drizzle"){
      return 0
    }
    else if (val == "Clouds"){
      return 0
    }
    else if (val == "Mist"){
      return 3
    }
    else{
      console.log("RainNumber "+val)
      return 2
    }
  }
  else
  {
    return propval
  }
}

function GetNumberSnow(propval, val="Clear"){
  if (propval == 0){
    if (val == "Clear"){
      return 0
    }
    else if (val == "Rain"){
      return 0
    }
    else if (val == "Snow"){
      return 100
    }
    else if (val == "Thunderstorm"){
      return 20
    }
    else if (val == "Drizzle"){
      return 0
    }
    else if (val == "Clouds"){
      return 0
    }
    else if (val == "Mist"){
      return 3
    }
    else{
      return 2
    }
  }
  else
  {
    return propval
  }
}

function MistChecker(val="Clear"){
  if (val == "Mist"){
      return 1
  }
  else
  {
    console.log("VALCHECKER "+val)
    return 0
  }
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          rise: '8',
          set: null,
          daylight: '10',
          numberclouds: null,
          temperature: '0',
          town: 'Undefined',
          weather: "",
          description: "toto",
          terraincolor: this.props.terraincolor,
          fieldcolor: this.props.fieldcolor,
          roadcolor: this.props.roadcolor,
          treecolor: this.props.treecolor,
          playing: false
        }
    }

    snowManager(weather){
      if ( weather == "Snow" ){
        this.setState({
          terraincolor: "#ffffff",
          fieldcolor: "#ffffff",
          roadcolor: "#ffffff",
          treecolor: "#ffffff"
        })
        console.log("EQUAL !!!")
      } 
    }
    async componentDidMount() {

      var data = JSON.stringify({"city": this.props.town});
      // https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=8d23c2c814d8bc6ea19d77c49f3cc746
      var config = {
        method: 'post',
        url: 'http://localhost:8087/weather',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      let meteodata

      await axios(config).then(function (response) {
        const meteo = response.data
        meteodata = meteo
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        rise: JSON.stringify(meteodata.sun.rise),
        set: JSON.stringify(meteodata.sun.set),
        daylight: JSON.stringify(meteodata.sun.daylight),
        numberclouds: Number(JSON.stringify(meteodata.weather.clouds.all)),
        temperature: String((Number(JSON.stringify(meteodata.weather.main.temp))-273.15).toFixed(2)),
        weather: meteodata.weather.weather[0].main,
        description: meteodata.weather.weather[0].description,
        town: this.props.town,
      })
      this.snowManager(meteodata.weather.weather[0].main)
    }
    homeUppercase(val='Undefined'){
      val = val.toUpperCase()
      return val
    }
    render(){
        return(
          <div className="fixedCanvas" >
              <Canvas style={{height:"100vh",width:"100vw",backgroundColor:"#abfff5"}}>
                <Sky
                  distance={45000} // Camera distance (default=450000)
                  inclination={inclination(this.state.rise, this.state.daylight)} // Sun elevation angle from 0 to 1 (default=0)
                  azimuth={azimuth(this.state.rise, this.state.daylight, this.state.weather, this.state.description )} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
                  turbidity={20}
                  rayleigh={4}
                  exposure={1000}
                />
                <Lights />
                <OrbitControls minDistance={[180]} maxDistance={[300]}/>
                <Trees treecolor={this.state.treecolor}/>
                <Clouds color={this.props.cloudscolor} number={cloudsNumber(this.state.weather)}/>
                <Text 
                  location={this.homeUppercase(this.state.town)} night={night}
                  temperature={this.state.temperature + " °"}
                />
                <Snow
                    color='white'
                    args={[1, 1, 1]}
                    numbersnow = {GetNumberSnow(this.props.snow, this.state.weather)}
                />
                <Rain
                    color='grey'
                    args={[0.3, 10, 0.3]}
                    numberrain = {GetNumberRain(this.props.rain, this.state.weather)}
                />
                <Mist mistTrue={MistChecker(this.state.weather)}/>
                <Map 
                  terraincolor={this.props.terraincolor, this.state.terraincolor} 
                  fieldcolor={this.state.fieldcolor}
                  roadcolor={this.state.roadcolor}
                />
                {night = true &&
                  <Stars
                    radius={200} // Radius of the inner sphere (default=100)
                    depth={50} // Depth of area where stars should fit (default=50)
                    count={5000} // Amount of stars (default=5000)
                    factor={4} // Size factor (default=4)
                    saturation={0} // Saturation 0-1 (default=0)
                    fade // Faded dots (default=false)
                  />
                }
                  <Farm />
                  <Twitter />
                  <Disc updatePlayer={this.props.updatePlayer}/>
                  
              </Canvas>
          </div>
        )
    }
}

export default Home;

/*<Stars
radius={100} // Radius of the inner sphere (default=100)
depth={50} // Depth of area where stars should fit (default=50)
count={5000} // Amount of stars (default=5000)
factor={4} // Size factor (default=4)
saturation={0} // Saturation 0-1 (default=0)
fade // Faded dots (default=false)

  
            <Farm />
<AmericanFlag/>
            <Rain
                color='grey'
                args={[0.3, 10, 0.3]}
                numberrain = {this.props.rain}
            />
            <Snow
                color='white'
                args={[1, 1, 1]}
                numbersnow = {this.props.snow}
            />
            <Suspense fallback={null}>
              <TwitterBird position={[100, 100, 10]} rotation={[-0.5, 0.5, 0]}/>
            </Suspense>
<Groupfarm scale={[0.02, 0.02, 0.02]} position={[3, 5, -3]}/>
            

/>*/