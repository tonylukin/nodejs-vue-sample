const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');

const sequelize = new Sequelize(
    dbConfig.dbName,
    dbConfig.user,
    dbConfig.password,
    {
        port: dbConfig.port,
        dialect: 'postgres',
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) =>
        console.error('Connection error: ', err)
    );

module.exports = sequelize;
