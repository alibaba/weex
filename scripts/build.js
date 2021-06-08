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

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const getConfig = require('./config')

let isWatch = false
if (process.argv[3]) {
  isWatch = process.argv[3] === '--watch' || process.argv[3] === '-w'
}

// build specific package
if (process.argv[2]) {
  build(process.argv[2])
}
else {
  console.log('\nPlease specify the package you want to build. [native, runtime, browser, vue]')
}

function runRollupOnWatch (config) {
  const watcher = rollup.watch(config)
  watcher.on('event', event => {
    switch (event.code) {
      case 'START': break
      case 'BUNDLE_START': console.log('bundling...'); break
      case 'BUNDLE_END': {
        console.log('bundled in ' + config.output.file
          + ' (' + event.duration + 'ms)')
        console.log('Watching for changes...')
      } break
      case 'END': break
      case 'ERROR': console.error('ERROR: ', event.error); break
      case 'FATAL': console.error('FATAL: ', event.error); break
      default: console.error('unknown event', event)
    }
  })
}

async function runRollup (config) {
  const bundle = await rollup.rollup(config)
  const outputOptions = config.output
  if (Array.isArray(outputOptions)) {
    for (let i = 0; i < outputOptions.length; ++i) {
      await bundle.write(outputOptions[i])
      report(outputOptions[i].output.file)
    }
  }
  else {
    await bundle.write(outputOptions)
    report(outputOptions.file)
  }
}

async function build (name) {
  let pkgName = 'weex-js-framework'
  switch (name) {
    case 'jsfm':
    case 'native': pkgName = 'weex-js-framework'; break
    case 'env': pkgName = 'weex-env'; break
    case 'polyfill': pkgName = 'weex-polyfill'; break
    case 'vue': pkgName = 'weex-vue'; break
    case 'rax': pkgName = 'weex-rax'; break
    case 'runtime': pkgName = 'weex-js-runtime'; break
    case 'legacy': pkgName = 'weex-legacy'; break
    case 'vanilla': pkgName = 'weex-vanilla-framework'; break
  }

  const config = getConfig(pkgName)
  const minifyConfig = getConfig(pkgName, true)
  // const ES6Config = getConfig(pkgName, false, true)
  // const ES6MinifyConfig = getConfig(pkgName, true, true)

  if (isWatch) {
    return await runRollupOnWatch(config)
  }
  else {
    console.log(`\n => start to build ${pkgName}\n`)
    await runRollup(config)
    await runRollup(minifyConfig)
    // await runRollup(ES6Config)
    // await runRollup(ES6MinifyConfig)
  }
}

function report (filePath) {
  const size = (fs.statSync(filePath).size / 1024).toFixed(2) + 'KB'
  const file = path.relative(process.cwd(), filePath)
  console.log(` => ${file} (${size})`)
}
