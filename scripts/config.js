/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const path = require('path')
const json = require('rollup-plugin-json')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const uglifyES = require('uglify-es')
const commonjs = require('rollup-plugin-commonjs')
const buble = require('rollup-plugin-buble')
const packageJSON = require('../package.json')
const deps = packageJSON.dependencies
const subversion = packageJSON.subversion

const frameworkBanner = `var global=this; var process={env:{}}; `
  + `var setTimeout=global.setTimeout;\n`

const configs = {
  'weex-js-framework': {
    input: absolute('runtime/entries/index.js'),
    output: {
      name: 'Weex',
      file: absolute('dist/weex-js-framework'),
      banner: `(this.nativeLog || function(s) {console.log(s)})`
        + `('START JS FRAMEWORK ${subversion.framework}, Build ${now()}. `
        + `(Vue: ${deps['weex-vue-framework']}, Rax: ${deps['weex-rax-framework']})');\n`
        + frameworkBanner
    }
  },
  'weex-env': {
    input: absolute('runtime/entries/env.js'),
    output: {
      name: 'WeexEnvironmentAPIs',
      file: absolute('dist/weex-env'),
      banner: `/* Prepare Weex Environment APIs ${subversion.framework}, Build ${now()}. */\n\n`
        + `var global = this; var process = {env:{}};`
    }
  },
  'weex-polyfill': {
    input: absolute('runtime/entries/polyfill.js'),
    output: {
      format: 'iife',
      file: absolute('dist/weex-polyfill')
    }
  },
  'weex-vue': {
    input: absolute('runtime/entries/vue.js'),
    output: {
      name: 'WeexVue',
      file: absolute('dist/weex-vue'),
      banner: `(this.nativeLog || function(s) {console.log(s)})`
        + `('Weex JS Framework ${subversion.framework}, Build ${now()}. `
        + `(Vue: ${deps['weex-vue-framework']})');\n`
        + frameworkBanner
    }
  },
  'weex-rax': {
    input: absolute('runtime/entries/rax.js'),
    output: {
      name: 'WeexRax',
      file: absolute('dist/weex-rax'),
      banner: `(this.nativeLog || function(s) {console.log(s)})`
        + `('Weex JS Framework ${subversion.framework}, Build ${now()}. `
        + `(Rax: ${deps['weex-rax-framework']})');\n`
        + frameworkBanner
    }
  },
  'weex-js-runtime': {
    input: absolute('runtime/api/index.js'),
    output: {
      name: 'WeexJSRuntime',
      file: absolute('packages/weex-js-runtime/index'),
      banner: `/* Weex JS Runtime ${subversion.framework}, Build ${now()}. */\n\n`
    }
  },
  'weex-legacy': {
    input: absolute('runtime/entries/legacy.js'),
    output: {
      name: 'WeexLegacy',
      file: absolute('dist/weex-legacy'),
      banner: `(this.nativeLog || function(s) {console.log(s)})`
        + `('Weex Legacy Framework ${subversion.framework}, Build ${now()}.');\n`
        + frameworkBanner
    }
  },
  'weex-vanilla-framework': {
    input: absolute('runtime/frameworks/vanilla/index.js'),
    output: {
      name: 'WeexVanillaFramework',
      file: absolute('packages/weex-vanilla-framework/index'),
      banner: `/* Weex Vanilla Framework ${subversion.framework}, Build ${now()}. */\n`
    }
  }
}

function getConfig (name, minify, es6) {
  const opt = configs[name]
  if (!opt.plugins) {
    opt.plugins = []
  }
  const output = opt.output
  const suffix = `${es6 ? '.es6' : ''}${minify ? '.min' : ''}.js`
  const config = {
    input: opt.input,
    output: {
      name: output.name,
      file: output.file + suffix,
      format: output.format || 'umd',
      banner: output.banner,
      sourcemap: true
    },
    plugins: opt.plugins.concat([
      nodeResolve({ jsnext: true, main: true }),
      json(),
      replace({
        '__WEEX_VERSION__': JSON.stringify(packageJSON.version),
        '__WEEX_JS_FRAMEWORK_VERSION__': JSON.stringify(subversion.framework),
        'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development'),
        'process.env.VUE_ENV': JSON.stringify('WEEX'),
        'process.env.WEEX_FREEZE': JSON.stringify(!!process.env.WEEX_FREEZE),
        'process.env.SUPPORT_ES2015': !!es6,
        'process.env.NODE_DEBUG': false
      }),
      commonjs({ ignoreGlobal: true })
    ])
  }
  if (!es6) {
    config.plugins.push(buble())
  }
  if (minify) {
    config.plugins.push(es6
      ? uglify({ safari10: true, toplevel: true }, uglifyES.minify)
      : uglify()
    )
  }
  else {
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
