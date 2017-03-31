var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var bannerPlugin = new webpack.BannerPlugin('//banner\n', {
  raw: true
})

var devtool = '#inline-source-map'
var filename = 'vue-renderer.js'

var plugins = [
  bannerPlugin,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
]

if (process.env.NODE_ENV === 'production') {
  devtool = null
  filename = 'vue-renderer.min.js'
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

module.exports = {
  entry: path.resolve('./html5/render/vue/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: filename
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vender/
      }, {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  devtool: devtool,
  plugins: plugins
}
