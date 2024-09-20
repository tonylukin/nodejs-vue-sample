const {RequestLimitService} = require("../services/RequestLimitService");
const AppDataSource = require("../config/dataSource");
const {WeatherItem} = require("../models/WeatherItem");

const CACHE_TTL = 5 * 60;

class WeatherController {

    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    async getByCityAndDate(req, res) {

        if (!req.query.city_name) {
            return res.status(400).json({
                error: 'City name is required'
            });
        }
        if (!req.query.date) {
            return res.status(400).json({
                error: 'Date is required'
            });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(req.query.date)) {
            return res.status(400).json({
                error: 'Date is incorrect'
            });
        }

        // todo use event emitter
        const requestLimitService = new RequestLimitService();
        const requestAllowed = await requestLimitService.checkLimit(res.locals.user_id);
        if (!requestAllowed) {
            return res.status(403).json({
                error: 'You have reached requests limit'
            });
        }

        const CACHE_KEY = `__weather_cache_key_${req.query.city_name}_${req.query.date}`;
        const cachedData = await this.redisClient.get(CACHE_KEY);
        if (cachedData) {
            return res.json({
                weatherItem: JSON.parse(cachedData)
            });
        }

        const repository = AppDataSource.default.getRepository(WeatherItem);
        const weatherItem = await repository
            .createQueryBuilder('weatherItem')
            .innerJoin('weatherItem.city', 'city')
            .where('LOWER(city.name) = LOWER(:cityName) AND DATE(weatherItem.createdAt) = DATE(:date)', {
                cityName: req.query.city_name,
                date: req.query.date,
            })
            .getOne()
        ;
        if (weatherItem === null) {
            return res.status(404).json({
                error: 'Weather not found'
            });
        }

        this.redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(weatherItem));

        return res.json({
            weatherItem
        });
    }
}

module.exports = WeatherController;
