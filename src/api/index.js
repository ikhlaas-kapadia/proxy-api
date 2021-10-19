const express = require('express');

const emojis = require('./emojis');

const crypto = require('./crypto');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/cryptos', crypto);

module.exports = router;
