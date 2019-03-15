const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('The users route is under construction.  Please check back later.');
});

module.exports = router;
