import type { Options } from '@fa93hws-blog/esbuild-cli';

import { commonEsbuildOptions, commonHtmlOptions } from './common';

const options: Options = {
  esbuildOptions: {
    ...commonEsbuildOptions,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    minify: true,
  },
  hashFile: true,
  htmlOptions: {
    ...commonHtmlOptions,
    minify: true,
  },
};

module.exports = options;
