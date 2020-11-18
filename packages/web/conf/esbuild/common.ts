import * as path from 'path';
import type { Options } from '@fa93hws-blog/esbuild-cli';

const webDir = path.resolve(__dirname, '..', '..');
const outbase = path.join(webDir, 'src');
export const commonEsbuildOptions: Partial<Options['esbuildOptions']> = {
  entryPoints: [path.join(webDir, 'src', 'index.esbuild.tsx')],
  bundle: true,
  outdir: path.join(webDir, 'dist', 'blog'),
  outbase,
  sourcemap: true,
  platform: 'browser',
  write: false,
};

export const commonHtmlOptions = {
  entry: path.join(webDir, 'index.ejs'),
};
