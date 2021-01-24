/* eslint-env node */
const TerserPlugin = require('terser-webpack-plugin');

const createConfig = type => {
  let presetOptions = {
    useBuiltIns: 'usage',
    corejs: '3.8',
    targets: {
      esmodules: true,
    },
    bugfixes: true,
  };
  let target = 'es6'

  if (type === 'modern') {
    const browserslist = 'last 2 Edge versions, last 2 Safari versions, last 2 Firefox versions, last 2 Chrome versions'
    presetOptions = {
      useBuiltIns: 'usage',
      corejs: '3.8',
      targets:
        browserslist,
      bugfixes: true,
    };
    target = 'browserslist:' + browserslist
  } else if (type === 'legacy') {
    presetOptions = {
      useBuiltIns: 'usage',
      corejs: '3.8',
    };
    target = 'es5'
  }

  const entryName = type ? 'WeaponPlugin.' + type : 'WeaponPlugin';

  return {
    mode: 'none',
    context: `${__dirname}/src/`,
    devtool: 'source-map',
    target,

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js$/,
          terserOptions: {
            compress: true,
            output: {
              comments: false,
            },
            warnings: false,
            safari10: true,
          },
        }),
      ],
    },

    entry: {
      [entryName]: './main.ts',
      [entryName + '.min']: './main.ts',
    },

    output: {
      library: 'WeaponPlugin',
      libraryTarget: 'umd',
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
                ['@babel/preset-env', presetOptions],
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-class-properties',
                  {
                    loose: true,
                  },
                ],
              ],
            },
          },
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
  };
};

module.exports = [
  createConfig(),
  createConfig('modern'),
  createConfig('legacy'),
];
