const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by
                ]
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Backbonejs Stock Watcher',
            template: 'src/index.hbs'
        }),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.hbs', '.js', '.json', '.scss', '.css'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules', path.resolve(__dirname)]
    }
};
