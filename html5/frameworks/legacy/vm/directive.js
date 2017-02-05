/**
 * @fileOverview
 * Directive Parser
 */

import { bind, typof } from '../util/index'
import Watcher from '../core/watcher'
import config from '../config'

const { nativeComponentMap } = config

const SETTERS = {
  attr: 'setAttr',
  style: 'setStyle',
  event: 'addEvent'
}

/**
 * apply the native component's options(specified by template.type)
 * to the template
 */
export function applyNaitveComponentOptions (template) {
  const { type } = template
  const options = nativeComponentMap[type]

  if (typeof options === 'object') {
    for (const key in options) {
      if (template[key] == null) {
        template[key] = options[key]
      }
      else if (typof(template[key]) === 'object' &&
        typof(options[key]) === 'object') {
        for (const subkey in options[key]) {
          if (template[key][subkey] == null) {
            template[key][subkey] = options[key][subkey]
          }
        }
      }
    }
  }
}

/**
 * bind all id, attr, classnames, style, events to an element
 */
export function bindElement (vm, el, template) {
  setId(vm, el, template.id, vm)
  setAttr(vm, el, template.attr)
  setClass(vm, el, template.classList)
  setStyle(vm, el, template.style)
  bindEvents(vm, el, template.events)
}

/**
 * bind all props to sub vm and bind all style, events to the root element
 * of the sub vm if it doesn't have a replaced multi-node fragment
 */
export function bindSubVm (vm, subVm, template, repeatItem) {
  subVm = subVm || {}
  template = template || {}

  const options = subVm._options || {}

  // bind props
  let props = options.props

  if (Array.isArray(props)) {
    props = props.reduce((result, value) => {
      result[value] = true
      return result
    }, {})
  }

  mergeProps(repeatItem, props, vm, subVm)
  mergeProps(template.attr, props, vm, subVm)
}

/**
 * merge class and styles from vm to sub vm.
 */
export function bindSubVmAfterInitialized (vm, subVm, template, target = {}) {
  mergeClassStyle(template.classList, vm, subVm)
  mergeStyle(template.style, vm, subVm)

  // bind subVm to the target element
  if (target.children) {
    target.children[target.children.length - 1]._vm = subVm
  }
  else {
    target._vm = subVm
  }
}

/**
 * Bind props from vm to sub vm and watch their updates.
 */
function mergeProps (target, props, vm, subVm) {
  if (!target) {
    return
  }
  for (const key in target) {
    if (!props || props[key]) {
      const value = target[key]
      if (typeof value === 'function') {
        const returnValue = watch(vm, value, function (v) {
          subVm[key] = v
        })
        subVm[key] = returnValue
      }
      else {
        subVm[key] = value
      }
    }
  }
}

/**
 * Bind style from vm to sub vm and watch their updates.
 */
function mergeStyle (target, vm, subVm) {
  for (const key in target) {
    const value = target[key]
    if (typeof value === 'function') {
      const returnValue = watch(vm, value, function (v) {
        if (subVm._rootEl) {
          subVm._rootEl.setStyle(key, v)
        }
      })
      subVm._rootEl.setStyle(key, returnValue)
    }
    else {
      if (subVm._rootEl) {
        subVm._rootEl.setStyle(key, value)
      }
    }
  }
}

/**
 * Bind class & style from vm to sub vm and watch their updates.
 */
function mergeClassStyle (target, vm, subVm) {
  const css = vm._options && vm._options.style || {}

  /* istanbul ignore if */
  if (!subVm._rootEl) {
    return
  }

  const className = '@originalRootEl'
  css[className] = subVm._rootEl.classStyle

  function addClassName (list, name) {
    if (typof(list) === 'array') {
      list.unshift(name)
    }
  }

  if (typeof target === 'function') {
    const value = watch(vm, target, v => {
      addClassName(v, className)
      setClassStyle(subVm._rootEl, css, v)
    })
    addClassName(value, className)
    setClassStyle(subVm._rootEl, css, value)
  }
  else if (target != null) {
    addClassName(target, className)
    setClassStyle(subVm._rootEl, css, target)
  }
}

