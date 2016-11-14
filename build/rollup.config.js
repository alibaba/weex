import { rollup } from 'rollup'
import json from 'rollup-plugin-json'
import eslint from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

const pkg = require('../package.json')
const version = pkg.subversion.framework
const date = new Date().toISOString().split('T')[0].replace(/\-/g, '')
const banner = `\
(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: ${version} Build ${date}');
var global = this, process = { env: {}};var setTimeout = global.setTimeout;
`

export default {
  entry: './html5/render/native/index.js',
  dest: './dist/native.js',
  banner,
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    json(),
    eslint({
      exclude: './package.json'
    }),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    buble()
  ]
}
