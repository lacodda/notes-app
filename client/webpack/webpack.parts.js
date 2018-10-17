const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const autoprefixer = require('autoprefixer');

const publicPath = '/';

exports.publicPath = publicPath;

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
    },
    publicPath,
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host, // Defaults to `localhost`
    port, // Defaults to 8080

    // overlay: true is equivalent
    overlay: {
      errors: true,
      warnings: false,
    },
  },
});

exports.loadHtml = options => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options,
          },
        ],
      },
    ],
  },
});

exports.loadPug = options => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options,
          },
        ],
      },
    ],
  },
});

exports.lintJS = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        // test: /\.(js|vue)(\?.*)?$/i, TODO: vue-loader
        include,
        exclude,
        // enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

const sharedCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      localIdentName: '[hash:base64:5]',
    },
  },
];

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')],
  },
});

exports.purifyCSS = options => ({
  plugins: [new PurifyCSSPlugin(options)],
});

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: options,
        canPrint: true, // false for analyzer
      }),
    ],
  },
});

exports.loadCSS = ({ include, exclude, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,

        include,
        exclude,

        use: [
          'vue-style-loader',
          // {
          //   loader: 'style-loader',
          // },
          // ...sharedCSSLoaders,
          // ...use,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                }),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, options, use = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,

        include,
        exclude,

        use: [MiniCssExtractPlugin.loader, ...sharedCSSLoaders, ...use],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(options)],
});

exports.cssPreprocessorLoader = { loader: 'fast-sass-loader' };

exports.loadSvg = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,

        include,
        exclude,

        use: ['svg-sprite-loader'],
      },
    ],
  },
});

exports.extractSvg = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,

        include,
        exclude,

        use: [
          {
            loader: 'svg-sprite-loader',
            options,
          },
        ],
      },
    ],
  },
  plugins: [new SpriteLoaderPlugin()],
});

exports.loadMedia = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/i,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.optimizeImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/i,

        include,
        exclude,

        use: {
          loader: 'image-webpack-loader',

          options: {
            progressive: true,

            // optimizationLevel: 7,

            gifsicle: {
              interlaced: false,
            },

            /*
            mozjpeg: {

            },

            svgo: {

            }, */

            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|otf|woff2?)(\?.*)?$/i,

        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadVue = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.vue$/,

        include,
        exclude,

        loader: 'vue-loader',
        options,
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
});

exports.loadJS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,

        include,
        exclude,

        loader: 'babel-loader',
        options,
      },
    ],
  },
});

exports.minifyJS = options => ({
  optimization: {
    minimizer: [new UglifyJsPlugin(options)],
  },
});
