var webpack = require('webpack')
var pkg = require('./package.json')

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js$/
})

var version = pkg.version
var banner = `(this.nativeLog || function(s) {console.log(s)})('START WEEX HTML5: ${pkg.version}');`;

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: './src/weex',
  output: {
    path: './dist',
    filename: 'index.js',
  },
  // devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
  },
  plugins: [bannerPlugin, sourceMapPlugin]
}
