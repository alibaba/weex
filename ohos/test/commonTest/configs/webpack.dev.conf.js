const commonConfig = require('./webpack.common.conf');
const DevserverQRcodeWebpackPlugin = require('./qrcode-w-plugin');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
// tools
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const ip = require('ip').address();

/**
 * Webpack Plugins
 */
// const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const config = require('./config');
const utils = require('./utils');
const helper = require('./helper');
const FileManagerPlugin = require('filemanager-webpack-plugin');

/**
 * Modify the url that will open on the browser.
 * @param {Array} entry 
 */
const postMessageToOpenPage = (entry, ip, port) => {
  let entrys = Object.keys(entry);
  // let openpage = config.dev.openPage;
  // exclude vendor entry.
  entrys = entrys.filter(entry => entry !== 'vendor');
  let entryIndex = 0;
  entrys.forEach((entry, index) => {
    if (entry.includes('index')) {
      entryIndex = index
    }
  });
  openpage = process.env.ISHARMONY==='true' ? `dist/${entrys[entryIndex]}.harmony.html` : `dist/${entrys[entryIndex]}.html`
  // openpage += `?_wx_tpl=http://${ip}:${port}/dist/${entrys[entryIndex]}.js`;
  return openpage;
}

/**
 * Generate multiple entrys
 * @param {Array} entry 
 */
const generateHtmlWebpackPlugin = (entry) => {
  let entrys = Object.keys(entry);
  // exclude vendor entry.
  entrys = entrys.filter(entry => entry !== 'vendor');
  const htmlPlugin = entrys.map(name => {
    return new HtmlWebpackPlugin({
      multihtmlCache: true,
      filename: process.env.ISHARMONY==='true'?  'dist/' + name + '.harmony' + '.html' : 'dist/' + name +  '.html',
      template: helper.rootNode(`web/index.html`),
      isDevServer: true,
      chunksSortMode: 'dependency',
      inject: true,
      devScripts: config.dev.htmlOptions.devScripts,
      chunks: ['commons', name]
    })
  })
  return htmlPlugin;
}
/**
 * Webpack configuration for browser.
 */
const devWebpackConfig = webpackMerge(process.env.ISHARMONY==='true' ? commonConfig[2] : commonConfig[0], {
  entry: {
    vendor: [path.resolve('node_modules/phantom-limb/index.js')]
  },
  module: {
    rules: [...utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        usePostCSS: true,
        useVue: true
      }),
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100,
            publicPath: '../../',
            name: path.posix.join('dist/images', './[name].[ext]')
          }
        }]
      }
    ]
  },
  devtool: config.dev.devtool,
  plugins: [
    new DevserverQRcodeWebpackPlugin({
      size: 'small' // large
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': config.dev.env,
    //   },
    //   GLOBAL_VAR: JSON.stringify({
    //     'RSID': config.dev.rsid,
    //     'RCUUID': config.dev.rcuuid
    //   })
    // }),
    ...generateHtmlWebpackPlugin(process.env.ISHARMONY === 'true' ? commonConfig[2].entry : commonConfig[0].entry),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // })
  ],
  /**
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: config.dev.contentBase,
    host: config.dev.host,
    port: config.dev.port,
    historyApiFallback: config.dev.historyApiFallback,
    public: config.dev.public,
    open: config.dev.open,
    watchContentBase: config.dev.watchContentBase,
    overlay: config.dev.errorOverlay ?
      {
        warnings: false,
        errors: true
      } :
      false,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    // openPage: encodeURI(openPage),
    watchOptions: config.dev.watchOptions
  }
});

/**
 * Webpack configuration for weex.
 */
const weexConfig = webpackMerge(commonConfig[1], {
  watch: true,
  mode: 'development',
  plugins: [
    new FileManagerPlugin({
      onStart: {
        delete: ['./dist/images/'],
        copy: [{
            source: './src/images', // image-loader不识别image标签里的图片，得把图片拷贝过去
            destination: `./dist/images`
          },
          {
            source: './src/web',
            destination: `./dist/web`
          },
          {
            source: './src/assets/fonts',
            destination: `./dist/assets/fonts`
          }
        ]
      }
    })
  ]
})

console.log('building webpack.dev.conf.js webpack');

// build source to weex_bundle with watch mode.
webpack(weexConfig, (err, stats) => {
  if (err) {
    console.err('COMPILE ERROR:', err.stack)
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      devWebpackConfig.devServer.public = `${ip}:${port}`
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here: ${chalk.yellow(`http://${devWebpackConfig.devServer.host}:${port}`)}.`
          ],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }))
      const entryInfo = process.env.ISHARMONY === 'true' ? commonConfig[2].entry: commonConfig[0].entry;
      const openPage = postMessageToOpenPage(entryInfo, ip, port);
      devWebpackConfig.devServer.openPage = encodeURI(openPage)
      // wsTempServer = new wsServer(port+1)
      resolve(devWebpackConfig)
    }
  })
})
