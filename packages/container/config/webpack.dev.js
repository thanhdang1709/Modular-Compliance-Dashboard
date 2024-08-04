const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      exposes: {
        './TaskOverviewApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};