const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, 'tsconfig.json'),
  transpileOnly: true,
});

require('./src/index.ts').default({
  queryStringParameters: {
    commitHash: 'f25353ca87ab1e98f2869c393e9b1bcf632706dc',
    url: 'http://www.google.com',
  },
});
