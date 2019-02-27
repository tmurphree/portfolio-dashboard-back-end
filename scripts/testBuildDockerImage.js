const { buildNewDockerImage } = require('./lib/buildNewDockerImage');
const { replaceEnvFileContents } = require('./lib/replaceEnvFileContents');

replaceEnvFileContents('test')
  .then(() => {
    return buildNewDockerImage('test');
  })
  .catch((err) => {
    console.error(err);
  });