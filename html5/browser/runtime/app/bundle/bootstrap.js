import Vm from '../../../../default/vm'
import {
  requireCustomComponent
} from '../../../../default/app/register'
import {
  isPlainObject,
  isWeexComponent,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from '../../../../default/util'

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
  console.log(`transformerVersion: ${config.transformerVersion}, `
    + `available transformerVersion: ${global.transformerVersion}`)

  // 3. create a new Vm with custom component name and data
  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}
