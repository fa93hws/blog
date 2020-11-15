import * as path from 'path';
import type { Options } from '@fa93hws-blog/esbuild-cli';

const webDir = path.resolve(__dirname, '..', '..');
const options: Options = {
  esbuildOptions: {
    bundle: true,
    entryPoints: [path.join(webDir, 'src', 'index.esbuild.tsx')],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    minify: true,
    outdir: path.join(webDir, 'dist', 'blog'),
    platform: 'browser',
    sourcemap: true,
    write: false,
  },
  hashFile: true,
  htmlOptions: {
    entry: path.join(webDir, 'index.ejs'),
    minify: true,
  },
};

module.exports = options;
