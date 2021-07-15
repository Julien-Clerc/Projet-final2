'use strict';
module.exports = function(app) {
    var serviceHandlers = require('../controllers/twitterController.js');
    // Twitter Routes
    app.route('/tweet')
        .post(serviceHandlers.getTweets);
    app.route('/tweet/:id')
        .get(serviceHandlers.getTweetsId);
    app.route('/tweetHomeTimeline')
        .get(serviceHandlers.getHomeTimeline);

    //Weather Route

    var weatherService = require('../controllers/weatherController.js')
    
    app.route('/weather')
        .post(weatherService.getWeather)

    //spotify routes
    
    var spotifyService = require('../controllers/spotifycontroller');

    app.route('/spotify/login')
        .get(spotifyService.spotifyLogin);
    app.route('/callback')
        .get(spotifyService.spotifyRedirection);

    //News route

    var newsService = require('../controllers/newsController');

    app.route('/news')
        .post(newsService.getNews);

    //ISS route

    var issService = require('../controllers/issController');

    app.route('/iss')
        .get(issService.getIss);
};