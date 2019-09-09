const express = require('express');
const { getLatestPrice, getManyPrices } = require('../controllers/prices.controller');

const router = express.Router();

router.post('/one', (req, res) => {
  if (!req.body.symbol) {
    res.status(400).json({ error: true, errorMessage: 'Bad request -- no symbol in body.' });
    return;
  }

  getLatestPrice(req.body.symbol)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errorMessage: 'Server error.' });
    });
});

router.post('/many', (req, res) => {
  if (!req.body.symbol) {
    res.status(400).json({ error: true, errorMessage: 'Bad request -- no symbol in body.' });
    return;
  }

  if (!Array.isArray(req.body.symbol)) {
    res
      .status(400)
      .json({ error: true, errorMessage: 'Bad request -- symbol in body must be an array.' });
    return;
  }

  getManyPrices(req.body.symbol)
    .then((result) => {
      res.status(200).json({ payload: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errorMessage: 'Server error.' });
    });
});

module.exports = router;
