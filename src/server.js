const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// models
const models = require('./models');

// sync db
models.sequelize.sync().then(() => {
  console.log("Connecto to database successful");
}).catch(err => {
  console.log("Unable to connect to database", err);
});

// routes
var users = require('./routes/users')

app.use(express.static('./src/public'));

app.get('/',(req,res)=>{
  res.sendFile('index.html');
});

app.use(users);

app.listen(3000,()=>console.log("listening on port 3000"));
