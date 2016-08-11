import { bind } from '../../util'

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
  if (WXEnvironment && WXEnvironment.platform !== 'Web') {
    const timer = this.requireModule('timer')
    const timerAPIs = {
      setTimeout: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setTimeout(handler, args[1])
        return this.uid.toString()
      },
      setInterval: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setInterval(handler, args[1])
        return this.uid.toString()
      },
      clearTimeout: (n) => {
        timer.clearTimeout(n)
      },
      clearInterval: (n) => {
        timer.clearInterval(n)
      }
    }

    const fn = new Function(
      'define',
      'require',
      'document',
      'bootstrap',
      'register',
      'render',
      '__weex_define__', // alias for define
      '__weex_bootstrap__', // alias for bootstrap
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
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
      bundleBootstrap,
      timerAPIs.setTimeout,
      timerAPIs.setInterval,
      timerAPIs.clearTimeout,
      timerAPIs.clearInterval)
  }
  else {
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
