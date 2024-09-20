
const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');

class City extends Sequelize.Model {}

City.init({
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
}, { sequelize, modelName: 'City', timestamps: false, tableName: 'cities', schema: 'app' });

module.exports = City;
