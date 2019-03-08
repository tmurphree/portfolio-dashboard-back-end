const { buildNewDockerImage } = require('./lib/buildNewDockerImage');
const { replaceEnvFileContents } = require('./lib/replaceEnvFileContents');
const { execSync } = require('child_process');


replaceEnvFileContents('production')
  .then(() => {
    return buildNewDockerImage('production');
  })
  .then((imageTag) => {
    const tagDockerImageAsLatest = () => {
      try {
        execSync(`docker tag ${imageTag} ${imageTag.substring(0, imageTag.indexOf(':'))}:latest`)
      } catch (err) {
        console.error('Error trying to tag the image.');
        throw new Error(err);
      }
    };

    tagDockerImageAsLatest();

    // avoid accidentally testing in production
    console.log('Reverting to development .env file.');
    return replaceEnvFileContents('test');
  })
  .catch((err) => {
    console.error(err);
  });