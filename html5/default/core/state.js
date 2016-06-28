/* eslint-disable */

import Watcher from './watcher'
import Dep from './dep'
import {
  observe,
  proxy,
  unproxy
} from './observer'
import {
  isArray,
  isPlainObject,
  bind
} from '../util'

export function _initState () {
  const vm = this
  vm._watchers = []
  vm._initData()
  vm._initComputed()
  vm._initMethods()
}

export function _initData () {
  const vm = this
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

function noop () {
}

export function _initComputed () {
  const vm = this
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

export function _initMethods () {
  const vm = this
  const methods = vm._methods
  if (methods) {
    for (let key in methods) {
      vm[key] = bind(methods[key], vm)
    }
  }
}
