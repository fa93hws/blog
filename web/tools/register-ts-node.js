const path = require('path');

require('ts-node').register({
  project: path.join(
    __dirname,
    '..',
    'conf',
    'typescript',
    'tsconfig.tsnode.json',
  ),
  transpileOnly: true,
});
