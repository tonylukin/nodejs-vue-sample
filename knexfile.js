"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const configObject = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: './migrations',
        tableName: "knex_migrations",
        schemaName: 'public',
        loadExtensions: ['.js']
    },
    seeds: {
        directory: './migrations/seeds',
        loadExtensions: ['.js']
    }
};
module.exports = configObject;
