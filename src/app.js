const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Usually the dotenv function looks in the same directory for .env file but you can specify the path

require('dotenv').config();
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);
app.get('/', (req, res) => {
  res.json({
    message: 'Type in endpoint'
  });
});

// api is mounted to this url
app.use('/cryptoapi', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
