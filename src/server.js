const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv');
const exphbs = require('express-handlebars');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// models
const models = require('./models');

// handlebars
app.set('views', __dirname + '/views');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// routes
const authRoute = require('./routes/auth.js')(app, passport);

app.use('/', (req, res) => {
  res.send("Home page");
})

// load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// sync db
models.sequelize.sync().then(() => {
  console.log("Connecto to database successful");
}).catch(err => {
  console.log("Unable to connect to database", err);
});

app.listen(3000,()=>console.log("listening on port 3000"));
