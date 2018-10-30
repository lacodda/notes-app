const { resolve } = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        components: resolve(__dirname, 'src/components'),
        store: resolve(__dirname, 'src/store'),
        services: resolve(__dirname, 'src/services'),
        styles: resolve(__dirname, 'src/scss'),
      },
    },
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
};
