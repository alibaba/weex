/**
 * @fileOverview
 * ViewModel template parser & data-binding process
 *
 * required:
 * index.js: Vm
 * dom-helper.js: _createElement, _createBlock
 * dom-helper.js: _attachTarget, _moveTarget, _removeTarget
 * directive.js: _bindElement, _bindSubVm, _watch
 * events.js: $on
 */

import * as _ from '../util'

/**
 * build(externalDirs)
 *   createVm()
 *   merge(externalDirs, dirs)
 *   compile(template, parentNode)
 *     if (type is content) create contentNode
 *     else if (dirs have v-for) foreach -> create context
 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
 *     else if (dirs have v-if) assert
 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
 *     else if (type is native)
 *       set(dirs): update(id/attr/style/class) onchange
 *       append(template, parentNode)
 *       foreach childNodes -> compile(childNode, template)
 *     else if (type is custom)
 *       addChildVm(vm, parentVm)
 *       build(externalDirs)
 *       foreach childNodes -> compile(childNode, template)
 */
export function _build () {
  const opt = this._options || {}
  const template = opt.template || {}

  if (opt.replace) {
    if (template.children && template.children.length === 1) {
      this._compile(template.children[0], this._parentEl)
    }
    else {
      this._compile(template.children, this._parentEl)
    }
  }
  else {
    this._compile(template, this._parentEl)
  }

  _.debug(`"ready" lifecycle in Vm(${this._type})`)
  this.$emit('hook:ready')
  this._ready = true
}

/**
 * Generate elements by child or children and append to parent elements.
 * Root element info would be merged if has. The first argument may be an array
 * if the root element with options.replace has not only one child.
 *
 * @param {object|array} target
 * @param {object}       dest
 * @param {object}       meta
 */
export function _compile (target, dest, meta) {
  const app = this._app || {}

  if (app.lastSignal === -1) {
    return
  }

  const context = this
  if (context._targetIsFragment(target)) {
    context._compileFragment(target, dest, meta)
    return
  }
  meta = meta || {}
  if (context._targetIsContent(target)) {
    _.debug('compile "content" block by', target)
    context._content = context._createBlock(dest)
    return
  }

  if (context._targetNeedCheckRepeat(target, meta)) {
    _.debug('compile "repeat" logic by', target)
    context._compileRepeat(target, dest)
    return
  }
  if (context._targetNeedCheckShown(target, meta)) {
    _.debug('compile "if" logic by', target)
    context._compileShown(target, dest, meta)
    return
  }
  const typeGetter = meta.type || target.type
  if (context._targetNeedCheckType(typeGetter, meta)) {
    context._compileType(target, dest, typeGetter, meta)
    return
  }
  const type = typeGetter
  const component = context._targetIsComposed(target, type)
  if (component) {
    _.debug('compile composed component by', target)
    context._compileCustomComponent(component, target, dest, type, meta)
    return
  }
  _.debug('compile native component by', target)
  context._compileNativeComponent(target, dest, type)
}

/**
 * Check if target is a fragment (an array).
 *
 * @param  {object}  target
 * @return {boolean}
 */
export function _targetIsFragment (target) {
  return Array.isArray(target)
}

/**
 * Check if target type is content/slot.
 *
 * @param  {object}  target
 * @return {boolean}
 */
export function _targetIsContent (target) {
  return target.type === 'content' || target.type === 'slot'
}

/**
 * Check if target need to compile by a list.
 *
 * @param  {object}  target
 * @param  {object}  meta
 * @return {boolean}
 */
export function _targetNeedCheckRepeat (target, meta) {
  return !meta.hasOwnProperty('repeat') && target.repeat
}

/**
 * Check if target need to compile by a boolean value.
 *
 * @param  {object}  target
 * @param  {object}  meta
 * @return {boolean}
 */
export function _targetNeedCheckShown (target, meta) {
  return !meta.hasOwnProperty('shown') && target.shown
}

/**
 * Check if target need to compile by a dynamic type.
 *
 * @param  {string|function} typeGetter
 * @param  {object}          meta
 * @return {boolean}
 */
export function _targetNeedCheckType (typeGetter, meta) {
  return (typeof typeGetter === 'function') && !meta.hasOwnProperty('type')
}

/**
 * Check if this kind of component is composed.
 *
 * @param  {string}  type
 * @return {boolean}
 */
export function _targetIsComposed (target, type) {
  let component
  if (this._app && this._app.customComponentMap) {
    component = this._app.customComponentMap[type]
  }
  if (this._options && this._options.components) {
    component = this._options.components[type]
  }
  if (target.component) {
    component = component || {}
  }
  return component
}

/**
 * Compile a list of targets.
 *
 * @param {object} target
 * @param {object} dest
 * @param {object} meta
 */
export function _compileFragment (target, dest, meta) {
  const fragBlock = this._createBlock(dest)
  target.forEach((child) => {
    this._compile(child, fragBlock, meta)
  })
}

