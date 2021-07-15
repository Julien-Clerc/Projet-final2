const axios = require('axios');

exports.getIss = async function (req, res) {
    console.log('The ISS service is ready')


    const result = await axios.get('http://api.open-notify.org/iss-now.json');

    const position = {
        position: result.data
    };

    return res.json(position);

};