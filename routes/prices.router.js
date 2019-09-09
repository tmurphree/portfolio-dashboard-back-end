const express = require('express');
const { getLatestPrice } = require('../controllers/prices.controller');

const router = express.Router();

router.post('/one', (req, res) => {
  if (!req.body.symbol) {
    res.status(400).json({ error: true, errorMessage: 'Bad request -- no symbol in body.' });
    return;
  }

  getLatestPrice(req.body.symbol)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errorMessage: 'Server error.' });
    });
});

router.post('/many', () => {

});

module.exports = router;
