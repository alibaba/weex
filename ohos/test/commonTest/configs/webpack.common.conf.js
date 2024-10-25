console.log('6. building webpack.common.conf.js');

const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const glob = require('glob');
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateDir); // path.join('..', .temp)
const hasPluginInstalled = fs.existsSync(helper.rootNode(config.pluginFilePath));
const isWin = /^win/.test(process.platform);
const webEntry = {};
const weexEntry = {};
const harmonyEntry = {};
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProduction = process.env.NODE_ENV === 'production'
console.log('process.env: ' + process.env.NODE_ENV)
console.log('apiEnv: ' + process.env.apiEnv)
console.log('building webpack.common.conf.js process.platform:' + process.platform);
console.log('building webpack.common.conf.js ISHARMONY:' + process.env.ISHARMONY);

// Wraping the entry file for web.
const getWebEntryFileContent = (entryPath, vueFilePath) => { // .temp/pages/index/entry.web.js, src/pages/index/entry.vue
  console.log('building webpack.common.conf.js getWebEntryFileContent');

  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath); // entryPath相对于vueFilePath的相对路径 ../../../src/pages/index/entry.vue
  let relativeEntryPath = helper.root(config.entryFilePath); // /Users/zhouqi/workspace/msbank/src/entry.js
  let relativePluginPath = helper.rootNode(config.pluginFilePath); // /Users/zhouqi/workspace/msbank/plugins/plugins.js
  let contents = '';
  let entryContents = fs.readFileSync(relativeEntryPath).toString();
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
    relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
  }
  if (hasPluginInstalled) {
    contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
    contents += `import plugins from '${relativePluginPath}';\n`;
    contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
    entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
    contents = ''
  }
  contents += `
    const App = require('${relativeVuePath}').default;
    new Vue(Vue.util.extend({el: '#root'}, App));
  `;
  return entryContents + contents;
}

// Wraping the entry file for native.
const getNativeEntryFileContent = (entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath); // entryPath相对于vueFilePath的相对路径 ../../../src/pages/index/entry.vue
  let contents = '';
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
  }
  contents += `import App from '${relativeVuePath}'
    App.el = '#root'
    new Vue(App)
  `;

  return contents;
}

// Retrieve entry file mappings by function recursion
const getEntryFile = (dir) => {
  console.log('building webpack.common.conf.js getEntryFile');

  dir = dir || config.sourceDir; // src
  const enrtys = glob.sync(`${dir}/${config.entryFilter}`, config.entryFilterOptions); // src/pages/**/entry.vue
  enrtys.forEach(entry => { // src/pages/index/entry.vue
    const extname = path.extname(entry); // .vue
    const basename = entry.replace(`${dir}/`, '').replace(extname, ''); // pages/index/entry
    const templatePathForWeb = path.join(vueWebTemp, basename + '.web.js'); // .temp/pages/index/entry.web.js
    const templatePathForNative = path.join(vueWebTemp, basename + '.js'); // .temp/pages/index/entry.js
    const templatePathForHarmony = path.join(vueWebTemp, basename + '.harmony.js'); // .temp/pages/index/entry.harmony.js
    fs.outputFileSync(templatePathForWeb, getWebEntryFileContent(templatePathForWeb, entry));
    fs.outputFileSync(templatePathForNative, getNativeEntryFileContent(templatePathForNative, entry));
    fs.outputFileSync(templatePathForHarmony, getWebEntryFileContent(templatePathForHarmony, entry));
    webEntry[basename] = templatePathForWeb;
    weexEntry[basename] = templatePathForNative;
    harmonyEntry[basename] = templatePathForHarmony;
  })
}

// Generate an entry file array before writing a webpack configuration
getEntryFile();


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [helper.rootNode('src'), helper.rootNode('test')],
  options: {
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const useEslint = config.dev.useEslint ? [createLintingRule()] : []

/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue"} \n',
    raw: true,
    exclude: 'Vue'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'ISHARMONY': process.env.ISHARMONY,
    },
    GLOBAL_VAR: JSON.stringify({
      'projectName': config.projectName,
      'RSID': process.env.NODE_ENV === 'production' ? config.prod.rsid : config.dev.rsid,
      'RCUUID': process.env.NODE_ENV === 'production' ? config.prod.rcuuid : config.dev.rcuuid,
      'apiEnv': process.env.apiEnv,
      'ISHARMONY': process.env.ISHARMONY,
    })
  })
];

