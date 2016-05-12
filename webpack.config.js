var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var loader = require('weex-loader');
var scripter = require('weex-scripter');
var styler = require('weex-styler');
var templater = require('weex-templater');

loader.useScripter(scripter);
loader.useStyler(styler);
loader.useTemplater(templater);

var entry = {};

function walk(dir, root) {
  var directory = path.join(__dirname, root, dir);
  fs.readdirSync(directory)
    .forEach(function(file) {
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      if (stat.isFile() &&
             (extname === '.we' || extname === '.js')) {
        var name = path.join(root, 'build', dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() &&
                  file !== 'build') {
        var subdir = path.join(dir, file);
        walk(subdir, root);
      }
    });
}
walk('./', 'examples');
walk('./', 'test');

module.exports = {
  entry: entry,
  output : {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      },
      {
        test: /\.js(\?[^?]+)?$/,
        loader: 'weex?type=script'
      },
      {
        test: /\.css(\?[^?]+)?$/,
        loader: 'weex?type=style'
      }, 
      {
        test: /\.html(\?[^?]+)?$/,
        loader: 'weex?type=tpl'
      }
    ]
  }
}
