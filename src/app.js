const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Usually the dotenv function looks in the same directory for .env file but you can specify the path
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
// Required to use rate limiter when deployed
app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

// api is mounted to this url
app.use('/cryptoworld', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
