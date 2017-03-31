import { subversion } from '../../../package.json'
import runtime from '../../runtime'
import frameworks from '../../frameworks/index'
import services from '../../services/index'

const { init, config } = runtime
config.frameworks = frameworks
const { native, transformer } = subversion

for (const serviceName in services) {
  runtime.service.register(serviceName, services[serviceName])
}

runtime.freezePrototype()
runtime.setNativeConsole()

// register framework meta info
global.frameworkVersion = native
global.transformerVersion = transformer

// init frameworks
const globalMethods = init(config)

// set global methods
for (const methodName in globalMethods) {
  global[methodName] = (...args) => {
    const ret = globalMethods[methodName](...args)
    if (ret instanceof Error) {
      console.error(ret.toString())
    }
    return ret
  }
}