// Config for compile jsbundle for web.
const webConfig = {
  entry: webEntry,
  // entry: {
  //   'entry' : './src/entry.js'
  // },
  output: {
    path: helper.rootNode('.'),
    filename: 'dist/[name].web.js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': helper.resolve('src'),
      'mySensors': helper.resolve('src/assets/js/sensorsdata.min.js')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0
    rules: useEslint.concat([
        // webconfig&weexConfig rules 加入这个配置。指定的包编译为commonjs规范
      {
        test:[/node_modules\/crypto-js/,/node_modules\/weex-bindingx/,
          /node_modules\/@umetrip\/jsapi_weex/,
          /node_modules\/weex-vue-render/,],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: 'cjs',
                useBuiltIns: 'usage',
                corejs: 3,} ]
            ]
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: config.excludeModuleReg
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { plugins: ['transform-vue-jsx'] }
        }]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          options: {
            postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })],
            compilerOptions: {
              modules: [
                {
                  postTransformNode: el => {
                    // to convert vnode for weex components.
                    require('weex-vue-precompiler')()(el)
                  }
                }
              ]
            }
          }
        },
        {
          loader: path.resolve(__dirname, 'gesture-loader.js'),
        },
        {
            loader: path.resolve(__dirname, 'transform-loader.js'),
          }
        ],
        exclude: config.excludeModuleReg
      }
    ])
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    ...plugins,
    new VueLoaderPlugin()
  ],
  // 提取公共文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial'
        }
      }
    }
  }
};

// Config for compile jsbundle for harmony.
const harmonyConfig = {
  entry: harmonyEntry,
  // entry: {
  //   'entry' : './src/entry.js'
  // },
  output: {
    path: helper.rootNode('.'),
    filename: 'dist/[name].harmony.js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': helper.resolve('src'),
      'mySensors': helper.resolve('src/assets/js/sensorsdata.min.js')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0
    rules: useEslint.concat([
        // webconfig&weexConfig rules 加入这个配置。指定的包编译为commonjs规范
      {
        test:[/node_modules\/crypto-js/,/node_modules\/weex-bindingx/,
          /node_modules\/@umetrip\/jsapi_weex/,
          /node_modules\/weex-vue-render/,],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: 'cjs',
                useBuiltIns: 'usage',
                corejs: 3,} ]
            ]
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: config.excludeModuleReg
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { plugins: ['transform-vue-jsx'] }
        }]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          options: {
            postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })],
            compilerOptions: {
              modules: [
                {
                  postTransformNode: el => {
                    // to convert vnode for weex components.
                    require('weex-vue-precompiler')()(el)
                  }
                }
              ]
            }
          }
        }],
        exclude: config.excludeModuleReg
      }
    ])
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    ...plugins,
    new VueLoaderPlugin()
  ],
  // 提取公共文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial'
        }
      }
    }
  }
};

// Config for compile jsbundle for native.
let splitChunk = isProduction ? config.prod.splitChunk : config.dev.splitChunk
let optimization = splitChunk ? {
  splitChunks: {
    cacheGroups: {
      commons: {
        name: 'commons',
        minChunks: 2,
        chunks: 'initial'
      }
    }
  }
} : {}

const weexConfig = {
  entry: weexEntry,
  // entry: {
  //   app: './src/entry.js'
  // },
  output: {
    path: helper.rootNode('./dist'),
    filename: '[name].js',
    chunkFilename: 'pages/[name].js',
    globalObject: 'this'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': helper.resolve('src'),
      'mySensors': helper.resolve('src/assets/js/sensorsdata.min.js')
    }
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      // webconfig&weexConfig rules 加入这个配置。指定的包编译为commonjs规范
      {
        test: [/node_modules\/crypto-js/,/node_modules\/weex-bindingx/,
          /node_modules\/@umetrip\/jsapi_weex/,
          /node_modules\/weex-vue-render/,],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: 'cjs',
                useBuiltIns: 'usage',
                corejs: 3,} ]
            ]
          }
        }],
      },
      {
        test:[/node_modules\/crypto-js/,/node_modules\/weex-bindingx/,
          /node_modules\/@umetrip\/jsapi_weex/,
          /node_modules\/weex-vue-render/,],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: 'cjs',
                useBuiltIns: 'usage',
                corejs: 3,} ]
            ]
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: config.excludeModuleReg
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { plugins: ['transform-vue-jsx'] }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: config.dev.cssSourceMap
          }
        }]
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-vue-loader',
          // options: vueLoaderConfig({useVue: false})
        }],
        exclude: config.excludeModuleReg
      }
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    ...plugins
  ],
  optimization: {
    ...optimization
  },
  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: config.nodeConfiguration
};

console.log('building webpack.common.conf.js export three config, webConfig、weexConfig and harmonyConfig');
module.exports = [webConfig, weexConfig, harmonyConfig];
