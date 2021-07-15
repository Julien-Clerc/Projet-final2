import React, { Component, useState } from 'react'
import Button from './ui/Button.jsx'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { BearCounter, useStore } from '../zustand'
import { store } from 'react-notifications-component';
import axios from 'axios'
import Masonry from 'react-masonry-component';

class Radio extends Component {
    constructor (props) {
        super(props)
        this.state = {
          playing: false,
          url:"",
          name:"",
          shortname:"",
          urlsstorage: [],
          isFetching: false,
          data: { id: '', name: '', url: '', shortname: '' },
          globalData: []
        }
        this.handlePlay = this.handlePlay.bind(this)
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this) 
        this.sendRadio = this.sendRadio.bind(this)
        this.removeRadio = this.removeRadio.bind(this) 
        this.fetchRadio = this.fetchRadio.bind(this) 
    }
    handlePlay () {
        this.props.updatePlayer()
    }
    sendRadio(url, name, shortname) {
      var data = JSON.stringify({"url": url,"name": name,"shortname": shortname});

      var config = {
        method: 'post',
        url: 'http://localhost:8087/radio',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      store.addNotification({
          title: "Radio ajoutée !",
          message: "Espérons que ton flux mp3 va marcher.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
      });
    }
    handleChange(event){ 
      this.setState({ 
        // Computed property names 
        // keys of the objects are computed dynamically 
        [event.target.name] : event.target.value
      })
    } 
    handleSubmit(event){ 
      let urlsstorage = this.state.urlsstorage
      const { url, name, shortname } = this.state 
      event.preventDefault()
      //console.log("URL SUBSTRING "+url.substring(0, 3))
      //console.log("URL SUBSTRING "+url.substring(0, 3))
      //verification
      if (typeof url === 'string' && (url.substring(0, 4) == "http" )){
        if ((shortname.length < 4) && typeof shortname === 'string') {
          if ((name.length < 20 ) && typeof name === 'string') {
            if ( shortname != ""){
             urlsstorage.push({url: url, name: name, shortname: shortname})
             //console.log(this.state.urlsstorage)
              
              alert(` 
                ____Your Details____\n 
                Email : ${url} 
                Name : ${name} 
                Age : ${shortname} 
              `)  
              this.sendRadio( url, name, shortname)
            }
            else
            {
              store.addNotification({
                title: "Remplis tous les champs ;)",
                message: "Doucement le matin, pas trop vite l'après-midi.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
            }
          }
          else
          {
            store.addNotification({
              title: "Pas plus de vingt caractères :(",
              message: "Tu aimes défier les règles toi.",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
          }
        }
        else
        {
          store.addNotification({
            title: "Pas plus de trois caractères... ...",
            message: "La règle était pourtant simple !",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        }
      }
      else
      {
        store.addNotification({
          title: "Trouve une vraie URL mec!",
          message: "Vous devez uploader une URL (http/https) valide",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
      }
    }
    removeRadio(id){
      var data = ''

      var config = {
        method: 'delete',
        url: 'http://localhost:8087/radio/'+String(id),
        headers: { },
        data : data
      };

      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    fetchRadio = () => {
      this.setState({...this.state, isFetching: true});
      let dataarray = []
      axios.get("http://localhost:8087/radio")
          .then(response => {
              //console.log("Radios response "+JSON.stringify(response.data))
              let dataStr = JSON.stringify(response.data)
              dataStr = JSON.parse(dataStr)
              //console.log("DATASTR "+dataStr)
              
              dataStr.forEach(element => dataarray.push([element._id, element.name, element.url,  element.shortname]));
              //console.log("HEY IM DATAARRAY "+dataarray[0][0])

              this.setState({ 
                globalData: dataarray
              })
              //response.data.forEach(element => temp = Object.keys(element[1]));
              /*
              for (const item in dataStr) {
                console.log("ITEM "+item)
                this.setState({ data: {...this.state.data,
                   id: item._id,
                   url: item.url,
                   name: item.name,
                   shortname: item.shortname
                  }
                })
                
                console.log(this.state.data)
              }*/
              //console.log("GLOBALDATA :"+JSON.stringify(this.state.globalData[0][1]))
              
          })
          .catch(e => {
              console.log(e);
              this.setState({...this.state, isFetching: false});
          });
    };
    componentDidMount() {
      this.fetchRadio();
      this.timer = setInterval(() => this.fetchRadio(), 3000);
    }
    componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
    }
    render () {
        const { user: currentUser } = this.props;
        console.log("CURRENT USER : "+JSON.stringify(currentUser))
      

        return (
          <div>
            <div>
            <Button onClick={this.handlePlay} className="play-pause">Play/Pause</Button>
            </div>
            <form onSubmit={this.handleSubmit} className="create-radio-form">
            {this.state.alertSubmitted}
                <p className="CTA-text">Hit the button to play, to pause, get next radio by playing again.</p>
                <br/>
                <h4>URL</h4>
                <input type="text" value={this.state.url} name="url" onChange={this.handleChange}/>
                <h4>Name</h4>
                <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                <h4>Shortname ( 3 letters max ):</h4>
                <input type="text" value={this.state.shortname} name="shortname" onChange={this.handleChange}/>
                <br/>
                <br/>
            <button className="create-radio-button radio-button">Create Radio</button> 
            </form>
            <p></p>
              <div>
                <ul className="radio-list">
                <Masonry>
                  {this.state.globalData.map((item, i) => {     
                      //console.log("Entered !!!!!!!");                 
                      // Return the element. Also pass key     
                      return (
                      <div className="masonry-tile">
                        
                          <li key={item}><h4>{item[1]} </h4><br /><em>{item[2]}</em><h5>{item[3]}</h5></li>
                          <button className="delete-radio radio-button" onClick={() => { this.removeRadio(item[0]) }}>removeRadio</button>
                        
                      </div>
                      ) 
                  })}
                  </Masonry>
                </ul>
              </div>

          </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
}
  

export default connect(mapStateToProps)(Radio)