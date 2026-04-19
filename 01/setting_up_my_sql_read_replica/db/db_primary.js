const mysql = require('mysql2/promise');
require('dotenv').config();

const primary = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: process.env.DOCKER_USER,
  password: process.env.DOCKER_PASSWORD,
  database: 'testdb',
});

module.exports = primary;