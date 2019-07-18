const axios = require('axios');

/**
 * @description Get the price for one symbol.
 * @param {string} symbol The symbol of the security.  E.g. BAC.
 * @returns {promise} Resolves to object, rejects to error.
*/
const getLatestPrice = function getLatestPrice(symbol) {
  return new Promise((resolve, reject) => {
    if (typeof symbol !== 'string') {
      reject(new Error('Bad input to getLatestPrice.'));
    }

    // eslint-disable-next-line
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    axios.get(url)
      .then((res) => {
        // use a regex to avoid capitalization issues (what if it changes?)
        if (Object.keys(res.data).some(el => /error message/i.test(el))) {
          resolve({
            error: true,
            errorMessage: `Cannot find price for symbol ${symbol}.`,
            symbol,
          });
          return;
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = {
  getLatestPrice,
};
