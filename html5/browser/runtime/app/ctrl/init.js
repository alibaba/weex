/**
 * @fileOverview
 * instance controls from native
 *
 * - init bundle
 * - fire event
 * - callback
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */

import { bind } from '../../../utils'

import {
  define,
  bootstrap,
  register
} from '../bundle'

export function init (code, data) {
  console.debug('[JS Framework] Intialize an instance with:\n', data)

  let result
  // @see: lib/app/bundle.js
  const bundleDefine = bind(define, this)
  const bundleBootstrap = (name, config, _data) => {
    result = bootstrap(this, name, config, _data || data)
    this.updateActions()
    this.doc.listener.createFinish()
    console.debug(`[JS Framework] After intialized an instance(${this.id})`)
  }

  // backward(register/render)
  const bundleRegister = bind(register, this)
  const bundleRender = (name, _data) => {
    result = bootstrap(this, name, {}, _data)
  }

  const bundleRequire = name => _data => {
    result = bootstrap(this, name, {}, _data)
  }

  const bundleDocument = this.doc

  let functionBody
  /* istanbul ignore if */
  if (typeof code === 'function') {
    // `function () {...}` -> `{...}`
    // not very strict
    functionBody = code.toString().substr(12)
  }
  else if (code) {
    functionBody = code.toString()
  }

  const { WXEnvironment } = global

  if (WXEnvironment) {
    const fn = new Function(
      'define',
      'require',
      'document',
      'bootstrap',
      'register',
      'render',
      '__weex_define__', // alias for define
      '__weex_bootstrap__', // alias for bootstrap
      functionBody
    )

    fn(
      bundleDefine,
      bundleRequire,
      bundleDocument,
      bundleBootstrap,
      bundleRegister,
      bundleRender,
      bundleDefine,
      bundleBootstrap)
  }

  return result
}
