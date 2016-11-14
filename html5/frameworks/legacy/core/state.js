/* eslint-disable */

import Watcher from './watcher'
import Dep from './dep'
import {
  observe,
  proxy,
  unproxy
} from './observer'
import {
  isPlainObject,
  bind
} from '../util/index'

export function initState (vm) {
  vm._watchers = []
  initData(vm)
  initComputed(vm)
  initMethods(vm)
}

export function initData (vm) {
  let data = vm._data

  if (!isPlainObject(data)) {
    data = {}
  }
  // proxy data on instance
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    proxy(vm, keys[i])
  }
  // observe data
  observe(data, vm)
}

/* istanbul ignore next */
function noop () {
}

export function initComputed (vm) {
  const computed = vm._computed
  if (computed) {
    for (let key in computed) {
      const userDef = computed[key]
      const def = {
        enumerable: true,
        configurable: true
      }
      if (typeof userDef === 'function') {
        def.get = makeComputedGetter(userDef, vm)
        def.set = noop
      } else {
        def.get = userDef.get
          ? userDef.cache !== false
            ? makeComputedGetter(userDef.get, vm)
            : bind(userDef.get, vm)
          : noop
        def.set = userDef.set
          ? bind(userDef.set, vm)
          : noop
      }
      Object.defineProperty(vm, key, def)
    }
  }
}

function makeComputedGetter (getter, owner) {
  const watcher = new Watcher(owner, getter, null, {
    lazy: true
  })
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate()
    }
    if (Dep.target) {
      watcher.depend()
    }
    return watcher.value
  }
}

export function initMethods (vm) {
  const methods = vm._methods
  if (methods) {
    for (let key in methods) {
      vm[key] = methods[key]
    }
  }
}
