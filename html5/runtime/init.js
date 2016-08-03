import frameworks from './frameworks'

const versionRegExp = /^\/\/ *(\{[^\}]*\}) *\r?\n/

const instanceMap = {}

function checkVersion (code) {
  let info
  const result = versionRegExp.exec(code)
  if (result) {
    try {
      info = JSON.parse(result[1])
    }
    catch (e) {}
  }
  return info
}

function createInstance (id, code, config, data) {
  let info = instanceMap[id]
  if (!info) {
    info = checkVersion(code) || {}
    if (!frameworks[info.framework]) {
      info.framework = 'Weex'
    }
    instanceMap[id] = info
    config = config || {}
    config.bundleVersion = info.version
    return frameworks[info.framework].createInstance(id, code, config, data)
  }
  return new Error(`invalid instance id "${id}"`)
}

const methods = {
  createInstance
}

function genInit (methodName) {
  methods[methodName] = function (...args) {
    for (const name in frameworks) {
      const framework = frameworks[name]
      if (framework && framework[methodName]) {
        framework[methodName](...args)
      }
    }
  }
}

function genInstance (methodName) {
  methods[methodName] = function (...args) {
    const id = args[0]
    const info = instanceMap[id]
    if (info && frameworks[info.framework]) {
      return frameworks[info.framework][methodName](...args)
    }
    return new Error(`invalid instance id "${id}"`)
  }
}

export default function init (config) {
  for (const name in frameworks) {
    const framework = frameworks[name]
    framework.init(config)
  }

  [
    'registerComponents',
    'registerModules',
    'registerMethods'
  ].forEach(genInit)

  ; [
    'destroyInstance',
    'refreshInstance',
    'callJS',
    'getRoot'
  ].forEach(genInstance)

  methods.receiveTasks = methods.callJS

  return methods
}
