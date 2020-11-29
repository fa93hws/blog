import * as debug from 'debug';
import { Configuration } from 'webpack';
import * as path from 'path';
import { webDir } from '../path';

const info = debug('storybook_config').extend('info');

function getStoriesFromEnv() {
  const folder = process.env.STORYBOOK_PKG || 'src';
  const webRoot = path.resolve(__dirname, '..', '..');
  info('Parsed STORYBOOK_PKG:', folder);
  const stories = path.resolve(webRoot, folder);
  const relativePath = path.relative(__dirname, stories);
  const glob = path.join(relativePath, '**', '*.stories.tsx');
  info('Stories glob:', glob);
  return glob;
}

export const storybookConfig = {
  webpackFinal: (config: Configuration) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        '@components': path.join(webDir, 'src', 'components'),
        '@pages': path.join(webDir, 'src', 'pages'),
        '@utils': path.join(webDir, 'src', 'utils'),
        '@services': path.join(webDir, 'src', 'services'),
      },
    },
  }),
  stories: [getStoriesFromEnv()],
  addons: ['@storybook/addon-knobs', '@storybook/addon-actions'],
};
