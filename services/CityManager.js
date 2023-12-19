const City = require('../models/City');

class CityManager {
    async create(cityName) {
        return await City.findOrCreate({where: {city_name: cityName}});
    }
    async getList() {
        return await City.findAll();
    }
}

module.exports = CityManager;
