const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'directedGraph',
    libraryExport: 'default',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [ '.ts' ],
  },
};