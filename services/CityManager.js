const City = require('../models/sequelize/City');

class CityManager {
    async create(cityName) {
        return await City.findOrCreate({where: {name: cityName}});
    }
    async getList() {
        return await City.findAll();
    }
}

module.exports = CityManager;
