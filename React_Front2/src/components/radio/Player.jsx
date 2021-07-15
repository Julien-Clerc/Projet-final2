import { useStore } from '../../zustand'
import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import { store } from 'react-notifications-component';

class Player extends Component {
    constructor(props){
        super(props)
        this.state = {
            bears: 0,
        }
    }
    async componentDidUpdate() { 
      if (this.props.playing === true && this.props.radiocounter < 2 ){
        store.addNotification({
          title: "Radio playing",
          message: "Radio playing... nicely. Pause and play again to get next channel.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 7000,
            onScreen: true
          }
        })
      }
    }
    render(){
      return (
          <div className="player">
                  <ReactHowler
                  src={this.props.radioUrl}
                  format= {['mp3', 'aac']}
                  html5={true}
                  playing={this.props.playing}
                  />
          </div>
      );
    }
}
export default Player

