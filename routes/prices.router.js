const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('The prices route is under construction.  Please check back later.');
});

module.exports = router;