/**
 * Compile a target with repeat directive.
 *
 * @param {object} target
 * @param {object} dest
 */
export function _compileRepeat (target, dest) {
  const repeat = target.repeat
  const oldStyle = typeof repeat === 'function'
  let getter = repeat.getter || repeat.expression || repeat
  if (typeof getter !== 'function') {
    getter = function () { return [] }
  }
  const key = repeat.key || '$index'
  const value = repeat.value || '$value'
  const trackBy = repeat.trackBy || target.trackBy ||
    (target.attr && target.attr.trackBy)

  const fragBlock = this._createBlock(dest)
  fragBlock.children = []
  fragBlock.data = []
  fragBlock.vms = []

  this._bindRepeat(target, fragBlock, { getter, key, value, trackBy, oldStyle })
}

/**
 * Compile a target with if directive.
 *
 * @param {object} target
 * @param {object} dest
 * @param {object} meta
 */
export function _compileShown (target, dest, meta) {
  const newMeta = { shown: true }
  const fragBlock = this._createBlock(dest)

  if (dest.element && dest.children) {
    dest.children.push(fragBlock)
  }

  if (meta.repeat) {
    newMeta.repeat = meta.repeat
  }

  this._bindShown(target, fragBlock, newMeta)
}

/**
 * Compile a target with dynamic component type.
 *
 * @param {object}   target
 * @param {object}   dest
 * @param {function} typeGetter
 */
export function _compileType (target, dest, typeGetter, meta) {
  const type = typeGetter.call(this)
  const newMeta = Object.assign({ type }, meta)
  const fragBlock = this._createBlock(dest)

  if (dest.element && dest.children) {
    dest.children.push(fragBlock)
  }

  this._watch(typeGetter, (value) => {
    const newMeta = Object.assign({ type: value }, meta)
    this._removeBlock(fragBlock, true)
    this._compile(target, fragBlock, newMeta)
  })

  this._compile(target, fragBlock, newMeta)
}

/**
 * Compile a composed component.
 *
 * @param {object} target
 * @param {object} dest
 * @param {string} type
 */
export function _compileCustomComponent (component, target, dest, type, meta) {
  const Vm = this.constructor
  const context = this
  const subVm = new Vm(type, component, context, dest, undefined, {
    'hook:init': function () {
      context._setId(target.id, null, this)
      // bind template earlier because of lifecycle issues
      this._externalBinding = {
        parent: context,
        template: target
      }
    },
    'hook:created': function () {
      context._bindSubVm(this, target, meta.repeat)
    },
    'hook:ready': function () {
      if (this._content) {
        context._compileChildren(target, this._content)
      }
    }
  })
  this._bindSubVmAfterInitialized(subVm, target)
}

/**
 * Generate element from template and attach to the dest if needed.
 * The time to attach depends on whether the mode status is node or tree.
 *
 * @param {object} template
 * @param {object} dest
 * @param {string} type
 */
export function _compileNativeComponent (template, dest, type) {
  this._applyNaitveComponentOptions(template)

  let element
  if (dest.ref === '_documentElement') {
    // if its parent is documentElement then it's a body
    _.debug('compile to create body for', type)
    element = this._createBody(type)
  }
  else {
    _.debug('compile to create element for', type)
    element = this._createElement(type)
  }

  if (!this._rootEl) {
    this._rootEl = element
    // bind event earlier because of lifecycle issues
    const binding = this._externalBinding || {}
    const target = binding.template
    const vm = binding.parent
    if (target && target.events && vm && element) {
      for (const type in target.events) {
        const handler = vm[target.events[type]]
        if (handler) {
          element.addEvent(type, _.bind(handler, vm))
        }
      }
    }
  }

  this._bindElement(element, template)

  if (template.attr && template.attr.append) { // backward, append prop in attr
    template.append = template.attr.append
  }

  if (template.append) { // give the append attribute for ios adaptation
    element.attr = element.attr || {}
    element.attr.append = template.append
  }

  const treeMode = template.append === 'tree'
  const app = this._app || {}
  if (app.lastSignal !== -1 && !treeMode) {
    _.debug('compile to append single node for', element)
    app.lastSignal = this._attachTarget(element, dest)
  }
  if (app.lastSignal !== -1) {
    this._compileChildren(template, element)
  }
  if (app.lastSignal !== -1 && treeMode) {
    _.debug('compile to append whole tree for', element)
    app.lastSignal = this._attachTarget(element, dest)
  }
}

/**
 * Set all children to a certain parent element.
 *
 * @param {object} template
 * @param {object} dest
 */
export function _compileChildren (template, dest) {
  const app = this._app || {}
  const children = template.children
  if (children && children.length) {
    children.every((child) => {
      this._compile(child, dest)
      return app.lastSignal !== -1
    })
  }
}

