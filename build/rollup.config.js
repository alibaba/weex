import { rollup } from 'rollup'
import json from 'rollup-plugin-json'
import eslint from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

const env = (process.argv.indexOf('--dev') >= 0) ? '' : 'production'

const pkg = require('../package.json')
const version = pkg.subversion.framework
const date = new Date().toISOString().split('T')[0].replace(/\-/g, '')
const banner = `\
(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: ${version} Build ${date}');
var global = this, process = { env: {}}; var setTimeout = global.setTimeout;
`

export default {
  entry: './html5/render/native/index.js',
  dest: './dist/native.js',
  banner,
  format: 'umd',
  sourceMap: (env === 'production') ? false : 'inline',
  plugins: [
    json(),
    eslint({
      exclude: './package.json'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    buble()
  ]
}
