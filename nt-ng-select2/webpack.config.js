const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, global) {
    'use strict';

    return {
        context: __dirname,
        entry: {
            main: './src/main.ts',
            polyfills: './src/polyfills.ts'
        },
        output: {
            path: path.resolve('dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].[chunkhash].js',
            sourceMapFilename: 'maps/[name].map'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: [/node_modules/] // do not lint third-party code
                },
                {test: /\.ts$/, loader: 'awesome-typescript', exclude: [/node_modules/]},
                {test: /\.less$/, use: ['raw', 'less'], exclude: [/node_modules/]},
                {test: /.*\.html$/, use: ['raw']}
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.less'],
            enforceExtension: false,
            modules: [
                path.resolve(path.join('src')),
                path.resolve(path.join(__dirname, 'node_modules'))
            ],
            alias: {}
        },
        resolveLoader: {
            moduleExtensions: ['-loader']
        },
        bail: true,
        cache: true,
        devServer: {
            port: 9999,
            clientLogLevel: 'none',
            compress: true,
            quiet: false,
            noInfo: false,
            stats: {
                colors: true
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                // children: true,
                names: ['main', 'polyfills'],
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                title: 'nt-select',
                filename: 'index.html',
                template: path.resolve('src', 'index.html')
            })
        ]
    };
};