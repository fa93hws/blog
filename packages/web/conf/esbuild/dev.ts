import type { Options } from '@fa93hws-blog/esbuild-cli';

import { commonEsbuildOptions, commonHtmlOptions } from './common';

const options: Options = {
  esbuildOptions: {
    ...commonEsbuildOptions,
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    minify: false,
  },
  hashFile: false,
  htmlOptions: {
    ...commonHtmlOptions,
    minify: false,
  },
};

module.exports = options;
