/* eslint no-undef:"off" */
const axios = require('axios');
require('dotenv').config();

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

describe('/prices/one', () => {
  const url = 'http://127.0.0.1:3000/prices/one';

  it('responds with a 400 error if no req.body.symbol', () => {
    axios.post(url, {})
      .then((res) => {
        fail(`Expected to fail but got ${res}`);
      })
      .catch((res) => {
        expect(res.response.status).toBe(400);
        expect(res.data.error).toBe(true);
        expect(res.data.errorMessage).toBeTruthy();
      });
  });

  it('responds with a 200 response if a valid request is sent', () => {
    axios.post(url, { symbol: 'msft' })
      .then((res) => {
        expect(res.response.status).toBe(200);
        expect(res.data.error).toBe(false);
        expect(res.data.price).toBeGreaterThan(20);
      })
      .catch((res) => {
        fail(`Expected to succeed but got ${res}`);
      });
  });
});

describe('/prices/many', () => {
  const url = 'http://127.0.0.1:3000/prices/many';

  it('responds with a 400 error if no req.body.symbol', () => {
    axios.post(url, {})
      .then((res) => {
        fail(`Expected to fail but got ${res}`);
      })
      .catch((res) => {
        expect(res.response.status).toBe(400);
        expect(res.data.error).toBe(true);
        expect(res.data.errorMessage).toBeTruthy();
      });
  });

  it('responds with a 200 response if a valid request is sent', () => {
    axios.post(url, { symbol: ['bac', 'msft'] })
      .then((res) => {
        console.log(res.data);
        expect(res.response.status).toBe(200);
        expect(Array.isArray(response.data.payload)).toBe(true);
      })
      .catch((res) => {
        fail(`Expected to succeed but got ${res}`);
      });
  });
});
