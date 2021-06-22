// module.exports = function (api) {
//   api.cache(true);

//   const presets = [
//     '@babel/preset-env',
//     'module:metro-react-native-babel-preset',
//   ];
//   const plugins = [
//     ['@babel/plugin-proposal-decorators', {legacy: true}],
//     ['@babel/plugin-proposal-class-properties', {loose: false}],
//   ];

//   return {
//     presets,
//     plugins,
//     sourceMaps: true,
//   };
// };

module.exports = function (api) {
  api.cache(true);

  const presets =  ['module:metro-react-native-babel-preset'],
  const plugins = [
    'react-require',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false,
      },
    ],

    ['@babel/plugin-transform-runtime', {}],
  ];


   return {
    presets,
    plugins,
    sourceMaps: true,
  };
};
