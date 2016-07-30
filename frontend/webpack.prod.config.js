const autoprefixer = require('autoprefixer')
const path = require('path')
const config = require('./config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

config.set('SOCKET_URL', 'mastering-mean.herokuapp.com/api')
config.set('API_URL', 'https://mastering-mean.herokuapp.com/api/v1/')

module.exports = {
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),
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
  module: {
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
            console.log(p1);
            console.log(config.get(p1));
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
