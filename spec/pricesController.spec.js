/* eslint no-undef:"off" */

require('dotenv').config();

const { getLatestPrice, getManyPrices } = require('../controllers/prices.controller');

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

const logIf = function logIf(data, conditon) {
  if (conditon) {
    console.log(data);
  }
};

describe('getLatestPrice', () => {
  beforeAll(() => {
    console.log('If you get call frequency errors, comment out one of the describe blocks.');
  });

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

  // this resolves because getManyPrices will use Promies.all, and if it rejects then it'll blow
  // up the Promise.all
  it(
    'resolves to an object with an "error": true prop when it cannot find a price for a symbol',
    () => getLatestPrice('thisSymbolDoesntExist')
      .then((res) => {
        expect(typeof res).toBe('object');
        expect(res.error).toBe(true);
        expect(res.errorMessage).toMatch(/cannot find price/i);
        expect(res.lastRefreshed).toBeUndefined();
        expect(res.price).toBeUndefined();
        expect(res.symbol).toBe('thisSymbolDoesntExist');
      })
      .catch((err) => {
        console.error(err);
        fail('expected to succeed');
      }),
  );

  it('gets the price for a symbol it can find', () => getLatestPrice('msft')
    .then((res) => {
      expect(typeof res).toBe('object');
      expect(res.error).toBe(false);
      expect(res.errorMessage).toBeUndefined();
      expect(typeof res.lastRefreshed).toBe('string');
      expect(res.lastRefreshed).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
      expect(typeof res.price).toBe('number');
      expect(res.price).toBeGreaterThan(1);
      expect(res.symbol).toBe('msft');
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));
});

xdescribe('getManyPrices', () => {
  beforeAll(() => {
    console.log('If you get call frequency errors, comment out one of the describe blocks.');
  });

  const count = function count(array, filterFunction) {
    return array.filter(filterFunction).length;
  };

  it('expects an array of strings (part 1)', () => getManyPrices('msft')
    .then((res) => {
      console.log(res);
      fail('expected to fail');
    })
    .catch((err) => {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toMatch(/bad input/i);
    }));

  it('expects an array of strings (part 2)', () => getManyPrices([1, 2, 3])
    .then((res) => {
      console.log(res);
      fail('expected to fail');
    })
    .catch((err) => {
      expect(err instanceof Error).toBe(true);
      expect(err.message).toMatch(/bad input/i);
    }));

  it('resolves when it cannot find a price for a symbol', () => getManyPrices(['ba', 'thisSymbolDoesntExist', 'msft'])
    .then((res) => {
      logIf(res, true);
      expect(Array.isArray(res)).toBe(true);
      expect(count(res, (x) => x.error === true)).toBe(1);
      expect(count(res, (x) => x.error === false)).toBe(2);
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));

  it('gets the prices for symbols it can find', () => getManyPrices(['csco', 'msft'])
    .then((res) => {
      logIf(res, true);
      expect(Array.isArray(res)).toBe(true);
      expect(count(res, (x) => x.error === true)).toBe(0);
      expect(count(res, (x) => x.error === false)).toBe(2);
      expect(res.every((el) => el.price > 1)).toBe(true);
    })
    .catch((err) => {
      console.error(err);
      fail('expected to succeed');
    }));
});
