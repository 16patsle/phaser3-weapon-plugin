const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'none',
  context: `${__dirname}/src/`,
  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        sourceMap: true,
        terserOptions: {
          compress: true,
          output: {
            comments: false,
          },
          warnings: false,
          safari10: true,
        },
        warningsFilter: src => false,
      })
    ],
  },

  entry: {
    WeaponPlugin: './main.ts',
    'WeaponPlugin.min': './main.ts',
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: 'WeaponPlugin',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        test: /.(t|j)s$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    esmodules: true
                  },
                  bugfixes: true,
                }
              ],
              '@babel/preset-typescript'
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  }
};

const configModule = Object.assign({}, config);
configModule.entry = {
  'WeaponPlugin.modern': './main.ts',
  'WeaponPlugin.modern.min': './main.ts',
};
configModule.module = {
  rules: [
    {
      test: /.(t|j)s$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: 'last 2 Edge versions, last 2 Safari versions, last 2 Firefox versions, last 2 Chrome versions',
                bugfixes: true,
              },
            ],
            '@babel/preset-typescript'
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    },
  ],
};

const configLegacy = Object.assign({}, config);
configLegacy.entry = {
  'WeaponPlugin.legacy': './main.ts',
  'WeaponPlugin.legacy.min': './main.ts',
};
configLegacy.module = {
  rules: [
    {
      test: /.(t|j)s$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3
              }
            ],
            '@babel/preset-typescript'
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    },
  ],
};

module.exports = [config, configModule, configLegacy]
