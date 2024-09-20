const WeatherController = require('../controllers/WeatherController');
const {client: redisClient} = require("../lib/redis");
const weatherController = new WeatherController(redisClient);

module.exports = [
    {
        method: 'get',
        path: '/weather/find',
        actions: [(req, res) => weatherController.getByCityAndDate(req, res)],
    },
];
