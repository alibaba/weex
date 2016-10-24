import { rollup } from 'rollup'
import eslint from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

export default {
  moduleName: 'weexRuntime',
  entry: './html5/runtime/index.js',
  dest: './dist/runtime.js',
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    eslint(),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    buble()
  ]
}
