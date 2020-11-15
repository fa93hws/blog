// import * as debug from 'debug';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, relative, join } from 'path';
import { webpackConfig } from '../webpack/config';

// const info = debug('storybook_config').extend('info');
function getStoriesFromEnv() {
  const folder = process.env.STORYBOOK_PKG || 'src';
  const webRoot = resolve(__dirname, '..', '..');
  // info('Parsed STORYBOOK_PKG:', folder);
  const stories = resolve(webRoot, folder);
  const relativePath = relative(__dirname, stories);
  const glob = join(relativePath, '**', '*.stories.tsx');
  // info('Stories glob:', glob);
  return glob;
}

export const storybookConfig = {
  webpackFinal: async (config: Configuration) => {
    /* eslint-disable no-param-reassign */
    config.module = config.module ?? { rules: [] };
    config.plugins = config.plugins ?? [];
    /* eslint-enable no-param-reassign */

    if (webpackConfig.module == null) {
      throw new Error('our webpack config should have module rules');
    }
    if (webpackConfig.plugins == null) {
      throw new Error('our webpack config should have plugins');
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        ...webpackConfig.resolve,
      },
      module: {
        ...config.module,
        ...webpackConfig.module,
      },
      plugins: [
        ...config.plugins,
        ...webpackConfig.plugins.filter(
          (p) => !(p instanceof HtmlWebpackPlugin),
        ),
      ],
    };
  },

  stories: [getStoriesFromEnv()],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],
};
