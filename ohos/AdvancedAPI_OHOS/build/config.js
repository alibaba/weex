const { uglify } = require('rollup-plugin-uglify')
const bable = require('rollup-plugin-babel')
const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

function getConfig ({ isWatch = false, minify = false, name }) {
  let packageName = ''
  switch (name) {
    case 'advanced':
      packageName = 'advanced-api'
      break
    default:
      packageName = 'advanced-api'
  }
  const frameworkBanner = 'if(typeof(global)===\'undefined\'){var global = globalThis}'
  const frameworkfooter = ''
  const configs = {
    'advanced-api': {
      input: absolute('./src/advancedApi/index.js'),
      output: {
        name: 'ADVANCEDAPI',
        file: absolute('dist/advancedapi.js'),
        format: 'es',
        banner: frameworkBanner,
        footer: frameworkfooter || ''
      },
      plugins: []
    }
  }

  const opt = configs[packageName]
  const config = {
    input: opt.input,
    output: {
      name: opt.output.name,
      file: minify ? opt.output.file.replace(/\.js$/, '.min.js') : opt.output.file,
      format: opt.output.format,
      banner: opt.output.banner || '',
      footer: opt.output.footer || ''
    },
    plugins: [
      bable({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      resolve()
    ].concat(opt.plugins || [])
  }

  if (minify) {
    config.plugins.push(uglify({
      output: {
        beautify: name!=='advanced'
      }
    }))
  } else {
    config.output.sourcemap = 'inline'
  }
  return config
}

// get the absolute path
function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

module.exports = getConfig
