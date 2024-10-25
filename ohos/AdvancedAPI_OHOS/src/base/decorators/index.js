export function jsMethod (desc) {
  return (target, key, descriptor) => {
    let _jsMethods
    // common 代表 方法为通用方法，所有模块共用
    if (desc && desc.common) {
      _jsMethods = target.constructor._jsBaseMethods = target.constructor._jsBaseMethods || {}
    } else {
      _jsMethods = target.constructor._jsMethods = target.constructor._jsMethods || {}
    }
    desc = desc !== undefined ? desc : {}
    const alias = desc.alias !== undefined ? desc.alias : key
    const callback = desc.callback !== undefined ? desc.callback : true
    const methodName = key
    _jsMethods[alias] = { methodName, callback }
  }
}

export function jsField (desc) {
  const PREFIX = '__FIELD__'
  return (target, key, descriptor) => {
    const _jsModuleAttrs = target.constructor._jsModuleAttrs = target.constructor._jsModuleAttrs || []
    desc = desc !== undefined ? desc : {}
    const alias = desc.alias !== undefined ? desc.alias : key
    const callback = desc.callback !== undefined ? desc.callback : true
    const getMetName = desc.getMetName
    const setMetName = desc.setMetName
    _jsModuleAttrs[PREFIX + alias] = { getMetName, setMetName, callback }
  }
}
