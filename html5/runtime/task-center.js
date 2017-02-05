let fallback = function () {}

// The API of TaskCenter would be re-design.
export class TaskCenter {
  constructor (id, sendTasks) {
    Object.defineProperty(this, 'instanceId', {
      enumerable: true,
      value: id
    })
    fallback = sendTasks || function () {}
  }

  send (type, options, args) {
    const { action, component, ref, module, method } = options

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
