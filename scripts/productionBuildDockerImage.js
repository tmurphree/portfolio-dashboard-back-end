const { execSync } = require('child_process');

const { buildNewDockerImage } = require('./lib/buildNewDockerImage');


buildNewDockerImage('production')
  .then((imageTag) => {
    const tagDockerImageAsLatest = () => {
      try {
        execSync(`docker tag ${imageTag} ${imageTag.substring(0, imageTag.indexOf(':'))}:latest`);
      } catch (err) {
        console.error('Error trying to tag the image.');
        throw new Error(err);
      }
    };

    tagDockerImageAsLatest();
  })
  .catch((err) => {
    console.error(err);
  });
