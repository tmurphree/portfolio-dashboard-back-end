/* eslint no-undef:"off" */

require('dotenv').config();

const { getLatestPrice } = require('../../controllers/prices.controller');

// #region jasmine setup
const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const revertJasmineTimeout = function revertJasmineTimeout() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
};
const setJasmineTimeout = function setJasmineTimeout(milliseconds) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = milliseconds;
};

// you can set more options than are shown here: see https://jasmine.github.io/api/edge/Reporter.html
// tutorial: https://jasmine.github.io/tutorials/custom_reporter
const myReporter = {
  jasmineStarted: function jasmineStarted(suiteInfo, done) {
    // optional setup goes here
    setJasmineTimeout(10000);
    done();
  },
  jasmineDone: function jasmineDone(suiteInfo, done) {
    console.log(`Tests ended ${new Date().toLocaleString()}`);
    revertJasmineTimeout();
    done();
  },
};

jasmine.getEnv().addReporter(myReporter);
// #endregion jasmine setup

describe('getLatestPrice', () => {
  it('expects a string (part 1)', () => getLatestPrice()
    .then((res) => {
      console.log(res);
      fail('expected to fail');
    })
    .catch((err) => {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toMatch(/bad input/i);
    }));

  it('expects a string (part 2)', () => getLatestPrice({ shouldFail: true, symbol: 'msft' })
    .then((res) => {
      console.log(res);
      fail('expected to fail');
    })
    .catch((err) => {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toMatch(/bad input/i);
    }));

  it('rejects when it cannot find a price for a symbol', () => getLatestPrice('thisSymbolDoesntExist')
    .then((res) => {
      console.log(res);
      fail('expected to fail');
    })
    .catch((err) => {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toMatch(/unable to find a price for symbol/i);
    }));

  it('gets the price for a symbol it can find', () => getLatestPrice('msft')
    .then((res) => {
      expect(typeof res).toBe('object');
      expect(res.symbol).toBe('msft');
      expect(typeof res.price).toBe('number');
      expect(res.price).toBeGreaterThan(12);
      expect(typeof res.lastRefreshed).toBe('string');
      expect(res.lastRefreshed).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));
});
