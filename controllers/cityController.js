const WeatherManager = require("../services/WeatherManager");
const CityManager = require('../services/CityManager');

const cityManager = new CityManager();
const cityController = {};

cityController.getById = function (req, res, next) {
    WeatherManager.fetchWeatherInfoByCityId(req.params['id'])
        .then((json) => {
            res.json({
                name: json?.name,
                temperature: json?.main,
                weather: json?.weather,
            });
        })
        .catch(error => {
            res.json({
                error: error
            });
        })
    ;
};

cityController.getList = async function (req, res) {
    try {
        const list = await cityManager.getList();
        return res.json({
            cities: list
        });
    } catch (error) {
        return res.json({
            error: error
        });
    }
};

cityController.createCity = async function (req, res, next) {
    if (!req.body.city_name) {
        return res.status(400).json({
            error: 'City name is required'
        });
    }
    try {
        const [city] = await cityManager.create(req.body.city_name);
        return res.json({
            cityId: city.city_id
        });
    } catch (error) {
        return res.json({
            error: error
        });
    }
};

module.exports = cityController;
