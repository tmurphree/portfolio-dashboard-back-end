const { buildNewDockerImage } = require('./lib/buildNewDockerImage');
const { replaceEnvFileContents } = require('./lib/replaceEnvFileContents');

replaceEnvFileContents('test')
  .then(() => buildNewDockerImage('test'))
  .catch((err) => {
    console.error(err);
  });
