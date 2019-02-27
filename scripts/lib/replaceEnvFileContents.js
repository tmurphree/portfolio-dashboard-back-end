const fs = require('fs');

const expecedFilesPresent = function expecedFilesPresent() {
  return fs.existsSync('.env') &&
    fs.existsSync('.env.test') &&
    fs.existsSync('.env.production');
};

/**
 * @description Given three files (.env, .env.test, and .env.production),
 *    replaces .env with the appropriate environment-specific file. 
 * @param {string} env Environment to build for.  Must be 'test' or 'production'.
 * @returns {undefined}
 * @version 1.1
*/
const replaceEnvFileContents = function replaceEnvFileContents(env = 'test') {
  return new Promise((resolve) => {
    if (!['production', 'test'].includes(env)) {
      throw new Error('env param must be "production" or "test".');
    }

    if (!expecedFilesPresent()) {
      throw new Error('At least one of these files is not present: .env, .env.test, .env.production');
    }

    const fileToCopy = env === 'production' ?
      '.env.production' :
      '.env.test';

    // delete current .env file
    try {
      fs.unlinkSync('.env');
    } catch (err) {
      throw err;
    }

    try {
      fs.copyFileSync(fileToCopy, '.env');
    } catch (err) {
      throw err;
    }

    console.log(`.env file replaced with ${env} values`);

    resolve();
  });
};

module.exports = { replaceEnvFileContents };