/* eslint func-names:"off", no-undef:"off" */

require('dotenv').config();

// const dataService = require('./data.service.js');
const myLambda = require('../index.js');

// const verboseOutput = true;

// #region jasmine setup
// const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
// function revertJasmineTimeout() { jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout; }
// function setJasmineTimeout(milliseconds){ jasmine.DEFAULT_TIMEOUT_INTERVAL = milliseconds; }

// you can set more options than are shown here: see https://jasmine.github.io/api/edge/Reporter.html
// tutorial: https://jasmine.github.io/tutorials/custom_reporter
const myReporter = {
  jasmineStarted: function jasmineStarted(suiteInfo, done) {
    // optional setup goes here
    done();
  },
  jasmineDone: function jasmineDone(suiteInfo, done) {
    console.log(`Tests ended ${new Date().toLocaleString()}`);
    done();
  },
};

jasmine.getEnv().addReporter(myReporter);
// #endregion jasmine setup


describe('handler', () => {
  it('get rocks for a person', (done) => {
    myLambda.handler({ person: 'Tom' }, null, (err, data) => {
      if (err) { console.log(err); }

      expect(data.status).toEqual(200);
      expect(data.message).toEqual('ok');
      expect(Array.isArray(data.data)).toBe(true);
      done();
    });
  });
});
