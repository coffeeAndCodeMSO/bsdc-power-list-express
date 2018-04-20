import express from 'express';
import path from 'path';

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

const app = express();
var users = require('routes/users')

app.use(express.static('src/public'));

app.get('/',(req,res)=>{
  res.sendFile('index.html');
});

app.use('/user', users)

app.listen(3000,()=>console.log("listening on port 3000"));
