const WEEX_COMPONENT_REG = /^@weex-component\//
const WEEX_MODULE_REG = /^@weex-module\//
const NORMAL_MODULE_REG = /^\.{1,2}\//
const JS_SURFIX_REG = /\.js$/

export const isWeexComponent = name => !!name.match(WEEX_COMPONENT_REG)
export const isWeexModule = name => !!name.match(WEEX_MODULE_REG)
export const isNormalModule = name => !!name.match(NORMAL_MODULE_REG)
export const isNpmModule = name => !isWeexComponent(name) &&
                              !isWeexModule(name) &&
                              !isNormalModule(name)

export function removeWeexPrefix (str) {
  return str.replace(WEEX_COMPONENT_REG, '')
          .replace(WEEX_MODULE_REG, '')
}

export function removeJSSurfix (str) {
  return str.replace(JS_SURFIX_REG, '')
}
