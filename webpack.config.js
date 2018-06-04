const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: `${__dirname}/src/`,
  devtool: 'source-map',

  entry: {
    WeaponPlugin: './main.js',
    'WeaponPlugin.min': './main.js',
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: 'WeaponPlugin',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  plugins: [
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: true,
        ie8: false,
        ecma: 5,
        output: {
          comments: false,
        },
        warnings: false,
      },
      warningsFilter: src => false,
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [],
        },
      },
    }, ],
  },
};
