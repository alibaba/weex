/**
 * @fileOverview The api for invoking with "$" prefix
 */

/**
 * @deprecated use $vm instead
 * find the vm by id
 * Note: there is only one id in whole component
 * @param  {string} id
 * @return {Vm}
 */
export function $ (id) {
  console.warn('[JS Framework] Vm#$ is deprecated, please use Vm#$vm instead')
  const info = this._ids[id]
  if (info) {
    return info.vm
  }
}

/**
 * find the element by id
 * Note: there is only one id in whole component
 * @param  {string} id
 * @return {Element}
 */
export function $el (id) {
  const info = this._ids[id]
  if (info) {
    return info.el
  }
}

/**
 * find the vm of the custom component by id
 * Note: there is only one id in whole component
 * @param  {string} id
 * @return {Vm}
 */
export function $vm (id) {
  const info = this._ids[id]
  if (info) {
    return info.vm
  }
}

/**
 * Fire when differ rendering finished
 *
 * @param  {Function} fn
 */
export function $renderThen (fn) {
  const app = this._app
  const differ = app.differ
  return differ.then(() => {
    fn()
  })
}

/**
 * scroll an element specified by id into view,
 * moreover specify a number of offset optionally
 * @param  {string} id
 * @param  {number} offset
 */
export function $scrollTo (id, offset) {
  console.warn('[JS Framework] Vm#$scrollTo is deprecated, ' +
          'please use "require(\'@weex-module/dom\')' +
          '.scrollTo(el, options)" instead')
  const el = this.$el(id)
  if (el) {
    const dom = this._app.requireModule('dom')
    dom.scrollToElement(el.ref, { offset: offset })
  }
}

/**
 * perform transition animation on an element specified by id
 * @param  {string}   id
 * @param  {object}   options
 * @param  {object}   options.styles
 * @param  {object}   options.duration(ms)
 * @param  {object}   [options.timingFunction]
 * @param  {object}   [options.delay=0(ms)]
 * @param  {Function} callback
 */
export function $transition (id, options, callback) {
  const el = this.$el(id)
  if (el && options && options.styles) {
    const animation = this._app.requireModule('animation')
    animation.transition(el.ref, options, (...args) => {
      this._setStyle(el, options.styles)
      callback && callback(...args)
    })
  }
}

/**
 * get some config
 * @return {object} some config for app instance
 * @property {string} bundleUrl
 * @property {boolean} debug
 * @property {object} env
 * @property {string} env.weexVersion(ex. 1.0.0)
 * @property {string} env.appName(ex. TB/TM)
 * @property {string} env.appVersion(ex. 5.0.0)
 * @property {string} env.platform(ex. iOS/Android)
 * @property {string} env.osVersion(ex. 7.0.0)
 * @property {string} env.deviceModel **native only**
 * @property {number} env.[deviceWidth=750]
 * @property {number} env.deviceHeight
 */
export function $getConfig (callback) {
  const config = this._app.options
  if (typeof callback === 'function') {
    console.warn('[JS Framework] the callback of Vm#$getConfig(callback) is deprecated, ' +
      'this api now can directly RETURN config info.')
    callback(config)
  }
  return config
}

/**
 * @deprecated
 * request network via http protocol
 * @param  {object}   params
 * @param  {Function} callback
 */
export function $sendHttp (params, callback) {
  console.warn('[JS Framework] Vm#$sendHttp is deprecated, ' +
          'please use "require(\'@weex-module/stream\')' +
          '.sendHttp(params, callback)" instead')
  const stream = this._app.requireModule('stream')
  stream.sendHttp(params, callback)
}

/**
 * @deprecated
 * open a url
 * @param  {string} url
 */
export function $openURL (url) {
  console.warn('[JS Framework] Vm#$openURL is deprecated, ' +
          'please use "require(\'@weex-module/event\')' +
          '.openURL(url)" instead')
  const event = this._app.requireModule('event')
  event.openURL(url)
}

/**
 * @deprecated
 * set a title for page
 * @param  {string} title
 */
export function $setTitle (title) {
  console.warn('[JS Framework] Vm#$setTitle is deprecated, ' +
          'please use "require(\'@weex-module/pageInfo\')' +
          '.setTitle(title)" instead')
  const pageInfo = this._app.requireModule('pageInfo')
  pageInfo.setTitle(title)
}

/**
 * @deprecated use "require('@weex-module/moduleName') instead"
 * invoke a native method by specifing the name of module and method
 * @param  {string} moduleName
 * @param  {string} methodName
 * @param  {...*} the rest arguments
 */
export function $call (moduleName, methodName, ...args) {
  console.warn('[JS Framework] Vm#$call is deprecated, ' +
    'please use "require(\'@weex-module/moduleName\')" instead')
  const module = this._app.requireModule(moduleName)
  if (module && module[methodName]) {
    module[methodName](...args)
  }
}
