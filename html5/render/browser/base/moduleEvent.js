
/**
 * save the original listener for 'addEventListener'.
 * this is the dipaching listener which is waiting for feed.
 * map structure: moduleName -> eventName -> [handlers].
 */
const handlerMap = {}

window.addEventListener('moduleevent', event => {
  const dt = event.detail || {}
  const module = dt.module
  const type = dt.type
  try {
    handlerMap[module][type].forEach(handler => handler(dt))
  }
  catch (e) {
    console.warn(`[h5-render] no such event ${type} for module ${module}.`)
  }
})

export function addEventListener (module, evt, callbackId, options) {
  const once = options && !!options.once
  let moduleMap = handlerMap[module]
  if (!moduleMap) {
    moduleMap = handlerMap[module] = {}
  }
  let handlers = moduleMap[evt]
  if (!handlers) {
    handlers = moduleMap[evt] = []
  }
  handlers.push((data) => this.sender.performCallback(callbackId, data, !once))
}

export function removeAllEventListeners (module, evt) {
  try {
    delete handlerMap[module][evt]
  }
  catch (e) {
    // do nothing.
  }
}
