const https = require('https');
const localityLanguage = 'es';

function reverseGeocode(latitude, longitude, callback) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${localityLanguage}`;

  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, JSON.parse(data));
    });
  }).on('error', (err) => {
    callback(err);
  });
}

module.exports = reverseGeocode, reverseGeocode;
