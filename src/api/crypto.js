const express = require('express');

const axios = require('axios');

const rateLimit = require('express-rate-limit');

const router = express.Router();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60min
  max: 50 // limit each IP to 50 requests per windowMs
});

const baseURL = 'https://coinranking1.p.rapidapi.com';

// let cachedGlobalData;

// let cachedTimeGlobalStats;

// // Get global stats endpoint
// router.get('/global-stats', limiter, async (req, res, next) => {
//   const options = {
//     method: 'GET',
//     url: `${baseURL}/stats`,
//     headers: {
//       'x-rapidapi-host': process.env.RAPID_API_HOST,
//       'x-rapidapi-key': process.env.RAPID_API_KEY
//     }
//   };
//   // In memory cache to reduce the number of requests. For larger application better to store on db
//   if (cachedTimeGlobalStats && cachedTimeGlobalStats > (Date.now() - (60 * 60 * 1000))) {
//     return res.json(cachedGlobalData);
//   }
//   //  1 - Make a request to rapid api
//   try {
//     const response = await axios.request(options);
//     const { data } = await response;
//     // console.log(data);
//     //  2 - Respond to incoming request from front end with response from rapid api
//     cachedGlobalData = data;
//     cachedTimeGlobalStats = Date.now();
//     data.cacheTime = cachedTimeGlobalStats;
//     return res.json(data);
//   } catch (error) {
//     return next(error);
//   }
//   // fetchData().then((data) => { res.json({ response: data }); });
// });


// Get coins endpoint
let cachedTimeCoins;
let cachedCoinsData;
router.get('/coins', limiter, async (req, res, next) => {
  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cachedTimeCoins && cachedTimeCoins > (Date.now() - (60 * 60 * 1000))) {
    // console.log(cachedCoinsData);
    return res.json(cachedCoinsData);
  }

  const options = {
    method: 'GET',
    url: `${baseURL}/coins`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
 
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    cachedCoinsData = data;
    cachedTimeCoins = Date.now();
    data.cachedCoinsData = cachedTimeCoins;
    // console.log('hello');
    return res.json(data);
  } catch (error) {
    return next(error);
  }

});

// Get coins endpoint
let cachedTop5CoinsTime;
let cachedTop5CoinsData;
router.get('/top5-coins', limiter, async (req, res, next) => {
  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cachedTop5CoinsTime && cachedTop5CoinsTime > (Date.now() - (60 * 60 * 1000))) {
    // console.log(cachedTop5CoinsData);
    return res.json(cachedTop5CoinsData);
  }

  const options = {
    method: 'GET',
    url: `${baseURL}/coins?limit=5`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
 
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    cachedTop5CoinsData = data;
    cachedTop5CoinsTime = Date.now();
    data.cachedTop5CoinsData = cachedTop5CoinsTime;
    // console.log('hello');
    return res.json(data);
  } catch (error) {
    return next(error);
  }

});


// Get individual coin endpoint
router.get('/coin/:id', limiter, async (req, res, next) => {
  // res.json(req.params);
  const { id } = req.params;

  const options = {
    method: 'GET',
    url: `${baseURL}/coin/${id}`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
 
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
  
    return res.json(data);
  } catch (error) {
    return next(error);
  }

});

// Get individual coin history endpoint
router.get('/coin/:id/history/:timeframe', limiter, async (req, res, next) => {
  // res.json(req.params);
  const { id, timeframe } = req.params;
 
  const options = {
    method: 'GET',
    url: `${baseURL}/coin/${id}/history/${timeframe}`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
 
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
  
    return res.json(data);
  } catch (error) {
    return next(error);
  }

});


// Get exchanges endpoint
let cachedExchangesData;

let cachedTimeExchanges;

router.get('/exchanges', limiter, async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/exchanges`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cachedTimeExchanges && cachedTimeExchanges > (Date.now() - (60 * 60 * 1000))) {
    return res.json(cachedExchangesData);
  }
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    // console.log(data);
    //  2 - Respond to incoming request from front end with response from rapid api
    cachedExchangesData = data;
    cachedTimeExchanges = Date.now();
    data.cacheTime = cachedTimeExchanges;
    return res.json(data);
  } catch (error) {
    return next(error);
  }
  // fetchData().then((data) => { res.json({ response: data }); });
});

// Get top5 exchanges endpoint
let cachedTop5ExchangeData;

let cachedTop5ExchangeTime;

router.get('/top5-exchanges', limiter, async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/exchanges?limit=5`,
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  // In memory cache to reduce the number of requests. For larger application better to store on db
  if (cachedTop5ExchangeTime && cachedTop5ExchangeTime > (Date.now() - (60 * 60 * 1000))) {
    return res.json(cachedTop5ExchangeData);
  }
  //  1 - Make a request to rapid api
  try {
    const response = await axios.request(options);
    const { data } = await response;
    // console.log(data);
    //  2 - Respond to incoming request from front end with response from rapid api
    cachedTop5ExchangeData = data;
    cachedTop5ExchangeTime = Date.now();
    data.cacheTime = cachedTop5ExchangeTime;
    return res.json(data);
  } catch (error) {
    return next(error);
  }
  // fetchData().then((data) => { res.json({ response: data }); });
});



module.exports = router;
