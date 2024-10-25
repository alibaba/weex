const fs = require('fs')
const path = require('path')
const gzip = require('zlib').createGzip()
const rollup = require('rollup')

const getConfig = require('./config')

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
} else {
  console.log('\nPlease specify the package you want to build. [native, runtime, browser, vue]')
}
build(process.argv[2])

function build (name) {
  const pkgName = 'API'
  console.log(`\n => start to build ${name} (${pkgName})\n`)

  if (isWatch) {
    runRollupOnWatch(name)
    return
  }

  const config = getConfig({ name })
  const minifyConfig = getConfig({ minify: true, name })

  return new Promise((resolve, reject) => {
    runRollup(config).then(() => {
      runRollup(minifyConfig).then(() => {
        if(name==='advanced'){
          replaceFile(minifyConfig.output.file,
            [
              /;import/g,
              /from"/g,
              /import{/g,
              /}from/g,
              /import"/g,
              /";function/g
            ]
            ,
            [
              ';\nimport',
              'from "',
              'import {',
              '} from',
              'import "',
              '";\nfunction'
            ]).then(()=>{
              zip(minifyConfig.output.file, resolve)
            })
        }else{
          zip(minifyConfig.output.file, resolve)
        }
      })
    })
  })
}

function runRollup (config) {
  return new Promise((resolve, reject) => {
    rollup.rollup(config).then(bundle => {
      bundle.write(config).then(() => {
        report(config.output.file)
        resolve()
      })
    })
  })
}

function runRollupOnWatch (name) {
  const config = getConfig({ name, isWatch })
  const watcher = rollup.watch(config)
  watcher.on('event', event => {
    switch (event.code) {
      case 'STARTING':
        console.log('checking rollup.watch version...')
        break
      case 'BUILD_START':
        console.log('bundling...')
        break
      case 'BUILD_END':
        break
      case 'END':
        console.info('compile jsBundle success...')
        break
      case 'ERROR':
        console.error('ERROR: ', event.error)
        break
    }
  })
}

function zip (filePath, callback) {
  const read = fs.createReadStream(filePath)
  const write = fs.createWriteStream(filePath + '.gz')
  read.pipe(gzip).pipe(write).on('close', () => {
    report(filePath + '.gz')
    callback && callback()
  })
}

function report (filePath) {
  const size = (fs.statSync(filePath).size / 1024).toFixed(2) + 'KB'
  const file = path.relative(process.cwd(), filePath)
  console.log(` => write ${file} (${size})`)
}

function replaceFile (filePath, sourceRegx, targetStr) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        console.error(err)
        reject()
        return
      }
      let str = data.toString()
      for (let i = 0; i < sourceRegx.length; i++) {
        str = str.replace(sourceRegx[i], targetStr[i])
      }
      fs.writeFile(filePath, str, function (err) {
        if (err) {
          console.error(err)
          reject()
          return
        }
        console.log('=> replaceFile success')
        resolve()
      })
    })
  })
}