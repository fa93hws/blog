const path = require('path');

require('ts-node').register({
  project: path.join(
    __dirname,
    '..',
    'tsconfig.json',
  ),
  transpileOnly: true,
});

module.exports = require('./workflow.ts');
