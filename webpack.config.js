const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './index.js',
        home: './home/home.js',
        work: './work/work.js',
        team: './team/team.js',
        contact: './contact/contact.js',
        vr: './vr/vr.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        alias: {
            'three/AnaglyphEffect': path.join(__dirname, 'node_modules/three/examples/js/effects/AnaglyphEffect.js')
        }
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
            filename: './index.html',
            excludeChunks: ['home', 'team', 'work', 'contact', 'vr'],
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            template: './team/team.html',
            filename: 'templates/team.html',
            chunks: ['team']
        }),
        new HtmlWebpackPlugin({
            template: './home/home.html',
            filename: 'templates/home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './work/work.html',
            filename: 'templates/work.html',
            chunks: ['work']
        }),
        new HtmlWebpackPlugin({
            template: './vr/vr.html',
            filename: 'vr.html',
            chunks: ['vr']
        }),
        new HtmlWebpackPlugin({
            template: './contact/contact.html',
            filename: 'templates/contact.html',
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