const webpack = require("webpack")
const path = require('path')
module.exports = {
    cache: true,
    entry: {
        AppRouter: './app/src/router/AppRouter'
    },
    output: {
        path: path.join(__dirname, 'app/build/router'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    node: {
        __dirname: false
    },
    target: "electron-main",
    mode: "development",
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.css$/, loader: "css-loader"},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            publicPath:path.join(__dirname,"app/build/assets")
                        }
                    }
                ]
            }
        ]
    }
};