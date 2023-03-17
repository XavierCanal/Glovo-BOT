const https = require('https');
const localityLanguage = 'es';
const DB = require("../data/cities-IATA.json")

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

function getCityIATAByName (cityName) {
  const city = DB.codes.find((city) => city.cityName === cityName);
  if (!city) {
    return "[ERROR] Can't find an IATA code for this city.";
  }
  return city.IATA;
}

module.exports =  {
  reverseGeocode, getCityIATAByName
}
