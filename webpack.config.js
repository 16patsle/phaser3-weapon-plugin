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
    WeaponPlugin: './main.js',
    'WeaponPlugin.min': './main.js',
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
        test: /.js$/,
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
              ]
            ],
          },
        },
      },
    ],
  },
};

const configModule = Object.assign({}, config);
configModule.entry = {
  'WeaponPlugin.modern': './main.js',
  'WeaponPlugin.modern.min': './main.js',
}
configModule.module = {
  rules: [
    {
      test: /.js$/,
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
            ]
          ],
        },
      },
    },
  ],
};

const configLegacy = Object.assign({}, config);
configLegacy.entry = {
  'WeaponPlugin.legacy': './main.js',
  'WeaponPlugin.legacy.min': './main.js',
}
configLegacy.module = {
  rules: [
    {
      test: /.js$/,
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
            ]
          ],
        },
      },
    },
  ],
};

module.exports = [config, configModule, configLegacy]
