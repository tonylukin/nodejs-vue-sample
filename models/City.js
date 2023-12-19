
const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

class City extends Sequelize.Model {}

City.init({
    city_id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
}, { sequelize, modelName: 'City', timestamps: false, tableName: 'city' });

module.exports = City;
