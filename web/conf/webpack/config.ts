import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import { getCssLoaderOption } from './css/css-loader-options';
import { getOutput } from './output';
import { getMiniCssExtractPluginOptions } from './css/mini-css-plugin';
import { getOptionsFromEnv } from './env-options';
import { getPostcssOption } from './css/postcss-options';

const {
  hashOutput,
  sourceMap,
  mode,
  isOnCI,
  hotModuleReplacement: hotModuleReload,
  tsTranspileOnly,
} = getOptionsFromEnv();

export const webpackConfig: Configuration = {
  mode,
  entry: './src/index.tsx',
  output: getOutput(hashOutput),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: tsTranspileOnly,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: hotModuleReload,
            },
          },
          {
            loader: 'css-modules-typescript-loader',
            options: {
              mode: isOnCI ? 'verify' : 'emit',
            },
          },
          {
            loader: 'css-loader',
            options: getCssLoaderOption({
              hashOutput,
              sourceMap,
            }),
          },
          {
            loader: 'postcss-loader',
            options: getPostcssOption({ sourceMap }),
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: hotModuleReload,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new MiniCssExtractPlugin(getMiniCssExtractPluginOptions(hashOutput)),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: 4,
        sourceMap,
      }),
    ],
  },
};
