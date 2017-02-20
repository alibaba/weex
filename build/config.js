const path = require('path')
const json = require('rollup-plugin-json')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const postcss = require('rollup-plugin-postcss')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const commonjs = require('rollup-plugin-commonjs')
const buble = require('rollup-plugin-buble')
const subversion = require('../package.json').subversion

const frameworkBanner = `;(this.getJSFMVersion = function()`
  + `{return "${subversion.framework}"});\n`
  + `var global = this, process = { env: {} };var setTimeout = global.setTimeout;\n`

const configs = {
  'weex-js-framework': {
    moduleName: 'Weex',
    entry: absolute('html5/render/native/index.js'),
    dest: absolute('dist/native.js'),
    banner: `(this.nativeLog || function(s) {console.log(s)})`
      + `('START JS FRAMEWORK ${subversion.framework}, Build ${now()}.');\n`
      + frameworkBanner,
    format: 'umd',
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
    ]
  },
  'weex-js-runtime': {
    moduleName: 'WeexRuntime',
    entry: absolute('html5/runtime/index.js'),
    dest: absolute('dist/runtime.js'),
    banner: `/* 'WEEX JS RUNTIME ${subversion.framework}, Build ${now()}. */\n\n`
      + frameworkBanner,
    format: 'umd',
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
    ]
  },
  'weex-web-render': {
    moduleName: 'Weex',
    entry: absolute('html5/render/browser/index.js'),
    dest: absolute('dist/browser.js'),
    banner: `(this.nativeLog || function(s) {console.log(s)})`
      + `('START WEEX HTML5: ${subversion.browser}, Build ${now()}.');\n`
      + frameworkBanner,
    format: 'umd',
    plugins: [
      postcss(),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true
      })
    ]
  },
  'weex-vue-render': {
    moduleName: 'WeexVueRender',
    entry: absolute('html5/render/vue/index.js'),
    dest: absolute('packages/weex-vue-render/index.js'),
    banner: `/* 'WEEX VUE RENDER ${subversion.vueRender}, Build ${now()}. */\n\n`,
    format: 'umd',
    plugins: [
      postcss(),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true
      })
    ]
  }
}

function getConfig (name, minify) {
  const opt = configs[name]
  const config = {
    moduleName: opt.moduleName,
    entry: opt.entry,
    dest: minify ? opt.dest.replace(/\.js$/, '.min.js') : opt.dest,
    format: opt.format,
    banner: opt.banner,
    plugins: opt.plugins.concat([
      json(),
      replace({
        'process.env.VIEWPORT_WIDTH': 750,
        'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development'),
        'process.env.VUE_ENV': JSON.stringify('WEEX'),
        'process.env.NODE_DEBUG': false
      }),
      commonjs(),
      buble()
    ])
  }

  if (minify) {
    config.plugins.push(uglify())
  }
  else {
    config.sourceMap = 'inline'
    config.plugins.unshift(eslint({ exclude: ['**/*.json', '**/*.css'] }))
  }

  return config
}

// get the absolute path
function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

function now () {
  const time = Date.now() - (new Date()).getTimezoneOffset() * 60000
  return (new Date(time)).toISOString().replace('T', ' ').substring(0, 16)
}

module.exports = getConfig
