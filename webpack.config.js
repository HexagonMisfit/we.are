const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var webpack = require("webpack");

module.exports = {
    context: __dirname + '/src/',
    entry: {
        app: './home/index.js',
        contact: './contact/contact.js',
        team: './team/team.js',
        vr: './vr/vr.js',
        work: './work/work.js',
        project: './project/project.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'client/'),
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
        new CleanWebpackPlugin(['client/dist']),
        new ExtractTextPlugin('style.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            'THREE': 'three'
        })
    ]
};