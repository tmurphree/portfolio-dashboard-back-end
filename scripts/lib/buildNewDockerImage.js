const { spawn } = require('child_process');
const fs = require('fs');

/**
 * @description Build the Docker image with the repo name and version from package.json.
 * @param {string} env Environment to build for.  Must be 'test' or 'production'.
 * @returns {undefined}
 * @version 1.1
*/
const buildNewDockerImage = function buildNewDockerImage(env = 'test') {
  if (!['production', 'test'].includes(env)) {
    throw new Error('env param must be "production" or "test".');
  }

  return new Promise((resolve) => {
    const { name, version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const dockerFile = env === 'test' ?
      'Dockerfile.test' :
      'Dockerfile';

    const imageTag = env === 'test' ?
      `${name.replace('@', '')}:${version}-test` :
      `${name.replace('@', '')}:${version}`;

    const dockerBuildCommand = spawn(
      'docker',
      [
        'build',
        '-f', `${dockerFile}`,
        '-t', `${imageTag}`,
        '.',
      ],
    );

    dockerBuildCommand.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    dockerBuildCommand.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    dockerBuildCommand.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(imageTag);
    });
  });
};

module.exports = { buildNewDockerImage };
