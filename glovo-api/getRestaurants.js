const localityLanguage = 'es';
const httpsHelper = require('./httpsHelper');

function getRestaurants(IATA, user, offset, callback) {
    const options = {
        hostname: `api.glovoapp.com`,
        path: `/v3/feeds/categories/1?cacheId=${IATA}&offset=${offset}`,
        method: 'GET',
        "glovo-delivery-location-latitude": user.lat,
        "glovo-delivery-location-longitude": user.long,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': localityLanguage,
            'Host': '',
            "glovo-location-city-code": `${IATA}`,
            "glovo-app-platform": "web"
        }
    }

    httpsHelper.getHttps(options, async (err, data) => {
        if (err) {
            console.log('Error:', err.message);
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

module.exports = {
    getRestaurants
};