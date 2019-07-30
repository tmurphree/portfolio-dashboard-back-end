const axios = require('axios');

/**
 * @description Get the price for one symbol.
 * @param {string} symbol The symbol of the security.  E.g. BAC.
 * @returns {promise} Resolves to object, rejects to error.
 * @example
 * // {
 * //    error: false,
 * //    errorMessage: undefined,
 * //    lastRefreshed: '2019-07-30 10:21:00',
 * //    price: 120.32,
 * //    symbol: 'MSFT',
 * // }
 * getLatestPrice('MSFT').then(doSomething).catch(handleErr);
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
        const cannotFindPrice = Object.keys(res.data).includes('Error Message');

        const gotCallFrequencyNotice = Object.keys(res.data).includes('Note') &&
          /call frequency/i.test(res.data.Note);

        // returns number
        const getMostRecentClose = function getMostRecentClose() {
          // see https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo
          // for an example of what res.data looks like
          const quotes = Object.assign({}, res.data['Time Series (1min)']);

          const latestDateKey = Object.keys(quotes)
            .sort()
            // sort newest to oldest then get the first (newest) one
            .reverse()[0];

          return parseFloat(quotes[latestDateKey]['4. close']);
        };

        if (cannotFindPrice) {
          resolve({
            error: true,
            errorMessage: `Cannot find price for symbol ${symbol}.`,
            symbol,
          });
          return;
        }

        if (gotCallFrequencyNotice) {
          resolve({
            error: true,
            errorMessage: `Call frequency notice for symbol ${symbol}.`,
            symbol,
          });
          return;
        }

        resolve({
          error: false,
          lastRefreshed: res.data['Meta Data']['3. Last Refreshed'],
          price: getMostRecentClose(),
          symbol,
        });
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

/**
 * @description Get the prices for many symbols.
 * @param {array} symbolArray Array of stock symbols e.g. ['bac', 'msft'].
 * @returns {promise} Resolves to array of objects, rejects to error.
*/
const getManyPrices = function getManyPrices(symbolArray) {
  return new Promise((resolve, reject) => {
    if (!(Array.isArray(symbolArray)) || symbolArray.some(el => typeof el !== 'string')) {
      reject(new Error('Bad input to getManyPrices.'));
      return;
    }

    Promise.all(symbolArray.map(el => getLatestPrice(el)))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getLatestPrice,
  getManyPrices,
};
