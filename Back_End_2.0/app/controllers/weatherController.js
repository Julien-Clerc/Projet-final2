const axios = require('axios');

const API_KEY = '8d23c2c814d8bc6ea19d77c49f3cc746';

exports.getWeather = function(req, res) {
    console.log("ok weather service")

    const cityName = req.body.city;

    const result = null;

    // const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
        .then(result => {
            // console.log(result);
            let rise = new Date(result.data.sys.sunrise*1000)
            let set = new Date(result.data.sys.sunset*1000)

            let riseTime = rise.getHours();
            let setTime = set.getHours();

            //on arrondi les heures de lever / ocucher aux 30 min pres
            rise.getMinutes() > 30 ? riseTime++ : riseTime
            set.getMinutes() > 30 ? setTime++ : setTime
            // console.log(riseTime)
            // console.log(rise.getHours(), rise.getMinutes())

            //on calcule la durée totale de jour : heure de coucher - lever
            const daylight = setTime - riseTime;

            //on définit l'heurre actuelle
            let currentTime = Date.now()
            currentTime = new Date(currentTime).getHours()


            const weather = {
                weather: result.data,
                sun: {
                    rise: riseTime,
                    set: setTime,
                    daylight: daylight
                },
                time: currentTime
            }
            console.log(weather)
            return res.json(weather);
        })
        .catch( error =>
            console.log(error)
        );
};