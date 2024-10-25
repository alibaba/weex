const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

console.log('TestXXX utils.js');

exports.cssLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins: [
        require('postcss-plugin-px2rem')({
          // base on 750px standard.
          rootValue: 75,
          // to leave 1px alone.
          minPixelValue: 1.01
        })
      ]
    }
  }

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    let loaders = options.useVue ? [cssLoader] : []
    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // if (options.useVue) {
    //   return ['vue-style-loader'].concat(loaders)
    // }
    // else {
    //   return loaders
    // }
    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../'
        }
      }].concat(loaders)
    } else if (options.useVue) {
      return ['vue-style-loader'].concat(loaders)
    } else {
      return loaders
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
