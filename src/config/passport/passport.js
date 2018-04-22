const bcrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
  let User = user;
  let LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    (req, email, password, done) => {
      let generateHash = password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }

      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if(user) {
          return done(null, false, {
            message: 'That email is already taken'
          })
        } else {
          let userPassword = generateHash(password);

          let data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname
          }

          User.create(data).then((newUser, created) => {
            if(!newUser) {
              return done(null, false);
            } else {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    (req, email, password, done) => {
      let User = user;
      let isValidPassword = (userPassword, password) => {
        return bcrypt.compareSync(password, userPassword);
      }

      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if(!user) {
          return done(null, false, {
            message: 'Email does not exist'
          })
        }

        if(!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password'
          })
        }

        let userInfo = user.get();
        return done(null, userInfo);
      }).catch(err => {
        console.log(err);

        return(done, null, {
          message: 'Something went wrong with your signin'
        })
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      if(user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
}
