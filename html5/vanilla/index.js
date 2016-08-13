const config = {}

const instanceMap = {}

export function init (cfg) {
  config.Document = cfg.Document
  config.Element = cfg.Element
  config.Comment = cfg.Comment
  config.sendTasks = cfg.sendTasks
}

export function registerComponents (components) {}

export function registerModules (modules) {}

export function registerMethods (apis) {}

export function prepareInstance (id, options, data) {}

export function createInstance (id, code, options, data) {
  const document = new config.Document(id, options.bundleUrl)
  const callbacks = {};
  let lastCallbackId = 0;
  document.addCallback = func => {
    lastCallbackId++
    callbacks[lastCallbackId] = func
    return lastCallbackId
  }
  document.handleCallback = (funcId, data, ifLast) => {
    const callback = callbacks[funcId]
    if (ifLast) {
      delete callbacks[funcId]
    }
    return callback(data)
  }
  instanceMap[id] = document
  const result = new Function(
    'Document',
    'Element',
    'Comment',
    'sendTasks',
    'id',
    'options',
    'data',
    'document',
    code
  )
  return result(
    config.Document,
    config.Element,
    config.Comment,
    config.sendTasks,
    id,
    options,
    data,
    document
  )
}

export function refreshInstance (id, data) {}

export function destroyInstance (id) {
  delete instanceMap[id];
}

export function getRoot (id) {
  return instanceMap[id].body.toJSON();
}

export function receiveTasks (id, tasks) {
  const jsHandlers = {
    fireEvent: (id, ref, type, data, domChanges) => {
      const document = instanceMap[id]
      const el = document.getRef(ref)
      return document.fireEvent(el, type, data, domChanges)
    },

    callback: (id, funcId, data, ifLast) => {
      const document = instanceMap[id]
      return document.handleCallback(funcId, data, ifLast)
    }
  }

  const document = instanceMap[id]
  if (document && Array.isArray(tasks)) {
    const results = []
    tasks.forEach((task) => {
      const handler = jsHandlers[task.method]
      const args = [...task.args]
      if (typeof handler === 'function') {
        args.unshift(id)
        results.push(handler(...args))
      }
    })
    return results
  }
}
