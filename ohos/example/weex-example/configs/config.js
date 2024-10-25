console.log('3. TestXXX config.js');

const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const ip = require('ip').address();

console.log('TestXXX config.js');

const config = {
  root: ROOT,
  // webpack-dev-server
  pluginConfigPath: 'plugins/plugins.json',
  pluginFilePath: 'plugins/plugins.js',
  projectName: 'frameworkTest',
  // router
  routerFilePath: 'router.js',
  // common
  sourceDir: process.env.NODE_SOURCE_DIR || 'src',
  templateDir: '.temp',
  entryFilePath: 'entry.js',
  // Module exclude from compile process
  excludeModuleReg: /node_modules(?!(\/|\\).*(weex).*)/,
  // Filter for entry files
  // see: https://www.npmjs.com/package/glob#glob-primer
  entryFilter: process.env.NODE_ENTRY_RILTER || 'pages/**/entry.vue', // 'pages/!(canvas|canvas_f2|html|view|static|card)/entry.vue'
  // Options for the filter
  // see: https://www.npmjs.com/package/glob#options
  entryFilterOptions: process.env.NODE_ENTRY_RILTER_OPTIONS || {},
  dev: {
    // Various Dev Server settings
    contentBase: ROOT,
    host: ip,
    port: 8000,
    historyApiFallback: true,
    open: !process.env.NODE_NOT_OPEN,
    watchContentBase: true,
    openPage: process.env.NODE_OPEN_PAGE || 'index.html',
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: false
    },
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    // useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',
    env: JSON.stringify('development'),
    rsid: '39457947$$d6a4ba59a0e845c6bb488380b4f600d5',
    rcuuid: 'w163694ef1c3342aabffa244cee9a1f74',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    proxyTable: {
      '/gateway': {
        target: 'http://gray.umetrip.com/',
        changeOrigin: true
      }
    },
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    htmlOptions: {
      devScripts: ''
    },
    splitChunk: false
  },
  test: {
    env: JSON.stringify('test')
  },
  prod: {
    env: JSON.stringify('production'),
    rsid: '',
    rcuuid: '',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    cssSourceMap: true,
    splitChunk: true
  },
  nodeConfiguration: {
    global: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
    clearImmediate: false,
    // see: https://github.com/webpack/node-libs-browser
    assert: false,
    buffer: false,
    child_process: false,
    cluster: false,
    console: false,
    constants: false,
    crypto: false,
    dgram: false,
    dns: false,
    domain: false,
    events: false,
    fs: false,
    http: false,
    https: false,
    module: false,
    net: false,
    os: false,
    path: false,
    process: false,
    punycode: false,
    querystring: false,
    readline: false,
    repl: false,
    stream: false,
    string_decoder: false,
    sys: false,
    timers: false,
    tls: false,
    tty: false,
    url: false,
    util: false,
    vm: false,
    zlib: false
  }
}
module.exports = config;
