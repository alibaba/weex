let nativeModules = {}

function assignModules (modules, ifReplace) {
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

function assignApis (Ctor, apis) {
  const p = Ctor.prototype

  for (const apiName in apis) {
    if (!p.hasOwnProperty(apiName)) {
      p[apiName] = apis[apiName]
    }
  }
}

export function clearModules () {
  nativeModules = {}
}

export function getModule (moduleName) {
  return nativeModules[moduleName]
}

/**
 * @context a instance of AppInstance
 */
export function requireModule (moduleName) {
  const methods = nativeModules[moduleName]
  const target = {}

  for (const methodName in methods) {
    target[methodName] = (...args) => this.callTasks({
      module: moduleName,
      method: methodName,
      args: args
    })
  }

  return target
}

/**
 * @context Vm
 */
export function registerModules (modules, ifReplace) {
  assignModules(modules, ifReplace)
}

/**
 * @context Vm
 */
export function registerMethods (apis) {
  assignApis(this, apis)
}

/**
 * @context a instance of AppInstance
 */
export function requireComponent (name) {
  const { customComponentMap } = this
  return customComponentMap[name]
}

/**
 * @context a instance of AppInstance
 */
export function registerComponent (name, def) {
  const { customComponentMap } = this

  if (customComponentMap[name]) {
    console.error(`[JS Framework] define a component(${name}) that already exists`)
    return
  }

  customComponentMap[name] = def
}
