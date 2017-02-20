const fs = require('fs')
const path = require('path')
const gzip = require('zlib').createGzip()
const pkg = require('../package.json')
const rollup = require('rollup')
const watch = require('rollup-watch')

const getConfig = require('./config')

// create dist folder
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

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

function runRollupOnWatch(config) {
  const watcher = watch(rollup, config)
  watcher.on('event', event => {
    switch ( event.code ) {
      case 'STARTING':
        console.log('checking rollup-watch version...')
        break

      case 'BUILD_START':
        console.log('bundling...')
        break

      case 'BUILD_END':
        console.log('bundled in ' + path.relative(process.cwd(), config.dest)
          + ' (' + event.duration + 'ms)')
        console.log('Watching for changes...' )
        break

      case 'ERROR':
        console.error('ERROR: ', event.error)
        break

      default:
        console.error('unknown event', event)
    }
  })
}

function runRollup (config) {
  return new Promise((resolve, reject) => {
    rollup.rollup(config).then(bundle => {
      bundle.write(config).then(() => {
        report(config.dest)
        resolve()
      })
    })
  })
}

function build (name) {
  let pkgName = 'weex-js-framework'
  switch (name) {
    case 'native': pkgName = 'weex-js-framework'; break;
    case 'runtime': pkgName = 'weex-js-runtime'; break;
    case 'browser': pkgName = 'weex-web-render'; break;
    case 'vue': pkgName = 'weex-vue-render'; break;
  }

  const config = getConfig(pkgName)
  const minifyConfig = getConfig(pkgName, true)

  if (isWatch) {
    return runRollupOnWatch(config)
  }
  else {
    console.log(`\n => start to build ${name} (${pkgName})\n`)
    return new Promise((resolve, reject) => {
      runRollup(config).then(() => {
        runRollup(minifyConfig).then(() => {
          zip(minifyConfig.dest, resolve)
        })
      })
    })
  }
}

function zip (filePath, callback) {
  const read = fs.createReadStream(filePath)
  const write = fs.createWriteStream(filePath + '.gz')
  read.pipe(gzip).pipe(write).on('close', () => {
    report(filePath + '.gz')
    callback && callback()
  })
}

function now () {
  const time = Date.now() - (new Date()).getTimezoneOffset() * 60000
  return (new Date(time)).toISOString().replace('T', ' ').substring(0, 16)
}

function report (filePath) {
  const size = (fs.statSync(filePath).size / 1024).toFixed(2) + 'KB'
  const file = path.relative(process.cwd(), filePath)
  console.log(` => write ${file} (${size})`)
}
