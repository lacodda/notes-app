module.exports = {
  root: '..',
  src: 'src',
  dist: 'dist',
  entry: {
    app: 'main.js',
  },
  alias: {
    vue$: 'node_modules/vue/dist/vue.esm.js',
    '@': 'src',
    api: 'src/api',
    store: 'src/store',
    components: 'src/components',
    widgets: 'src/widgets',
    i18n: 'src/i18n',
    shared: 'src/shared',
    services: 'src/shared/services',
    util: 'src/util',
    styles: 'src/scss',
    images: 'src/assets/images',
  },
  pages: '../static',
  assets: {
    js: {
      src: 'js',
      dist: 'assets/js',
    },
    css: {
      src: 'scss',
      dist: 'assets/css',
    },
    img: 'assets/images',
    svg: {
      src: 'assets/svg',
      dist: 'assets/images',
    },
    fonts: {
      src: 'assets/fonts',
      dist: 'assets/fonts',
    },
    media: {
      src: 'assets/media',
      dist: 'assets/media',
    },
  },
};
