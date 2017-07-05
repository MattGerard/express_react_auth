const passport = require('passport');
// const User = require('../models/user');
const config = require('./index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const authHelpers = require('../auth/_helpers');
const options = {usernameField: 'email'};
const knex = require('../db/knex');

// Setting up local login strategy
const localLogin = new LocalStrategy(options, (username, password, done) => {
  console.log(username, password, 'here?');
  knex('users')
    .where({email: username})
    .first()
    .then(user => {
      console.log(user, 'user??');
      if (!user) return done(null, false);
      if (!authHelpers.comparePass(password, user.password)) {
        console.log('false', password, user.password);
        return done(null, false);
      } else {
        console.log('we good');
        return done(null, user);
      }
    })
    .catch(err => {
      console.log(err, 'hwat??');
      return done(err);
    });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret,
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  knex('users')
    .where({id: payload._id})
    .first()
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
