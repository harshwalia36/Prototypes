const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const shard1 = new Pool({
    host: 'localhost',
    port: dbConfig.port, 
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'users_db_1'
});

const shard2 = new Pool({
    host: 'localhost',
    port: dbConfig.port, // your shard1 port
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'users_db_2'
});

module.exports = {shard1, shard2};