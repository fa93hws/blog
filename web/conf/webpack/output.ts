import { Output } from 'webpack';
import { resolve } from 'path';

export function getOutput(hashOutput: boolean): Output {
  const suffix = hashOutput ? '.[chunkhash:8]' : '';
  return {
    path: resolve(__dirname, '..', '..', 'dist/'),
    filename: `static/js/[name]${suffix}.js`,
    chunkFilename: `static/js/[name]${suffix}.js`,
  };
}
