import * as path from 'path';
import type { DevOptions } from '@fa93hws-blog/esbuild-cli';

import { webDir } from '../path';
import { commonEsbuildOptions, commonHtmlOptions } from './common';

const options: DevOptions = {
  esbuildOptions: {
    ...commonEsbuildOptions,
    define: {
      ...commonEsbuildOptions.define,
      'process.env.NODE_ENV': '"development"',
    },
    minify: false,
  },
  hashFile: false,
  htmlOptions: {
    ...commonHtmlOptions,
    minify: false,
  },
  port: 8888,
  watchDir: path.join(webDir, 'src'),
  proxy: {
    '/api/v1': 'http://localhost:3000/api/v1',
  },
};

module.exports = options;
