let nativeModules = {}

// for testing

/**
 * for testing
 */
export function getModule (moduleName) {
  return nativeModules[moduleName]
}

/**
 * for testing
 */
export function clearModules () {
  nativeModules = {}
}

// for framework

/**
 * init modules for an app instance
 * the second param determines whether to replace an existed method
 */
export function initModules (modules, ifReplace) {
  for (const moduleName in modules) {
    // init `modules[moduleName][]`
    let methods = nativeModules[moduleName]
    if (!methods) {
      methods = {}
      nativeModules[moduleName] = methods
    }

    // push each non-existed new method
    modules[moduleName].forEach(function (method) {
      if (typeof method === 'string') {
        method = {
          name: method
        }
      }

      if (!methods[method.name] || ifReplace) {
        methods[method.name] = method
      }
    })
  }
}

/**
 * init app methods
 */
export function initMethods (Vm, apis) {
  const p = Vm.prototype

  for (const apiName in apis) {
    if (!p.hasOwnProperty(apiName)) {
      p[apiName] = apis[apiName]
    }
  }
}

/**
 * get a module of methods for an app instance
 */
export function requireModule (app, name) {
  const methods = nativeModules[name]
  const target = {}
  for (const methodName in methods) {
    Object.defineProperty(target, methodName, {
      configurable: true,
      enumerable: true,
      get: function moduleGetter () {
        return (...args) => app.callTasks({
          module: name,
          method: methodName,
          args: args
        })
      },
      set: function moduleSetter (value) {
        if (typeof value === 'function') {
          return app.callTasks({
            module: name,
            method: methodName,
            args: [value]
          })
        }
      }
    })
  }
  return target
}

/**
 * get a custom component options
 */
export function requireCustomComponent (app, name) {
  const { customComponentMap } = app
  return customComponentMap[name]
}

/**
 * register a custom component options
 */
export function registerCustomComponent (app, name, def) {
  const { customComponentMap } = app

  if (customComponentMap[name]) {
    console.error(`[JS Framework] define a component(${name}) that already exists`)
    return
  }

  customComponentMap[name] = def
}
