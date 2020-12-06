import * as path from 'path';
import * as debug from 'debug';
import type { Options } from '@fa93hws-blog/esbuild-cli';
import { webDir } from '../path';

const outbase = path.join(webDir, 'src');
const info = debug('esbuild-config');

function getOptionsFromEnv() {
  const useFake = process.env.USE_FAKE === 'true';
  const out = { useFake };
  info(out);
  return out;
}

const options = getOptionsFromEnv();

export const commonEsbuildOptions: Partial<Options['esbuildOptions']> = {
  entryPoints: [path.join(webDir, 'src', 'index.tsx')],
  bundle: true,
  outdir: path.join(webDir, 'dist', 'blog'),
  define: {
    'process.env.USE_FAKE': `"${options.useFake}"`,
  },
  outbase,
  sourcemap: true,
  platform: 'browser',
  write: false,
  loader: {
    '.svg': 'file',
    '.woff2': 'file',
    '.woff': 'file',
  },
};

export const commonHtmlOptions = {
  entry: path.join(webDir, 'index.ejs'),
};
