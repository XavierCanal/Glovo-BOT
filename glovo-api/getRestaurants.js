const https = require('https');
const localityLanguage = 'es';

function getRestaurantsByIATA(LOT, offset, callback) {
  const options = {
    hostname : `https://api.glovoapp.com/v3/feeds/categories/1?cacheId=${LOT}&offset=${offset}`,
    method: 'GET',
    "glovo-delivery-location-latitude": "42.385063",
    "glovo-delivery-location-longitude": "3.4831655",
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': localityLanguage,
    }
  }
  const url = `https://api.glovoapp.com/v3/feeds/categories/1?cacheId=${LOT}&offset=${offset}`;
  console.log("URL: ", url)

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
  getRestaurantsByIATA
};