/**
 * Watch the list update and refresh the changes.
 *
 * @param {object} target
 * @param {object} fragBlock {vms, data, children}
 * @param {object} info      {getter, key, value, trackBy, oldStyle}
 */
export function _bindRepeat (target, fragBlock, info) {
  const vms = fragBlock.vms
  const children = fragBlock.children
  const { getter, trackBy, oldStyle } = info
  const keyName = info.key
  const valueName = info.value

  function compileItem (item, index, context) {
    let mergedData
    if (oldStyle) {
      mergedData = item
      if (typeof item === 'object') {
        mergedData[keyName] = index
        if (!mergedData.hasOwnProperty('INDEX')) {
          Object.defineProperty(mergedData, 'INDEX', {
            value: () => {
              _.warn('"INDEX" in repeat is deprecated,' +
                ' please use "$index" instead')
            }
          })
        }
      }
    }
    else {
      mergedData = {}
      mergedData[keyName] = index
      mergedData[valueName] = item
    }
    context = context._mergeContext(mergedData)
    vms.push(context)
    context._compile(target, fragBlock, { repeat: item })
  }

  const list = this._watchBlock(fragBlock, getter, 'repeat',
    (data) => {
      _.debug('the "repeat" item has changed', data)
      if (!fragBlock) {
        return
      }

      const oldChildren = children.slice()
      const oldVms = vms.slice()
      const oldData = fragBlock.data.slice()
      // 1. collect all new refs track by
      const trackMap = {}
      const reusedMap = {}
      data.forEach((item, index) => {
        const key = trackBy ? item[trackBy] : (oldStyle ? item[keyName] : index)
        /* istanbul ignore if */
        if (key == null || key === '') {
          return
        }
        trackMap[key] = item
      })

      // 2. remove unused element foreach old item
      const reusedList = []
      oldData.forEach((item, index) => {
        const key = trackBy ? item[trackBy] : (oldStyle ? item[keyName] : index)
        if (trackMap.hasOwnProperty(key)) {
          reusedMap[key] = {
            item, index, key,
            target: oldChildren[index],
            vm: oldVms[index]
          }
          reusedList.push(item)
        }
        else {
          this._removeTarget(oldChildren[index])
        }
      })

      // 3. create new element foreach new item
      children.length = 0
      vms.length = 0
      fragBlock.data = data.slice()
      fragBlock.updateMark = fragBlock.start

      data.forEach((item, index) => {
        const key = trackBy ? item[trackBy] : (oldStyle ? item[keyName] : index)
        const reused = reusedMap[key]
        if (reused) {
          if (reused.item === reusedList[0]) {
            reusedList.shift()
          }
          else {
            reusedList.$remove(reused.item)
            this._moveTarget(reused.target, fragBlock.updateMark, true)
          }
          children.push(reused.target)
          vms.push(reused.vm)
          reused.vm[keyName] = index
          fragBlock.updateMark = reused.target
        }
        else {
          compileItem(item, index, this)
        }
      })

      delete fragBlock.updateMark
    }
  )

  fragBlock.data = list.slice(0)
  list.forEach((item, index) => {
    compileItem(item, index, this)
  })
}

/**
 * Watch the display update and add/remove the element.
 *
 * @param  {object} target
 * @param  {object} fragBlock
 * @param  {object} context
 */
export function _bindShown (target, fragBlock, meta) {
  const display = this._watchBlock(fragBlock, target.shown, 'shown',
    (display) => {
      _.debug('the "if" item was changed', display)

      if (!fragBlock || !!fragBlock.display === !!display) {
        return
      }
      fragBlock.display = !!display
      if (display) {
        this._compile(target, fragBlock, meta)
      }
      else {
        this._removeBlock(fragBlock, true)
      }
    }
  )

  fragBlock.display = !!display
  if (display) {
    this._compile(target, fragBlock, meta)
  }
}

/**
 * Watch calc value changes and append certain type action to differ.
 * It is used for if or repeat data-binding generator.
 *
 * @param  {object}   fragBlock
 * @param  {function} calc
 * @param  {string}   type
 * @param  {function} handler
 * @return {any}      init value of calc
 */
export function _watchBlock (fragBlock, calc, type, handler) {
  const differ = this && this._app && this._app.differ
  const config = {}
  const depth = (fragBlock.element.depth || 0) + 1

  return this._watch(calc, (value) => {
    config.latestValue = value
    if (differ && !config.recorded) {
      differ.append(type, depth, fragBlock.blockId, () => {
        const latestValue = config.latestValue
        handler(latestValue)
        config.recorded = false
        config.latestValue = undefined
      })
    }
    config.recorded = true
  })
}

/**
 * Clone a context and merge certain data.
 *
 * @param  {object} mergedData
 * @return {object}
 */
export function _mergeContext (mergedData) {
  const context = Object.create(this)
  context._data = mergedData
  context._initData()
  context._initComputed()
  context._realParent = this
  return context
}
