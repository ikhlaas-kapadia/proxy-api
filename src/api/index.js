const express = require('express');

const emojis = require('./emojis');

const crypto = require('./crypto');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to cryptoworld API - 👋🌎🌍🌏'
  });
});

// router.use('/emojis', emojis);

router.use('/', crypto);

module.exports = router;
