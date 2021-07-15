var Twit = require('twit');

var mongoose = require('mongoose'),
  User = mongoose.model('User');

var T = new Twit({
    consumer_key: 'zZn27EfSz08Mz9QJNqKY55aDj',
    consumer_secret: 'EzvjuWl6lC4Mq2WlCAZRb2GTMc9Wgp0XQIagOCbHxpFeU7R1lt',
    access_token: '1348925369152319488-rIkRbGzIFaWJWiW2IRV2kotxtguO3D',
    access_token_secret: 'vzXunHN5jL0vB7NF3jFUEQ3HDxGDHwCNKl3bW6VrvPqgL'
});

var options = { screen_name: 'CarlosR', count:10 }; // User.service.twitter.username

// exports.getTweets = function(req, res) {
//     var tab = [];
//     T.get('statuses/user_timeline', options,function(err, data) {
//         // console.log(data);
//         for (var i = 0; i < data.length; i++) {
//             console.log(data[i].text);
//             tab.push(data[i].text)
//         }
//         return res.json(tab);
//     })
// };



exports.getTweets = function(req, res) {
    // var params = {
    //     q: 'epitech',
    //     count: 10
    // }
    var params = {
        q: req.body.name,
        count: 10
    }
        var tab = [];
        var obj = {};
        T.get('search/tweets', params,function(err, data) {
            // console.log(data.statuses[0].id);
            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i].text);
            //     tab.push(data[i].text)
            // }

            for(var i= 0; i < data.statuses.length; i++) {
                tab.push(data.statuses[i].id_str)
                console.log(data.statuses[i].id_str);
            }
            obj = {
                tweet: tab
            }
            return res.json(obj);
        })
    };


exports.getTweetsId = function(req, res) {
  var options = {screen_name: req.params.id, count:10 }
  var tab = [];
    T.get('statuses/user_timeline', options,function(err, data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].text);
            tab.push(data[i])
        }
        return res.json(tab);
    })
};

exports.getTimeline = function(req, res) {
    var tab = [];
    console.log("ok")
    // console.log(req)
    console.log(req.body.name)
    var par = { screen_name: req.body.name, count:10 }
    T.get('statuses/user_timeline', par,function(err, data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].text);
            tab.push(data[i].text)
        }
        return res.json(tab);
    })
};

exports.getHomeTimeline = function(req, res) {
    var tab = [];
    console.log("ok")
    // console.log(req)
    console.log(req.body.name)
    var par = { screen_name: req.body.name, name:req.body.name, Name: req.body.name, count:20 }
    T.get('statuses/home_timeline', par,function(err, data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].text);
            tab.push(data[i].text)
        }
        return res.json(tab);
    })
};

exports.twitterAuth = function(req, res) {
    
}