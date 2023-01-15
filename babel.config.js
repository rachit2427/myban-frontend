module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }],
    [
      'module:react-native-dotenv',
      {
        path: './env/.env',
        safe: true,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@root': '.',
          '@src': './src',
        },
      },
    ],
  ],
};
