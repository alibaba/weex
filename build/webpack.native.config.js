var path = require('path')
var fs = require('fs')

var dirPath = path.resolve(__dirname, '..', 'html5', 'runtime')
var filePath = path.join(dirPath, 'config.js')
if (!fs.existsSync(filePath)) {
  require('child_process').spawnSync('npm', ['run', 'build:config'])
}

var webpack = require('webpack')

var pkg = require('../package.json')

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js$/
})

var version = pkg.subversion.framework

var date = new Date().toISOString().split('T')[0].replace(/\-/g, '')
var banner = `(this.nativeLog || function(s) {console.log(s)})` + 
  `('START JS FRAMEWORK: ${version} Build ${date}');`;

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true
})

module.exports = {
  entry: './html5/native',
  output: {
    path: './dist',
    filename: 'native.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json'}
    ]
  },
  plugins: [bannerPlugin, sourceMapPlugin]
}
