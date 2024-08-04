const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
            name: 'shared',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App',
                './store': './src/store'
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
                zustand: { singleton: true, requiredVersion: deps.zustand }, 
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        port: 3005,
        open: true,
    },
};