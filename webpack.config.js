const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './index.js',
        work: './work/work.js',
        team: './team/team.js',
        contact: './contact/contact.js',
        vr: './vr/vr.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /.(ttf|mp4|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]',
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'head',
            excludeChunks: ['team', 'work', 'vr', 'contact']
        }),
        new HtmlWebpackPlugin({
            template: './team/team.html',
            filename: 'team.html',
            inject: 'head',
            chunks: ['team']
        }),
        new HtmlWebpackPlugin({
            template: './work/work.html',
            filename: 'work.html',
            inject: 'head',
            chunks: ['work']
        }),
        new HtmlWebpackPlugin({
            template: './vr/vr.html',
            filename: 'vr.html',
            inject: 'head',
            chunks: ['vr']
        }),
        new HtmlWebpackPlugin({
            template: './contact/contact.html',
            filename: 'contact.html',
            inject: 'head',
            chunks: ['contact']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            'THREE': 'three'
        })
    ]
};