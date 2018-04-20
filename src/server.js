import express from 'express';
import path from 'path';
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

// middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
var users = require('routes/users')

app.use(express.static('src/public'));

app.get('/',(req,res)=>{
  res.sendFile('index.html');
});

app.use(users);

app.listen(3000,()=>console.log("listening on port 3000"));
