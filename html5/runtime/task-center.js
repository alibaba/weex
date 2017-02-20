import CallbackManager from './callback-manager'
import Element from './vdom/element'

let fallback = function () {}

// The API of TaskCenter would be re-design.
export class TaskCenter {
  constructor (id, sendTasks) {
    Object.defineProperty(this, 'instanceId', {
      enumerable: true,
      value: id
    })
    Object.defineProperty(this, 'callbackManager', {
      enumerable: true,
      value: new CallbackManager()
    })
    fallback = sendTasks || function () {}
  }

  callback (callbackId, data, ifKeepAlive) {
    return this.callbackManager.consume(callbackId, data, ifKeepAlive)
  }

  destroyCallback () {
    return this.callbackManager.close()
  }

  typof (v) {
    const s = Object.prototype.toString.call(v)
    return s.substring(8, s.length - 1).toLowerCase()
  }

  /**
   * Normalize a value. Specially, if the value is a function, then generate a function id
   * and save it to `CallbackManager`, at last return the function id.
   * @param  {any}        v
   * @param  {object}     app
   * @return {primitive}
   */
  normalize (v) {
    const type = this.typof(v)

    switch (type) {
      case 'undefined':
      case 'null':
        return ''
      case 'regexp':
        return v.toString()
      case 'date':
        return v.toISOString()
      case 'number':
      case 'string':
      case 'boolean':
      case 'array':
      case 'object':
        if (v instanceof Element) {
          return v.ref
        }
        return v
      case 'function':
        return this.callbackManager.add(v).toString()
      /* istanbul ignore next */
      default:
        return JSON.stringify(v)
    }
  }

  send (type, options, args) {
    const { action, component, ref, module, method } = options

    args = args.map(arg => this.normalize(arg))

    switch (type) {
      case 'dom':
        return this[action](this.instanceId, args)
      case 'component':
        return this.componentHandler(this.instanceId, ref, method, args, { component })
      default:
        return this.moduleHandler(this.instanceId, module, method, args, {})
    }
  }

  callDOM (action, args) {
    return this[action](this.instanceId, args)
  }

  callComponent (ref, method, args) {
    return this.componentHandler(this.instanceId, ref, method, args, {})
  }

  callModule (module, method, args) {
    return this.moduleHandler(this.instanceId, module, method, args, {})
  }
}

export function init () {
  const DOM_METHODS = {
    createFinish: global.callCreateFinish,
    updateFinish: global.callUpdateFinish,
    refreshFinish: global.callRefreshFinish,

    createBody: global.callCreateBody,

    addElement: global.callAddElement,
    removeElement: global.callRemoveElement,
    moveElement: global.callMoveElement,
    updateAttrs: global.callUpdateAttrs,
    updateStyle: global.callUpdateStyle,

    addEvent: global.callAddEvent,
    removeEvent: global.callRemoveEvent
  }
  const proto = TaskCenter.prototype

  for (const name in DOM_METHODS) {
    const method = DOM_METHODS[name]
    proto[name] = method ?
      (id, args) => method(id, ...args) :
      (id, args) => fallback(id, [{ module: 'dom', method: name, args }], '-1')
  }

  proto.componentHandler = global.callNativeComponent ||
    ((id, ref, method, args, options) =>
      fallback(id, [{ component: options.component, ref, method, args }]))

  proto.moduleHandler = global.callNativeModule ||
    ((id, module, method, args) =>
      fallback(id, [{ module, method, args }]))
}
