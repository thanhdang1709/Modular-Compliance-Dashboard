const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'taskOverview',
      filename: 'remoteEntry.js',
      exposes: {
        './TaskOverviewApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};