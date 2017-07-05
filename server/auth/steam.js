const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const authHelpers = require('./_helpers');
const init = require('./passport');
const knex = require('../db/knex');
const dotenv = require('dotenv/config');

const options = {};

init();

function createAccountClaim(response, profile, accessToken, refreshToken, done) {
  return authHelpers
    .createAccountClaim(response.uid, profile.id, accessToken, refreshToken, 'STEAM')
    .then(response => {
      console.log(response, 'whats in the BIG box??');

      return knex
        .select('*')
        .from('users')
        .leftJoin('claims', 'users.uid', 'claims.user_id')
        .innerJoin('claim_types', 'type_id', 'claim_types.id')
        .where('claim_types.name', 'STEAM')
        .first()
        .then(user_with_claim => {
          console.log(user_with_claim, 'Grab the user+claim object to pass back in with passport');
          return done(null, user_with_claim);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

passport.use(
  new SteamStrategy(
    {
      realm: process.env.STEAM_API_REALM,
      apiKey: process.env.STEAM_API_KEY,
      returnURL: process.env.STEAM_API_CALLBACK,
    },
    function(identifier, profile, done) {
      console.log('we hit steam', identifier, profile, done);
      //Check if user exists by EMAIL:
      return knex('users')
        .where({email: profile.email})
        .first()
        .then(user => {
          if (!user) {
            console.log('Check for user with email, no such user exists lets create one.');
            return authHelpers
              .createUser(profile)
              .then(response => {
                console.log(
                  response,
                  'A User Was Created. Since there was no user before, we can create the claim right here.'
                );

                createAccountClaim(response[0], profile, done);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (user) {
            return knex
              .select('*')
              .from('users')
              .leftJoin('claims', 'users.uid', 'claims.user_id')
              .innerJoin('claim_types', 'type_id', 'claim_types.id')
              .where('claim_types.name', 'TWITCH')
              .first()
              .then(user_with_claim => {
                if (!user_with_claim) {
                  createAccountClaim(user, profile, done);
                } else {
                  return done(null, user);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

module.exports = passport;
