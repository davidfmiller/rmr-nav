
const
    path = require('path'),
    webpack = require('webpack'),
    terser = require('terser-webpack-plugin');

const config = {
  entry: './src/scripts/build.js',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'rmr-nav.bundle.js'
  },
  mode: 'development',
  watch: true,
  plugins : [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env']
            ]
          }
        }]
      }
    ]
  }
};

module.exports = config;
