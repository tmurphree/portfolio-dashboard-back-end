/**
 * @description Returns false if required environment variables missing or zero length.
 * @returns {boolean}
 * @version 1.6
 */
const checkEnvVariables = function checkEnvVariables() {
  const requiredEnvVariables = [
    'ALPHAVANTAGE_API_KEY',
    'NODE_ENV',
  ];

  let result = true;

  requiredEnvVariables.forEach((element) => {
    if (!Object.keys(process.env).includes(element)) {
      console.error(new Error(`process.env doesn't include the following required variable: ${element}`));
      result = false;
    } else if (process.env[element].length === 0) {
      console.error(new Error(`process.env includes ${element}, but it's zero-length.`));
      result = false;
    }
  });

  return result;
};

module.exports = {
  checkEnvVariables,
};
