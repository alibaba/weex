console.log('5. building webpack.harmony.conf.js, depend webpack.common.conf.js, config.js, helper.js, utils.js');

const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const os = require('os');
const webpack = require('webpack');

const config = require('./config');
const helper = require('./helper');
// const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const utils = require('./utils');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Generate multiple entrys
 * @param {Array} entry 
 */
const generateHtmlWebpackPlugin = (entry) => {
  console.log('building generateHtmlWebpackPlugin');

  let entrys = Object.keys(entry);
  // exclude vendor entry.
  entrys = entrys.filter(entry => entry !== 'vendor' );
  const htmlPlugin = entrys.map(name => {
    return new HtmlWebpackPlugin({
      title: ' ',
      multihtmlCache: true,
      filename: name + '.html',
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

const harmonyConfig = webpackMerge(commonConfig[0], {
  mode: 'production',
  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: config.prod.roductionSourceMap ? config.prod.devtool : false,
  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: helper.rootNode('./dist_harmony_web'),
    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].[hash].web.js',
    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    // sourceMapFilename: '[name].web.map'
  },
  module: {
    rules: [...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true, useVue: true }),
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100,
            publicPath: '../../',
            name: 'images/[name].[ext]'
          }
        }]
      }
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    // 清除output.path文件夹
    new CleanWebpackPlugin(),
    /**
     * Plugin: webpack.DefinePlugin
     * Description: The DefinePlugin allows you to create global constants which can be configured at compile time. 
     *
     * See: https://webpack.js.org/plugins/define-plugin/
     */
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': config.prod.env
    //   },
    //   GLOBAL_VAR: JSON.stringify({
    //     'RSID': config.prod.rsid,
    //     'RCUUID': config.prod.rcuuid
    //   })
    // }),
    ...generateHtmlWebpackPlugin(commonConfig[0].entry),
    /*
     * Plugin: UglifyJsparallelPlugin
     * Description: Identical to standard uglify webpack plugin
     * with an option to build multiple files in parallel
     *
     * See: https://www.npmjs.com/package/webpack-uglify-parallel
     */
    // new UglifyJsparallelPlugin({
    //   workers: os.cpus().length,
    //   mangle: true,
    //   compressor: {
    //     warnings: false,
    //     // drop_console: true,
    //     drop_debugger: true
    //   }
    // }),
    new FileManagerPlugin({
      onStart: {
        delete: [
          `./${config.projectName}_harmony_web.zip`, // 删除之前已经存在的压缩包
        ]
      },
      onEnd: {
        mkdir: [`./tempzip/${config.projectName}_web`],
        copy: [
          {
            source: './src/images', // image-loader不识别image标签里的图片，得把图片拷贝过去
            destination: `./tempzip/${config.projectName}_web/images`
          },
          {
            source: './src/assets/fonts',
            destination: `./tempzip/${config.projectName}/assets/fonts`
          },
          {
            source: './src/web',
            destination: `./tempzip/${config.projectName}_web/web`
          },
          {
            source: './dist_harmony_web',
            destination: `./tempzip/${config.projectName}_web`
          }
        ],
        archive: [
          {
            source: './tempzip/',
            destination: `${config.projectName}_harmony_web.zip`
          }
        ],
        delete: ['./tempzip']
      }
    })
  ]
});

console.log('building webpack.harmony.conf.js export harmonyConfig');
module.exports = [harmonyConfig]
