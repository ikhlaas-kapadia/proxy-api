const express = require('express');

const axios = require('axios');

const rateLimit = require('express-rate-limit');

const router = express.Router();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30sec
  max: 25  // limit each IP to 25 requests per windowMs
});

const baseURL = 'https://api.coinranking.com/v2';

let cachedDataCoins;

let cacheTimeCoins;

let cachedDataStats;

let cacheTimeStats;

router.get('/stats', limiter, async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/stats`,
    headers: {
      'x-access-token': process.env.RAPID_API_KEY
    }
  };
  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cacheTimeStats && cacheTimeStats > Date.now() - 30 * 1000) {
    cachedDataStats.isCached = 'true';
    return res.json(cachedDataStats);
  }
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    // console.log(data);
    //  2 - Respond to incoming request from front end with response from rapid api
    cachedDataStats = data;
    cacheTimeStats = Date.now();
    data.cacheTimeStats = cacheTimeStats;
    return res.json(data);
  } catch (error) {
    return next(error.response.data);
  }
});

router.get('/coins', limiter, async (req, res, next) => {

  const options = {
    method: 'GET',
    url: `${baseURL}/coins`,
    headers: {
      'x-access-token': process.env.RAPID_API_KEY
    }
  };

  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cacheTimeCoins && cacheTimeCoins > Date.now() - 30 * 1000) {
    cachedDataCoins.isCached = 'true';
    return res.json(cachedDataCoins);
  }
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    // console.log(data);
    //  2 - Respond to incoming request from front end with response from rapid api
    cachedDataCoins = data;
    cacheTimeCoins = Date.now();
    data.cacheTimeCoins = cacheTimeCoins;
    return res.json(data);
  } catch (error) {
    return next(error.response.data);
  }
});

router.get('/coin/:uuid', limiter, async (req, res, next) => {
  const { params:paramsObject } = req;
  const { uuid } = paramsObject;

  console.log(uuid);

  const options = {
    method: 'GET',
    url: `${baseURL}/coin/${uuid}`,
    headers: {
      'x-access-token': process.env.RAPID_API_KEY
    }
  };

  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    // console.log(data);
    //  2 - Respond to incoming request from front end with response from rapid api
    return res.json(data);
  } catch (error) {
    return next(error.response.data);
  }
  // fetchData().then((data) => { res.json({ response: data }); });
});

router.get('/coin/:uuid/history', limiter, async (req, res, next) => {
  const { params:paramsObject, query:queryObject } = req;
  const { uuid } = paramsObject;
  const { timePeriod } = queryObject;
  let queryString = ''
  if(timePeriod) {
    queryString = `?timePeriod=${timePeriod}`;
  }

  const options = {
    method: 'GET',
    url: `${baseURL}/coin/${uuid}/history${queryString}`,
    headers: {
      'x-access-token': process.env.RAPID_API_KEY
    }
  };

  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    console.log(data.data.history.length);
    //  2 - Respond to incoming request from front end with response from rapid api
    return res.json(data);
  } catch (error) {
    return next(error.response.data);
  }
});




module.exports = router;
