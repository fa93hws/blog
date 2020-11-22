/* eslint-disable */
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(
  path.join(__dirname, 'private-key.pem'),
  'utf-8',
);
console.log(JSON.stringify(privateKey));
// console.log(JSON.stringify(privateKey.replace(/\\n/g, '\n')));
