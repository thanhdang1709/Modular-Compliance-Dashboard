// webpack.prod.js
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('./package.json');

const domain = process.env.PRODUCTION_DOMAIN || 'https://biwoco.pages.dev';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        taskOverview: `taskOverview@${domain}/taskOverview/latest/remoteEntry.js`,
        complianceStatus: `complianceStatus@${domain}/complianceStatus/latest/remoteEntry.js`,
        recentActivity: `recentActivity@${domain}/recentActivity/latest/remoteEntry.js`,
        shared: `shared@${domain}/shared/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);