/* eslint no-undef:"off" */

require('dotenv').config();

const { getPrices } = require('../../controllers/prices.controller');

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

describe('getPrices', () => {
  it('expects a string', () => getPrices(12)
    .then((res) => {
      console.log('Expected to fail but succeeded (getPrices expects a string):');
      console.log(res);
      fail('expected to succeed');
    })
    .catch((err) => {
      expect(err.message).toBe('Invalid input.');
    }));

  it('returns a price for a symbol that is found', () => getPrices('itot')
    .then((res) => {
      const result = JSON.parse(res);

      expect(typeof result).toBe('object');

      expect(Object.keys(result)).toEqual(['ok', 'symbol', 'price']);
      expect(result.ok).toBe(true);
      expect(result.symbol).toBe('ITOT');
      expect(typeof result.price).toBe('number');
      expect(result.price).toBeGreaterThan(50, `price is ${result.price}`);
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));

  it('returns an error message for a symbol that is not found', () => getPrices('someBadSymbol')
    .then((res) => {
      const result = JSON.parse(res);

      expect(typeof result).toBe('object');

      expect(Object.keys(result)).toEqual(['ok', 'message']);
      expect(result.ok).toBe(false);
      expect(result.message).toBe('Could not get a price for symbol someBadSymbol.  Symbol probably not found.');
      expect(result.symbol).toBe(undefined);
      expect(result.price).toBe(undefined);
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));
});
