const express = require('express');
const app = express();
const logger = require('morgan');
const config = require('./config/');
const bodyParser = require('body-parser');
const router = require('./router');

//temp using mongoose for prototyping
const mongoose = require('mongoose');

const server = app.listen(config.port);
console.log('server is running on port ' + config.port + '.');

//db connect to mongo
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router(app);
