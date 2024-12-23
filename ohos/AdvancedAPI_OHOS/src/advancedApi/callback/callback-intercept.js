import callbackManager from './index'

// promise化
export function interceptCallback (args, moduleName, needPromise = true, needCallback = true) {
  if (!needPromise
    && (args.length === 0 || !needCallback)) {
    return { args }
  }

  const first = args[0]
  const callbacks = {}
  let hasProperty = false

  if (
    typeof first === 'object'
    && Object.prototype.toString.call(first).toLowerCase() === '[object object]'
    && args.length === 1
  ) {
    for (const key in first) {
      const value = first[key]
      if (typeof value === 'function') {
        callbacks[key] = value
      } else {
        hasProperty = true
      }
    }
  } else {
    hasProperty = true
  }

  // 参数是一个方法
  if (typeof first === 'function') {
    needPromise = false
    if (!first.isConnected) {
      const cb = msg => {
        first.apply(null, msg.arguments)
      }
      cb.originFn = first
      first.cb = cb
      args[0] = cb
    } else if (first.cb) {
      args[0] = first.cb.id
    }
  }

  let promise
  const cbLength = Object.keys(callbacks).length
  if (needPromise) {
    if (cbLength <= 0) {
      class PromiseRef {
        constructor () {
          this.promise = new Promise((resolve, reject) => {
            this.reject = reject
            this.resolve = resolve
          })
        }
      }
      promise = new PromiseRef()
    }
  }
  if (cbLength > 0 || promise) {
    const cb = msg => {
      let f = callbacks[msg.method]
      advancedResult(moduleName, msg)
      const methodArgs = triggerMethodIntercept(moduleName, msg.method, msg.arguments) || msg.arguments
      if (f !== undefined) {
        f.apply(null, methodArgs)
      }
      const { ignoreComplete = false } = msg
      if (!ignoreComplete) {
        const completeArgs = triggerMethodIntercept(moduleName, 'complete', msg.arguments) || msg.arguments
        f = callbacks['complete']
        if (f !== undefined) {
          f.apply(null, completeArgs)
        }
      }
      if (promise) {
        const cbArgs = msg.arguments
        const data = cbArgs && cbArgs.length > 0 ? cbArgs[0] : undefined
        if (msg.method === 'success' || msg.method === 'callback') {
          promise.resolve(data)
        } else {
          promise.reject(data)
        }
      }
    }

    cb.__onlyPromise = cbLength <= 0

    if (hasProperty) {
      args.push(cb)
    } else {
      args = [cb]
    }
  }

  if (first && !first.isConnected || promise) {
    args = args.map(arg => {
      return normalize(arg)
    })
  }
  if (first && first.cb) {
    first.isConnected = true
  }

  return { args, promise, needPromise }
}

function normalize (v) {
  if (typeof v === 'function') {
    const id = callbackManager.add(v)
    v.id = id
    return id
  }
  return v
}

/**
   * 封装接口的返回对象
   * @return {object} { errMsg, errCode, ... }
   */
function advancedResult (moduleName, msg) {
  if (msg.method === 'success') {
    if (!msg.arguments[0] || typeof msg.arguments[0] !== 'object') {
      msg.arguments[0] = {}
    }
    const data = msg.arguments[0]
    if (data.errMsg === undefined) {
      data.errMsg = `${moduleName}:ok`
    }
    if (data.errCode === undefined) {
      data.errCode = 0
    }
  } else if (msg.method === 'fail') {
    const originArgs = msg.arguments || []
    msg.arguments = [{
      moduleName: `${moduleName}`,
      errMsg: `${moduleName}:fail:${originArgs.shift()}`,
      errCode: originArgs.shift(),
      grantStatus: originArgs.shift(),
      dialogShownResults: originArgs.shift()
    }]
  }
}

function triggerMethodIntercept (moduleName, method, args) {
  const interceptor = requireAPI('ASInterceptor')
  const intercepterMethod = interceptor[method]
  if (typeof intercepterMethod === 'function') {
    const methodArgs = intercepterMethod.call(interceptor, moduleName, args)
    return methodArgs
  }
}
