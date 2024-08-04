const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        hot: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            filename: 'remoteEntry.js',
            remotes: {
                taskOverview: 'taskOverview@http://localhost:3001/remoteEntry.js',
                complianceStatus: 'complianceStatus@http://localhost:3002/remoteEntry.js',
                recentActivity: 'recentActivity@http://localhost:3003/remoteEntry.js',
                shared: 'shared@http://localhost:3005/remoteEntry.js',
            },
            exposes: {
                './App': './src/App',
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
                '@modular-compliance-dashboard/shared': {
                    singleton: true,
                    // requiredVersion: deps['@modular-compliance-dashboard/shared'],               
                },
                zustand: { singleton: true, requiredVersion: deps.zustand },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
};
