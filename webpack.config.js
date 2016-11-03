var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './script.js',
    output: { path: __dirname, filename: 'bundle/bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
