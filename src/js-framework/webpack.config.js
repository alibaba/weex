var webpack = require('webpack')
var pkg = require('./package.json')

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js$/
})

var version = pkg.version
var banner = `(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: ${pkg.version}');`;

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: './index',
  output: {
    path: './dist',
    filename: 'index.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json'}
    ]
  },
  plugins: [bannerPlugin, sourceMapPlugin]
}
