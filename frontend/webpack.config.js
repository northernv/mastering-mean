const autoprefixer = require('autoprefixer')
const path = require('path')
const config = require('./config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      './src/app.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './public',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    port: 8000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new StringReplacePlugin()
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  },
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.js?$/,
        loader: 'standard',
        exclude: /node_modules/
      }
    ],
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel'],
      exclude: /node_modules/
    },
    {
      test: /config.js$/,
      loader: StringReplacePlugin.replace({
        replacements: [{
          pattern: /@@(\w*?)@@/ig,
          replacement: function (match, p1, offset, string) {
            return config.get(p1)
          }
        }]
      })
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass?includePaths[]=' + (path.resolve(__dirname, './node_modules')))
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }]
  }
}
