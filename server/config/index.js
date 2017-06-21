module.exports = {
  //secret for jwt
  secret: 'password',
  //mongo db for prototyping
  database: 'mongodb://localhost:27017',
  port: process.env.PORT || 3000,
};
