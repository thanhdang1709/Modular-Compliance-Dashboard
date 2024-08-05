// webpack.prod.js
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('./package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/taskOverview/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'taskOverview',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);