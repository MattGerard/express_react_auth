const dotenv = require('dotenv/config');
module.exports = {
  //secret for jwt
  secret: process.env.PASSPORT_SECRET,
  //mongo db for prototyping
  database: 'mongodb://localhost:27017',
  port: process.env.PORT || 3000,
};
