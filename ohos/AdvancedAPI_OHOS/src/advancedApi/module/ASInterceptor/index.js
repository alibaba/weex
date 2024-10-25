export default class ASInterceptor {
  constructor () {
    this.apiLists = {}
    this.globals = []
  }

  checkApiName (apiName) {
    if (apiName === 'addInterceptor'
      || apiName === 'removeInterceptor') {
      return false
    }
    return true
  }

  invoke (apiName, args) {
    // 1. 触发全局拦截器
    this.globals.forEach(option => {
      const invoke = option.invoke
      if (typeof invoke === 'function') {
        invoke(...args)
      }
    })
    // 2. 触发api拦截器
    const apiOptions = this.apiLists[apiName] || []
    apiOptions.forEach(option => {
      const invoke = option.invoke
      if (typeof invoke === 'function') {
        invoke(...args)
      }
    })
  }

  success (apiName, args) {
    const tasks = []
    // 1. 触发全局拦截器
    this.globals.forEach(option => {
      const success = option.success
      if (typeof success === 'function') {
        tasks.push(success)
      }
    })
    // 2. 触发api拦截器
    const apiOptions = this.apiLists[apiName] || []
    apiOptions.forEach(option => {
      const success = option.success
      if (typeof success === 'function') {
        tasks.push(success)
      }
    })

    if (tasks.length) {
      const methodArgs = args && JSON.parse(JSON.stringify(args))
      tasks.forEach(task => {
        task(...methodArgs)
      })
      return methodArgs
    }
  }

  fail (apiName, args) {
    const tasks = []
    // 1. 触发全局拦截器
    this.globals.forEach(option => {
      const fail = option.fail
      if (typeof fail === 'function') {
        tasks.push(fail)
      }
    })
    // 2. 触发api拦截器
    const apiOptions = this.apiLists[apiName] || []
    apiOptions.forEach(option => {
      const fail = option.fail
      if (typeof fail === 'function') {
        tasks.push(fail)
      }
    })

    if (tasks.length) {
      const methodArgs = args && JSON.parse(JSON.stringify(args))
      tasks.forEach(task => {
        task(...methodArgs)
      })
      return methodArgs
    }
  }

  complete (apiName, args) {
    const tasks = []
    // 1. 触发全局拦截器
    this.globals.forEach(option => {
      const complete = option.complete
      if (typeof complete === 'function') {
        tasks.push(complete)
      }
    })
    // 2. 触发api拦截器
    const apiOptions = this.apiLists[apiName] || []
    apiOptions.forEach(option => {
      const complete = option.complete
      if (typeof complete === 'function') {
        tasks.push(complete)
      }
    })

    if (tasks.length) {
      const methodArgs = args && JSON.parse(JSON.stringify(args))
      tasks.forEach(task => {
        task(...methodArgs)
      })
      return methodArgs
    }
  }

  returnValue (apiName, args) {
    // 1. 触发全局拦截器
    this.globals.forEach(option => {
      const returnValue = option.returnValue
      if (typeof returnValue === 'function') {
        returnValue(args)
      }
    })
    // 2. 触发api拦截器
    const apiOptions = this.apiLists[apiName] || []
    apiOptions.forEach(option => {
      const returnValue = option.returnValue
      if (typeof returnValue === 'function') {
        returnValue(args)
      }
    })
  }
}
