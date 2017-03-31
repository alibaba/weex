export function setViewport (app, configs = {}) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[JS Framework] Set viewport (width: ${configs.width}) for app#${app.id}.`)
    validateViewport(configs)
  }

  // Send viewport configs to native
  if (app && app.callTasks) {
    return app.callTasks([{
      module: 'meta',
      method: 'setViewport',
      args: [configs]
    }])
  }

  /* istanbul ignore next */
  else if (process.env.NODE_ENV === 'development') {
    console.warn(`[JS Framework] Can't find "callTasks" method on current app.`)
  }
}

/**
 * Validate the viewport config.
 * @param {Object} configs
 */
export function validateViewport (configs = {}) {
  const { width } = configs
  if (width) {
    if (typeof width !== 'number' && width !== 'device-width') {
      console.warn(`[JS Framework] Not support to use ${width} as viewport width.`)
      return false
    }
    return true
  }
  console.warn('[JS Framework] the viewport config should contain the "width" property.')
  return false
}
