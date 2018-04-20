const Sequelize = require('sequelize');

const sequelize = new Sequelize('power_list', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to database.\n', err)
  });

const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send("User Page");
});

router.get('/users/about', (req, res) => {
  res.send("User about");
});

module.exports = router;
