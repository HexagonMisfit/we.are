const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
var webpack = require("webpack");

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './index.js',
        contact: './contact/contact.js',
        mariposa: './work/mariposa/mariposa.js',
        secret: './secret/secret.js',
        team: './team/team.js',
        vr: './vr/vr.js',
        work: './work/work.js'
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
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            inject: 'head',
            excludeChunks: ['team', 'work', 'vr', 'contact', 'mariposa', 'secret']
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
            template: './work/mariposa/mariposa.html',
            filename: './work/mariposa.html',
            inject: 'head',
            chunks: ['mariposa']
        }),
        new HtmlWebpackPlugin({
            template: './secret/secret.html',
            filename: 'secret.html',
            inject: 'head',
            chunks: ['secret']
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