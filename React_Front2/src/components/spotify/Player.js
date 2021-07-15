import './Player.css'

import React, { useEffect, useState } from "react";

import queryString from 'query-string'


import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { connect } from "react-redux";
import { Grid, Slider } from "@material-ui/core";




function SpotifyPlayer(props) {

    var display = props.displaySpotify
    const currentUser = props.currentUser;
    console.log("CURRENT USER PLAYER SPOTIFY : "+JSON.stringify(currentUser))

    const [tokenData, setTokenData] = useState(null)
    const [playing, setPlaying] = useState(false)
    const [inPlaylist, setInPlaylist] = useState(false)

    const [songCurrentlyPlayed, setSongCurrentlyPlayed] = useState(null)
    const [playerData, setPlayerData] = useState(null)
    const [currentPlaylist, setCurresntPlaylist] = useState(null)
    const [allPlaylists, setAllPlaylists] = useState(null)


    const getPlayerData = async () => {
      console.log("ancienne chanson: :", playerData)

      fetch('https://api.spotify.com/v1/me/player', {
        headers: {'Authorization': 'Bearer '+tokenData }
        })
        .then(response => response.json())
        .then( data => {
          console.log("nouvelle chanson", data);
          setPlayerData(data); //on ajoute les données du morceau dans playerData
          setPlaying(true);
        }).catch(err => {
          setPlayerData(null)
        })

    }


    function timer() {
      this.timer = setInterval(() => this.fetchRadio(), 3000);
    }



    useEffect(() => {
    let parsed = queryString.parse(window.location.search)
    console.log(parsed)
    const spotifytoken = parsed.access_token;

    if (spotifytoken) {
        //on set le token
        setTokenData(spotifytoken)
    
      const timer = setInterval(() => {
        fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer '+spotifytoken }
        })
        .then(response => response.json())
        .then( data => {
          console.log(data);

        })
        

        fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {'Authorization': 'Bearer '+spotifytoken }
        })
        .then(response => response.json())
        .then( data => {
          if (data) {
            console.log(data);
            setPlaying(true);
            setInPlaylist(true)

          }
          else {
            setInPlaylist(false)
            setPlaying(false);
          }
        }).catch(err => {
          setPlaying(false);
        })


        fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer '+spotifytoken }
        })
        .then(response => response.json())
        .then( data => {
          console.log(data);
          if (data.items.length > 0){
            setAllPlaylists(data);
          }
        })
        

        // getPlayerData();
        fetch('https://api.spotify.com/v1/me/player', {
        headers: {'Authorization': 'Bearer '+spotifytoken }
        })
        .then(response => response.json())
        .then( data => {
          console.log(data);
          setPlayerData(data); //on ajoute les données du morceau dans playerData
        }).catch(err => {
          setPlayerData(null)
        })


      }, 3000);
    }


    

    }, [])

    const  nextSong = async () => {
      console.log(tokenData)
      fetch('https://api.spotify.com/v1/me/player/next', 
      
      {
          headers: {'Authorization': 'Bearer '+tokenData },
          method: "POST"
      })
          .then(getPlayerData())
          .catch(err => console.log(err))
        getPlayerData();   
    }

    const prevSong = () => {
      console.log(tokenData)
      fetch('https://api.spotify.com/v1/me/player/previous', 
      
      {
          headers: {'Authorization': 'Bearer '+tokenData }
      ,method: "POST"
      })
        .then(getPlayerData())
        .catch(err => console.log(err))
      getPlayerData();   
    }

    const handlePlayPause = () => {

      // if (inPlaylist) {

        // if (playing && isCurrentlyPlaying) {
        if (playing) {
          setPlaying(false)
          fetch('https://api.spotify.com/v1/me/player/pause', 
        
        {
            headers: {'Authorization': 'Bearer '+tokenData }
        ,method: "PUT"
        })
            .then(response => response.json())
            .then( data => console.log(data))
            .catch(err => console.log(err))
        } else {
          setPlaying(true)
          fetch('https://api.spotify.com/v1/me/player/play', 
        
        {
            headers: {'Authorization': 'Bearer '+tokenData }
        ,method: "PUT"
        })
            .then(response => response.json())
            .then( data => console.log(data))
            .catch(err => console.log(err))

        }
      // }
      //   else {
      //     if(allPlaylists) {
      //       console.log("on lance une playlist random de l'user")
      //       console.log(allPlaylists.items[0])
      //         fetch('https://api.spotify.com/v1/me/player/play', 
          
      //     {
      //         headers: {'Authorization': 'Bearer '+tokenData }
      //     ,method: "PUT",
      //     data: JSON.stringify({'context_uri': 'spotify:playlist:'+allPlaylists.items[0].id})
      //     })
      //         .then(response => response.json())
      //         .then( data => console.log(data))
      //         .catch(err => console.log(err))
      //       }
      //   }
      }
    

    console.log("CURRENT USER BEFORE IF "+ currentUser)
    if (currentUser != undefined){
      if (display != false){
        return (
            <div className="player" >
                <button className="show-spotify-controls" onClick={props.showSpotify}>Close</button>
                  <div className="footer" style={{display: "flex"}}>
                    {
                      !tokenData
                    ?  <div className="login"> <a href={'http://localhost:8087/spotify/login'}>LOGIN TO SPOTIFY</a> </div>
                    
                    : //si on veut un player sur toute la largeur, on enlève cette div
                    <div className="footer"> 

                      <div className="footer__left"> 
                      {
                        playerData 
                        ? (
                        <div className="footer__left">
                          <img className="songRow__album" src={playerData.item.album.images[2].url} alt={playerData.item.name} />

                            <div className="footer__songInfo">
                              <h4>{playerData.item.name}</h4>
                              <p>{playerData.item.artists.map((artist) => artist.name).join(", ")}</p>
                            </div>
                        </div>
                        ) : (
                          <div className="footer__songInfo">
                            <h4>No song is playing</h4>
                            <p>...</p>
                          </div>
                        )}
                      
                      </div>

                      <div className="footer__center">
                        <ShuffleIcon className="footer__green" />
                        <SkipPreviousIcon onClick={prevSong} className="footer__icon" />
                        {
                          !playing 
                          ?
                          <PlayCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                          />
                          :
                          <PauseCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                          />

                        }
                          
                        <SkipNextIcon onClick={nextSong} className="footer__icon" />
                        <RepeatIcon className="footer__green" />
                      </div>
                    
                      <div className="footer__right">
                        <Grid container spacing={2}>
                          <Grid item>
                            <PlaylistPlayIcon />
                          </Grid>
                          <Grid item>
                            <VolumeDownIcon />
                          </Grid>
                          <Grid item xs>
                            <Slider aria-labelledby="continuous-slider" />
                          </Grid>
                        </Grid>
                      </div>
                  </div>
                }
                </div>
            </div>
          )
          }
          else
          {
            return(
              <div>
                <button className="show-spotify-controls" onClick={props.showSpotify}>Show Spotify Controls</button>
              </div>
            )
          }
      }
      else
      {
        return(
          <div>
            
          </div>
        )
      }
    }

    export default SpotifyPlayer;