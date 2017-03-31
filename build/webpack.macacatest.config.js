var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var entry = {};
var bannerExcludeFiles = [];

function walk(dir) {
  dir = dir || '.'
  var directory = path.join(__dirname, '../test/pages', dir);
  fs.readdirSync(directory)
    .forEach(function(file) {
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      if (stat.isFile() && (extname === '.we' || extname === '.vue')) {
        var name = path.join('test', 'build', dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
        if (extname === '.we') {
          bannerExcludeFiles.push(name + '.js')
        }
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        var subdir = path.join(dir, file);
        walk(subdir);
      }
    });
}

walk();

var banner = '// { "framework": "Vue" }\n'

var bannerPlugin = new webpack.BannerPlugin(banner, {
  raw: true,
  exclude: bannerExcludeFiles
})

module.exports = {
  entry: entry,
  output : {
    path: '.',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        loader: 'weex-vue-loader'
      }
    ]
  },
  plugins: [bannerPlugin]
}
