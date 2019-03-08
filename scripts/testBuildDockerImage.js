const { buildNewDockerImage } = require('./lib/buildNewDockerImage');


buildNewDockerImage('test')
  .catch((err) => {
    console.error(err);
  });
