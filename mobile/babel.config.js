module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@screens': './src/screens',
            '@services': './src/services',
            '@store': './src/store',
            '@components': './src/components',
            '@utils': './src/utils',
            '@types': './src/types',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
          },
        },
      ],
    ],
  };
};
