const express = require('express');

const emojis = require('./emojis');

const crypto = require('./crypto');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'CryptoAPI - Home endpoint👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/', crypto);

module.exports = router;
