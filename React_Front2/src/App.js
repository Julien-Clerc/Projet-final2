import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import "./App.css";

import axios from "axios"
//notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Login from "./components/login.component";
import Register from "./components/register.component";
// import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import twitter from "./components/twitter/twitter"
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";
import Home from "./components/Home.jsx"
import Test from "./components/Test.jsx"
import Form from "./components/Test2.jsx"
import Radio from "./components/Radio.jsx"
import Player from "./components/radio/Player.jsx"

//twitter

import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//spotify

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import { store } from 'react-notifications-component';

import SpotifyPlayer from './components/spotify/Player'

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <TwitterTimelineEmbed
          sourceType="profile"
          screenName={props.tweet}
          options={{height: 800}}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      snow: 0,
      terraincolor: '#667306',
      fieldcolor: '#f5be18',
      treecolor: '#076931',
      rain: 0,
      state: 0,
      numberclouds: 0,
      roadcolor: '#544c3e',
      town:'quebec',
      bears: 0,
      hintPlayerUpdate: 0,
      playing: false,
      radiocounter: 0,
      displaySpotify: true,
      radioUrl: 'http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3',
      modified: false,
      tweet: 'JulienClerc_Off',
      modalShow: false,
    };

    this.handleButtonSnow = this.handleButtonSnow.bind(this)
    this.handleButtonRain = this.handleButtonRain.bind(this)
    this.showSpotify = this.showSpotify.bind(this)
    this.updatePlayer = this.updatePlayer.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    let yolo= this.state.tweet
    console.log("MY DATA " + yolo)
  };
  
  handleChange(event) {
    this.setState({ 
      // Computed property names 
      // keys of the objects are computed dynamically 
      [event.target.name] : event.target.value
    })
  };
  
  showSpotify(){
    if ( this.state.displaySpotify == false ){
      this.setState({
        displaySpotify: true
      })
    }
    else
    {
      this.setState({
        displaySpotify: false
      })
    }
  }

  handleButtonSnow(){
    if ( this.state.snow == 0 ){
      this.setState({
        snow: 100,
        terraincolor: '#ffffff',
        fieldcolor: '#dedede',
        treecolor: '#ffffff',
        state: 1,
        numberclouds: 50,
        cloudscolor: '#ffffff',
        roadcolor: '#ffffff'
      })
    }
    else
    {
      this.setState({
        snow: 0,
        terraincolor: '#516e20',
        fieldcolor: '#fcc305',
        treecolor: '#006335',
        numberclouds: 0,
        cloudscolor: '#ffffff',
        roadcolor: '#544c3e'
      })
    }
  }
  handleButtonRain(){
    if ( this.state.rain == 0 ){
      this.setState({
        rain: 100,
        terraincolor: '#095c02',
        fieldcolor: '#542704',
        treecolor: '#024712',
        numberclouds: 50,
        cloudcolors: '#ffffff'
      })
    }
    else
    {
      this.setState({
        rain: 0,
        numberclouds: 0,
        terraincolor: '#516e20',
        fieldcolor: '#fcc305',
        treecolor: '#006335',
        numberclouds: 0,
        cloudscolor: '#ffffff'
      })
    }
  }

  /*getRadioState(){
    
    
    this.setState({
      playing: statez.bears
    });
    return null
  }*/

  updatePlayer() {
    let radiourls = this.state.urls
    

    let radioUrlsIndex = []
    radiourls.forEach(item => {
      radioUrlsIndex.push(item[0])
    });


    console.log("URLS are in player "+radiourls)
    const radioUrls = radioUrlsIndex
    this.setState({
      hintPlayerUpdate: this.state.hintPlayerUpdate + 5,
      radiocounter: this.state.radiocounter + 1
    })

    if ((this.state.radiocounter/2) < radioUrls.length){
      if (this.state.playing == false){
        this.setState({
          modified: false,
          playing: true,
          radioUrl: radioUrls[this.state.radiocounter/2]
        })
      }
      else
      {
        this.setState({
          modified: true,
          playing: false,
        })
      }
    }
    else if (this.state.radiocounter == (radioUrls.length)*2)
    {
      this.setState({
        modified: false,
        playing: true,
        radiocounter: 1,
        radioUrl: radioUrls[0]
      })
    }
    else{
      this.setState({
        modified: false,
        playing: true,
        radiocounter: 1,
        radioUrl: radioUrls[0]
      })
    }
  }

  async componentDidMount() {

   //axios
   var data = '';

   var config = {
     method: 'get',
     url: 'http://localhost:8087/radio',
     headers: { },
     data : data
   };

   let radioarray

   await axios(config).then(function (response) {
     const radio = response.data
     radioarray = radio
   })
   .catch(function (error) {
     console.log(error);
   });

     const urlsFiller = []

     const radioCleaned = radioarray.map(item => {
       urlsFiller.push([String(item.url), String(item.name)])
     })

     this.setState({
       urls: urlsFiller
     })

    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
  }

  async componentDidUpdate(){
    if (this.state.modified == true){
      //axios
    var data = '';

    var config = {
      method: 'get',
      url: 'http://localhost:8087/radio',
      headers: { },
      data : data
    };

    let radioarray

    await axios(config).then(function (response) {
      const radio = response.data
      radioarray = radio
    })
    .catch(function (error) {
      console.log(error);
    });

      const urlsFiller = []

      //console.log("radiodata " +radioarray)
      const radioCleaned = radioarray.map(item => {
        //console.log("ITEMS" + JSON.stringify(item.url))
        urlsFiller.push([String(item.url)])
      })

      this.setState({
        urls: urlsFiller,
        modified: false,
      })
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Router history={history}>
        <div>
          <SpotifyPlayer currentUser={this.state.currentUser} toto={"toto"} displaySpotify={this.state.displaySpotify}  showSpotify={this.showSpotify}/>
          <ReactNotification />
          <Player hintPlayerUpdate = { this.state.hintPlayerUpdate } playing = { this.state.playing } radioUrl={ this.state.radioUrl } radiocounter={this.state.radiocounter}/>
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to={"/"} className="navbar-brand">
              <p>{this.state.radiocounter}</p>            
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"radio"} className="nav-link">
                    Radio
                  </Link>
                </li>
              )}
              {currentUser && (
                <li>
                    <form onSubmit={this.handleSubmit}>
                    <input name='tweet' type='text' id='twitter' onChange={this.handleChange} value={this.state.tweet} class="form-control" />
                    <Link onClick={() => this.setState({ modalShow: this.state.modalShow= true })} className="nav-link">Twitter Timeline</Link>
                    </form>
                      <>
                    <MyVerticallyCenteredModal 
                      tweet={this.state.tweet}
                      show={this.state.modalShow}
                      onHide={() => this.setState({ modalShow: this.state.modalShow= false })} />
                    </>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
                
              </div>

            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/welcome"} className="nav-link">
                    Welcome
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/radio"} className="nav-link">
                    Radio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/form"} className="nav-link">
                    Form
                  </Link>
                </li>
              </div>
            )}
              
          </div>
          </nav>


          <div className="">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={BoardUser} />
                <Route path="/welcome" component={Test} />
                <Route path="/form" component={Form} />
                <Route path="/twitter" component={twitter} />
                {/* <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} /> */}
              </Switch>
              <Route
                exact path='/radio'
                render={props => <Radio 
                updatePlayer={this.updatePlayer}
              />}/>
              <Route
                exact path='/home'
                render={props => <Home 
                  snow={this.state.snow}
                  rain={this.state.rain}
                  terraincolor={this.state.terraincolor}
                  state={this.state.state}
                  fieldcolor={this.state.fieldcolor}
                  treecolor={this.state.treecolor}
                  numberclouds={this.state.numberclouds}
                  cloudscolor={this.state.cloudcolors}
                  location={this.state.location}
                  roadcolor={this.state.roadcolor}
                  town={this.state.town}
                  updatePlayer={this.updatePlayer}
                  showSpotify={this.showSpotify}
              />}/>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);


/*Optional snow and rain button
<div className='coucou'>
              <button onClick={this.handleButtonSnow}>Snow</button>
              <button onClick={this.handleButtonRain}>Rain</button>
            </div>*/