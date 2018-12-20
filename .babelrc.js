const path = require('path')

// babel config for server (dev babel-node and server build)
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          node: true,
        },
        ignoreBrowserslistConfig: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'css-modules-transform',
      {
        preprocessCss: './webpack/serverSassLoader.js',
        generateScopedName: '[local]_[hash:base64:5]',
        extensions: ['.scss', '.css', '.sass'],
        // because webpack use 'context', so it will generate 2 different css hash path name
        // use root Dir will use the same hash path
        rootDir: path.join(__dirname, 'src'),
      },
    ],
  ],
}
