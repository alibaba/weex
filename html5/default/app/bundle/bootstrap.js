import semver from 'semver'
import Vm from '../../vm'
import * as downgrade from '../downgrade'
import { isPlainObject } from '../../util'
import {
  isWeexComponent,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from './misc'

export function bootstrap (app, name, config, data) {
  console.debug(`[JS Framework] bootstrap for ${name}`)

  let cleanName

  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)
    // check if define by old 'define' method
    /* istanbul ignore if */
    if (!app.customComponentMap[cleanName]) {
      return new Error(`It's not a component: ${name}`)
    }
  }
  else {
    return new Error(`Wrong component name: ${name}`)
  }

  config = isPlainObject(config) ? config : {}

  if (typeof config.transformerVersion === 'string' &&
    typeof global.transformerVersion === 'string' &&
    !semver.satisfies(config.transformerVersion,
      global.transformerVersion)) {
    return new Error(`JS Bundle version: ${config.transformerVersion} ` +
      `not compatible with ${global.transformerVersion}`)
  }

  const _checkDowngrade = downgrade.check(config.downgrade)
  /* istanbul ignore if */
  if (_checkDowngrade.isDowngrade) {
    app.callTasks([{
      module: 'instanceWrap',
      method: 'error',
      args: [
        _checkDowngrade.errorType,
        _checkDowngrade.code,
        _checkDowngrade.errorMessage
      ]
    }])
    return new Error(`Downgrade[${_checkDowngrade.code}]: ${_checkDowngrade.errorMessage}`)
  }

  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}