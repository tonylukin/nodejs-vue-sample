const mysql = require('mysql');
const migration = require('mysql-migrations');
const dbConfig = require("./config/dbConfig");

const connection = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbName,
});

migration.init(connection, __dirname + '/migrations', function() {
    console.log("finished running migrations");
});