const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the courses_db database.`)
);

  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  // {
  //   host: 'localhost',
  //   dialect: 'mysql',
  //   port: 3306
  // }

module.exports = db;