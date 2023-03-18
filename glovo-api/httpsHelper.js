const https = require("https");

function getHttps(options, callback) {
    https.get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            callback(null, JSON.parse(data));
        });
    }).on('error', (err) => {
        console.log('Error:', err.message)
        callback(err);
    });
    }

module.exports = {
    getHttps
};