const mysql = require('mysql2/promise');
require('dotenv').config();

const replica = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: process.env.DOCKER_USER,
    password: process.env.DOCKER_PASSWORD,
    database: 'testdb',
  });
  
  module.exports = replica;