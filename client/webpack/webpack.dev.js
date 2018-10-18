const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const parts = require('./webpack.parts');
const { getPaths } = require('./utils');
const config = require('./config');

const paths = getPaths(config);

module.exports = env => merge(
  common,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { ...config.dev.env, ...env },
      }),
    ],
  },
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadImages({ include: paths.img.src }),
  parts.loadVue({
    include: paths.src,
    options: {
      cssSourceMap: true,
      cacheBusting: true,
      transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
      },
    },
  }),
  parts.loadJS({ include: paths.src }),
  parts.loadCSS({
    // include: paths.css.src,
    include: paths.src,
    use: [parts.autoprefix(), parts.cssPreprocessorLoader],
  }),
);
