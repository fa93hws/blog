import { Resolve } from 'webpack';
import { resolveOption } from '../resolver-options';

// for testing purpose
export function getResolveOptionForCss(webpackResolveOption: Resolve): Resolve {
  const { alias = {} } = webpackResolveOption;
  const cssAlias = Object.entries(alias).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      // css-loader resolve alias with ~prefix
      // see https://github.com/webpack-contrib/css-loader#import
      acc[`~${key}`] = value;
      return acc;
    },
    {},
  );

  return {
    ...webpackResolveOption,
    alias: cssAlias,
    extensions: ['css'],
  };
}

export function getPostcssOption({ sourceMap }: { sourceMap: boolean }) {
  return {
    /* eslint-disable global-require */
    /* eslint-disable  @typescript-eslint/no-var-requires */
    plugins: [
      require('autoprefixer'),
      require('postcss-modules-values-replace')({
        resolve: getResolveOptionForCss(resolveOption),
      }),
      require('postcss-modules-values'),
      require('postcss-calc')({ mediaQueries: true }),
      require('postcss-color-function'),
    ],
    /* eslint-enable global-require */
    /* eslint-enable @typescript-eslint/no-var-requires */
    sourceMap,
  };
}
