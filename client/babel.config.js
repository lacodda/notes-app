module.exports = api => {
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            esmodules: !isProd,
            // browsers: ['last 2 Chrome versions'],
          },
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-flow',
      '@babel/plugin-transform-flow-strip-types',
    ],
  };
};
