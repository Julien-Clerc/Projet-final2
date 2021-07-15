let express = require('express')
let request = require('request')
let querystring = require('querystring')

const SPOTIFY_CLIENT_ID = 'a0fb0c01163c44a99a1439f290d1d463';
const SPOTIFY_CLIENT_SECRET = '83340a0cdb644332a3301149e01c1901';


let app = express()

const redirect_uri = 'http://localhost:8087/callback';

exports.spotifyLogin = async (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state user-read-playback-state',
      redirect_uri
    }))
}

exports.spotifyRedirection = (req, res) => {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
}

// let port = PORT || 8087
// console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
// app.listen(port)