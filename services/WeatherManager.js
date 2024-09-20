const https = require('https');
const City = require('../models/sequelize/City');

class WeatherManager {
    static fetchWeatherInfoByCityId(cityId) {
        return new Promise((resolve, reject) => {
            City.findByPk(cityId)
                .then(city => {
                    if (!city) {
                        reject('City not found');
                        return;
                    }
                    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=455b229f09ae12e2c4dfbd2eec62ecf8`, (res) => {
                        if (res.statusCode !== 200) {
                            reject(`Did not get an OK from the server. Code: ${res.statusCode}`)
                            res.resume();
                            return;
                        }

                        let data = '';
                        res.on('data', (chunk) => {
                          data += chunk;
                        });

                        res.on('close', () => {
                          console.log('Retrieved all data');
                          resolve(JSON.parse(data));
                        });
                    });
                })
                .catch(error => {
                    reject(error)
                })
        });
    }
}

module.exports = WeatherManager;
