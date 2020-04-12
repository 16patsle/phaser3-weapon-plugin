/* eslint-env node */
const TerserPlugin = require('terser-webpack-plugin');

const createConfig = type => {
  let presetOptions = {
    useBuiltIns: 'usage',
    corejs: 3,
    targets: {
      esmodules: true,
    },
    bugfixes: true,
  };

  if (type === 'modern') {
    presetOptions = {
      useBuiltIns: 'usage',
      corejs: 3,
      targets:
        'last 2 Edge versions, last 2 Safari versions, last 2 Firefox versions, last 2 Chrome versions',
      bugfixes: true,
    };
  } else if (type === 'legacy') {
    presetOptions = {
      useBuiltIns: 'usage',
      corejs: 3,
    };
  }

  const entryName = type ? 'WeaponPlugin.' + type : 'WeaponPlugin';

  return {
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
          warningsFilter: () => false,
        }),
      ],
    },

    entry: {
      [entryName]: './main.ts',
      [entryName + '.min']: './main.ts',
    },

    output: {
      path: `${__dirname}/dist/`,
      filename: '[name].js',
      library: 'WeaponPlugin',
      libraryTarget: 'umd',
      libraryExport: '',
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
