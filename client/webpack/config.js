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
    mixins: 'src/mixins',
    i18n: 'src/i18n',
    services: 'src/services',
    shared: 'src/shared',
    util: 'src/shared/util',
    data: 'src/shared/data',
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
  dev: {
    env: {
      ROOT_API: '"http://localhost:8085"',
      PERSISTENT_STORE_KEY: '"dashboard"',
    },
  },
  prod: {
    env: {
      ROOT_API: '"http://localhost:8080"',
      PERSISTENT_STORE_KEY: '"dashboard"',
    },
  },
};
