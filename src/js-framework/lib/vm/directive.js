/**
 * @fileOverview
 * Directive Parser
 */

import {bind, extend} from '../util'

import Watcher from './watcher'
import {nativeComponentMap} from '../config'

const SETTERS = {
  attr: 'setAttr',
  style: 'setStyle',
  event: 'addEvent'
}

/**
 * apply the native component's options(specified by template.type)
 * to the template
 */
export function _applyNaitveComponentOptions(template) {
  const {type} = template
  const options = nativeComponentMap[type]

  if (typeof options === 'object') {
    extend(template, options)
  }
}

/**
 * bind all id, attr, classnames, style, events to an element
 */
export function _bindElement(el, template) {
  this._setId(template.id, el, this)
  this._setAttr(el, template.attr)
  this._setClass(el, template.classList)
  this._setStyle(el, template.style)
  this._bindEvents(el, template.events)
}

/**
 * bind all props to sub vm and bind all style, events to the root element
 * of the sub vm if it doesn't have a replaced multi-node fragment
 */
export function _bindSubVm(subVm, template, repeatItem) {
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

  mergeProps(repeatItem, props, this, subVm)
  mergeProps(template.attr, props, this, subVm)
}

export function _bindSubVmAfterInitialized(subVm, template) {
  mergeStyle(template.style, this, subVm)

  // bind events
  // todo: rebind if subVm._rootEl changed
  if (subVm._rootEl) {
    for (const key in (template.events || {})) {
      const value = template.events[key]
      this._setEvent(subVm._rootEl, key, value)
    }
  }
}

function mergeProps(target, props, vm, subVm) {
  if (!target) {
    return
  }
  for (const key in target) {
    if (!props || props[key]) {
      const value = target[key]
      if (typeof value === 'function') {
        vm._watch(value, function (v) {
          subVm[key] = v
        })
        subVm[key] = value.bind(vm)()
      }
      else {
        subVm[key] = value
      }
    }
  }
}

function mergeStyle(target, vm, subVm) {
  for (const key in target) {
    const value = target[key]
    if (typeof value === 'function') {
      vm._watch(value, function (v) {
        if (subVm._rootEl) {
          subVm._rootEl.setStyle(key, v)
        }
      })
      subVm._rootEl.setStyle(key, value.bind(vm)())
    }
    else {
      if (subVm._rootEl) {
        subVm._rootEl.setStyle(key, value)
      }
    }
  }
}

/**
 * bind id to an element
 * each id is unique in a whole vm
 */
export function _setId(id, el, vm) {
  const map = Object.create(null)

  Object.defineProperties(map, {
    vm: {
      value: vm,
      writable: false,
      configurable: false
    },
    el: {
      get: () => el || vm._rootEl,
      configurable: false
    }
  })

  if (typeof id === 'function') {
    const handler = id
    id = handler.call(this)
    if (id) {
      this._ids[id] = map
    }
    this._watch(handler, (newId) => {
      if (newId) {
        this._ids[newId] = map
      }
    })
  }
  else if (id && typeof id === 'string') {
    this._ids[id] = map
  }
}

/**
 * bind attr to an element
 */
export function _setAttr(el, attr) {
  this._bindDir(el, 'attr', attr)
}

/**
 * bind classnames to an element
 */
export function _setClass(el, classList) {

  if (typeof classList !== 'function' && !Array.isArray(classList)) {
    return
  }
  if (Array.isArray(classList) && !classList.length) {
    el.setClassStyle({})
    return
  }

  const update = (classList) => {
    const css = this._options.style
    const classStyle = {}
    const length = classList.length

    for (let i = 0; i < length; i++) {
      const style = css[classList[i]]
      if (style) {
        for (const key in style) {
          classStyle[key] = style[key]
        }
      }
    }
    el.setClassStyle(classStyle)
  }

  if (typeof classList === 'function') {
    this._watch(classList, update)
    update(classList.call(this))
  }
  else {
    update(classList)
  }
}

/**
 * bind style to an element
 */
export function _setStyle(el, style) {
  this._bindDir(el, 'style', style)
}

/**
 * add an event type and handler to an element and generate a dom update
 */
export function _setEvent(el, type, handler) {
  el.addEvent(type, bind(handler, this))
}

/**
 * add all events of an element
 */
export function _bindEvents(el, events) {
  if (!events) {
    return
  }
  const keys = Object.keys(events)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    const handlerName = events[key]
    this._setEvent(el, key, this[handlerName])
  }
}

/**
 * set a series of members as a kind of an element
 * for example: style, attr, ...
 * if the value is a function then bind the data changes
 */
export function _bindDir(el, name, data) {
  if (!data) {
    return
  }
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    const value = data[key]
    if (typeof value === 'function') {
      const update = value
      this._bindKey(el, name, key, update)
    }
    else {
      el[SETTERS[name]](key, value)
    }
  }
}

/**
 * bind data changes to a certain key to a name series in an element
 */
export function _bindKey(el, name, key, calc) {
  const methodName = SETTERS[name]
  const obj = el[name]
  const value = calc.call(this)
  el[methodName](key, calc.call(this))
  this._watch(calc, (value) => {
    function handler() {
      el[methodName](key, value)
    }
    const differ = this && this._app && this._app.differ
    if (differ) {
      differ.append('element', el.depth, el.ref, handler)
    }
    else {
      handler()
    }
  })
}

/**
 * watch a calc function and callback if the calc value changes
 */
export function _watch(calc, callback) {
  new Watcher(this, calc, function (value, oldValue) {
    /* istanbul ignore if */
    if (typeof value !== 'object' && value === oldValue) {
      return
    }
    callback(value)
  })
}
