const axios = require('axios');

const API_KEY = '0b91f11857d7f6ab1d3790a85730c44f';

exports.getNews = async function (req, res) {
    console.log('The news service is ready')

    const keyWord = req.body.keyword;

    const result = await axios.get('http://api.mediastack.com/v1/news?access_key='+ API_KEY +'&countries=fr&keywords='+ keyWord);

    const news = {
        news: result.data,
        data: {
            author: "",
            title: "",
            description: "",
            url: "",
            source: "",
            image: "",
            category: "",
            language: "",
            country: "",
            published_at: ""
        }
    }

    return res.json(news);

};
