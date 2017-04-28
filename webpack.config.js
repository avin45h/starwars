var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_PATH_PREFIX = 'client';
const ENTRY_POINT_APP = 'index.jsx';
const CLIENT_BUILD_PATH = 'build';

module.exports = {
    'entry': {
        'app': path.resolve(__dirname, CLIENT_PATH_PREFIX, ENTRY_POINT_APP),
        'vendor': ['react', 'react-router', 'react-dom']
    },
    'output': {
        path: path.resolve(__dirname, CLIENT_PATH_PREFIX, CLIENT_BUILD_PATH),
        publicPath: '/',
        filename: 'js/[name].[chunkhash:6].bundle.js'
    },
    'module': {
        'rules': [
            {
                'test': /\.jsx?$/,
                'exclude': /(node_modules|bower_components)/,
                'use': {
                    'loader': 'babel-loader',
                    'options': {
                        'presets': ['es2015', 'react']
                    }
                }
            },
            {
                'test': /\.s?css$/,
                'use': ExtractTextPlugin.extract({
                    'fallback': 'style-loader',
                    'use': [
                        {
                            'loader': 'css-loader',
                            'options': {
                                modules: true,
                                localIdentName: '[hash:base64:5]'
                            }
                        },
                        {
                            'loader': 'postcss-loader',
                            'options': {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('postcss-import')({
                                            addDependencyTo: webpack
                                        }),
                                        require('postcss-cssnext')({
                                            browsers: ['Chrome >= 31', 'Firefox >= 31', 'IE >= 9'],
                                            url: false
                                        }),
                                        require('postcss-nested')
                                    ];
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }),
                'exclude': /node_modules/
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|svg)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    'resolve': {
        'alias': {
            '~': path.resolve(__dirname, 'node_modules'),
            'react': path.resolve(__dirname, 'node_modules/react')
        }
    },
    'plugins': [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('css/app.[chunkhash:6].bundle.css'),
        new HtmlWebpackPlugin({
            'title': 'starwars',
            'template': './client/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            'names': [ 'vendor', 'manifest' ]
        })
    ]
};
