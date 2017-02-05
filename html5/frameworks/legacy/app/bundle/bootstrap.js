import semver from 'semver'
import Vm from '../../vm/index'
import * as downgrade from '../downgrade'
import { setViewport } from '../viewport'
import {
  requireCustomComponent
} from '../register'
import {
  isPlainObject,
  isWeexComponent,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from '../../util/index'

/**
 * bootstrap app from a certain custom component with config & data
 */
export function bootstrap (app, name, config, data) {
  console.debug(`[JS Framework] bootstrap for ${name}`)

  // 1. validate custom component name first
  let cleanName
  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)
    // check if define by old 'define' method
    /* istanbul ignore if */
    if (!requireCustomComponent(app, cleanName)) {
      return new Error(`It's not a component: ${name}`)
    }
  }
  else {
    return new Error(`Wrong component name: ${name}`)
  }

  // 2. validate configuration
  config = isPlainObject(config) ? config : {}
  // 2.1 transformer version check
  if (typeof config.transformerVersion === 'string' &&
    typeof global.transformerVersion === 'string' &&
    !semver.satisfies(config.transformerVersion,
      global.transformerVersion)) {
    return new Error(`JS Bundle version: ${config.transformerVersion} ` +
      `not compatible with ${global.transformerVersion}`)
  }
  // 2.2 downgrade version check
  const downgradeResult = downgrade.check(config.downgrade)
  /* istanbul ignore if */
  if (downgradeResult.isDowngrade) {
    app.callTasks([{
      module: 'instanceWrap',
      method: 'error',
      args: [
        downgradeResult.errorType,
        downgradeResult.code,
        downgradeResult.errorMessage
      ]
    }])
    return new Error(`Downgrade[${downgradeResult.code}]: ${downgradeResult.errorMessage}`)
  }

  // set viewport
  if (config.viewport) {
    setViewport(app, config.viewport)
  }

  // 3. create a new Vm with custom component name and data
  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}