/**
 * bind id to an element
 * each id is unique in a whole vm
 */
export function setId (vm, el, id, target) {
  const map = Object.create(null)

  Object.defineProperties(map, {
    vm: {
      value: target,
      writable: false,
      configurable: false
    },
    el: {
      get: () => el || target._rootEl,
      configurable: false
    }
  })

  if (typeof id === 'function') {
    const handler = id
    id = handler.call(vm)
    if (id || id === 0) {
      vm._ids[id] = map
    }
    watch(vm, handler, (newId) => {
      if (newId) {
        vm._ids[newId] = map
      }
    })
  }
  else if (id && typeof id === 'string') {
    vm._ids[id] = map
  }
}

/**
 * bind attr to an element
 */
function setAttr (vm, el, attr) {
  bindDir(vm, el, 'attr', attr)
}

function setClassStyle (el, css, classList) {
  const classStyle = {}
  const length = classList.length

  for (let i = 0; i < length; i++) {
    const style = css[classList[i]]
    if (style) {
      Object.keys(style).forEach((key) => {
        classStyle[key] = style[key]
      })
    }
  }
  el.setClassStyle(classStyle)
}

/**
 * bind classnames to an element
 */
function setClass (vm, el, classList) {
  if (typeof classList !== 'function' && !Array.isArray(classList)) {
    return
  }
  if (Array.isArray(classList) && !classList.length) {
    el.setClassStyle({})
    return
  }

  const style = vm._options && vm._options.style || {}
  if (typeof classList === 'function') {
    const value = watch(vm, classList, v => {
      setClassStyle(el, style, v)
    })
    setClassStyle(el, style, value)
  }
  else {
    setClassStyle(el, style, classList)
  }
}

/**
 * bind style to an element
 */
function setStyle (vm, el, style) {
  bindDir(vm, el, 'style', style)
}

/**
 * add an event type and handler to an element and generate a dom update
 */
function setEvent (vm, el, type, handler) {
  el.addEvent(type, bind(handler, vm))
}

/**
 * add all events of an element
 */
function bindEvents (vm, el, events) {
  if (!events) {
    return
  }
  const keys = Object.keys(events)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    let handler = events[key]
    if (typeof handler === 'string') {
      handler = vm[handler]
      /* istanbul ignore if */
      if (!handler) {
        console.warn(`[JS Framework] The event handler "${handler}" is not defined.`)
      }
    }
    setEvent(vm, el, key, handler)
  }
}

/**
 * set a series of members as a kind of an element
 * for example: style, attr, ...
 * if the value is a function then bind the data changes
 */
function bindDir (vm, el, name, data) {
  if (!data) {
    return
  }
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    const value = data[key]
    if (typeof value === 'function') {
      bindKey(vm, el, name, key, value)
    }
    else {
      el[SETTERS[name]](key, value)
    }
  }
}

/**
 * bind data changes to a certain key to a name series in an element
 */
function bindKey (vm, el, name, key, calc) {
  const methodName = SETTERS[name]
  // watch the calc, and returns a value by calc.call()
  const value = watch(vm, calc, (value) => {
    function handler () {
      el[methodName](key, value)
    }
    const differ = vm && vm._app && vm._app.differ
    if (differ) {
      differ.append('element', el.depth, el.ref, handler)
    }
    else {
      handler()
    }
  })

  el[methodName](key, value)
}

/**
 * watch a calc function and callback if the calc value changes
 */
export function watch (vm, calc, callback) {
  if (vm._static) {
    return calc.call(vm, vm)
  }
  const watcher = new Watcher(vm, calc, function (value, oldValue) {
    /* istanbul ignore if */
    if (typeof value !== 'object' && value === oldValue) {
      return
    }
    callback(value)
  })

  return watcher.value
}
