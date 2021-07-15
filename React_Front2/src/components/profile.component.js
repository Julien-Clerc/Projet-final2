import './Profile.css'
import React, { Component, useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { store } from 'react-notifications-component';

import axios from 'axios';

class Profile extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      username: '',
      email: '',
      password: '',
      cf_password: '',
      loggedUser: {username: '', email: '', avatar: ''},
      test: ''
    };

    this.changeAvatar = this.changeAvatar.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCFPassword = this.onChangeCFPassword.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  async componentWillMount() {
    const usr = await axios.get('http://localhost:8087/user/'+this.props.user.id)
    console.log("nouveau user",usr)
    this.setState({loggedUser: {...this.state.loggedUser,
      username: usr.data.username,
      email: usr.data.email,
      avatar: usr.data.avatar
    }})
    console.log(this.state.loggedUser)
    this.setState({
      username: this.state.loggedUser.username,
      email: this.state.loggedUser.email,
      avatar: this.state.loggedUser.avatar
    })
  };


  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeCFPassword(e) {
    this.setState({
      cf_password: e.target.value,
    });
  };

  async getAvatar(image) {
    const img = await this.imageUpload(image);
    return img;
  };

  async handleUpdateProfile(e) {

    e.preventDefault();

    const { username, email, password, cf_password, avatar } = this.state
    console.log(avatar);
    let media;
    if(avatar !== this.state.loggedUser.avatar) {
        media = await this.getAvatar([avatar])
        console.log("media avant upload:", media[0].url)
        // const newAvatar = media[0].url;
        this.updateAvatar(media[0].url);
    }

    if (password) {
      // console.log("mdp", password)
      this.updatePassword(password, cf_password);
    }

    if (username !== this.state.loggedUser.username || email !== this.state.loggedUser.email) {
      // console.log("nom", username)
      
        this.updateProfile(username, email);
      }

      store.addNotification({
        title: "Update success :",
        message: "Your profile has been updated !",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      })
    }

  updateAvatar(avatar) {
    const data = {}

    data['avatar'] = avatar;
    console.log(data)

    fetch('http://localhost:8087/user/'+this.props.user.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // this.getCurrentUser();
    })
    .catch(err => console.log(err))
  }

  updatePassword(password, cf_password) {
    if (password.length < 6 || password.length > 40) {
      console.log("err: password must be between 6 and 40")

      store.addNotification({
        title: "Password error :",
        message: "Your password must be between 6 and 40 characters.",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }

      })
    }
    if (password !== cf_password) {
      console.log("err: password must match confirmation")
      store.addNotification({
        title: "Password error :",
        message: "The confirmation and the password must match.",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }

      })
    }

    if (!(password.length < 6 || password.length > 40) && !(password !== cf_password )) {

      fetch('http://localhost:8087/user/'+this.props.user.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password: password})
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    }

  }

  async updateProfile(username, email) {

    const data = {}

    if (username !== this.state.loggedUser.username) data['username'] = username
    if (email !== this.state.loggedUser.email) data['email'] = email

    console.log(data);

    fetch('http://localhost:8087/user/'+this.props.user.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // this.getCurrentUser();
    })
    .catch(err => console.log(err))

  }

  async getCurrentUser() {
    const usr = await axios.get('http://localhost:8087/user/'+this.props.user.id)
    console.log("nouveau user",usr)

    this.setState({loggedUser: {...this.state.loggedUser,
      username: usr.data.username,
      email: usr.data.email,
      avatar: usr.data.avatar
    }})
    // return {username: usr.data.username, email: usr.data.email}
  }

  changeAvatar(e) {
    // console.log(e.target.files)
    const file = e.target.files[0];
    console.log(file);

    this.setState({
      avatar: file
    });
  }
  
  async imageUpload(images) {
    const CLOUD_UPDATE_PRESET= "nextjs_rotten_tomatoes"
    const CLOUD_NAME = "detolcw1y"
    const CLOUD_API = "https://api.cloudinary.com/v1_1/detolcw1y/image/upload"

    let imgArr = []

    for(const item of images) {
        console.log(item)
        const formData = new FormData();
        formData.append("file",item)
        formData.append("upload_preset",CLOUD_UPDATE_PRESET)
        formData.append("cloud_name",CLOUD_NAME)


        const res = await fetch(CLOUD_API, {
            method: "POST",
            body: formData
        })

        const data = await res.json();
        console.log("response of upload :",data)
        imgArr.push({public_id: data.public_id, url: data.secure_url})

        return imgArr;
    }
  }
  

  render() {

    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    

    return (
      <div className="container profile_page">
        {/* <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken} ...{" "}
          {currentUser.accessToken}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email} <br />
          <strong>Service:</strong> {currentUser.service}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}

        <section className="row text-secondary">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                         'User Profile' 

                    </h3>
                    <div className="avatar">
                        <img src={this.state.loggedUser.avatar === this.state.avatar ? this.state.loggedUser.avatar : 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'} alt="avatar" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" 
                            accept="image/*" onChange={this.changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" name="username" value={this.state.username} className="form-control"
                        placeholder="Your username" onChange={this.onChangeUsername} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email"  value={this.state.email}
                        className="form-control" onChange={this.onChangeEmail} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password" value={this.password} className="form-control"
                        placeholder="Your new password" onChange={this.onChangePassword}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" name="cf_password" value={this.cf_password} className="form-control"
                        placeholder="Confirm new password" onChange={this.onChangeCFPassword}/>
                    </div>

                    <button className="btn btn-info" onClick={this.handleUpdateProfile}>
                        Update
                    </button>

                </div>

                <div className="col-md-8">
                    <h3>Services available</h3>
                    {this.state.loggedUser.username}
                    <br>
                    </br>
                    {this.state.loggedUser.email}
                    <br>
                    </br>
                 
                </div>
            </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);