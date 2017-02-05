/**
 * @fileOverview
 * ViewModel template parser & data-binding process
 */

import {
  extend,
  isObject,
  bind
} from '../util/index'
import {
  initData,
  initComputed
} from '../core/state'
import {
  bindElement,
  setId,
  bindSubVm,
  bindSubVmAfterInitialized,
  applyNaitveComponentOptions,
  watch
} from './directive'
import {
  createBlock,
  createBody,
  createElement,
  attachTarget,
  moveTarget,
  removeTarget
} from './dom-helper'

/**
 * build()
 *   compile(template, parentNode)
 *     if (type is content) create contentNode
 *     else if (dirs have v-for) foreach -> create context
 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
 *     else if (dirs have v-if) assert
 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
 *     else if (type is dynamic)
 *       -> compile(templateWithoutDynamicType, parentNode): watch(type) onchange
 *     else if (type is custom)
 *       addChildVm(vm, parentVm)
 *       build(externalDirs)
 *       foreach childNodes -> compile(childNode, template)
 *     else if (type is native)
 *       set(dirs): update(id/attr/style/class) onchange
 *       append(template, parentNode)
 *       foreach childNodes -> compile(childNode, template)
 */
export function build (vm) {
  const opt = vm._options || {}
  const template = opt.template || {}

  if (opt.replace) {
    if (template.children && template.children.length === 1) {
      compile(vm, template.children[0], vm._parentEl)
    }
    else {
      compile(vm, template.children, vm._parentEl)
    }
  }
  else {
    compile(vm, template, vm._parentEl)
  }

  console.debug(`[JS Framework] "ready" lifecycle in Vm(${vm._type})`)
  vm.$emit('hook:ready')
  vm._ready = true
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
function compile (vm, target, dest, meta) {
  const app = vm._app || {}

  if (app.lastSignal === -1) {
    return
  }

  if (target.attr && target.attr.hasOwnProperty('static')) {
    vm._static = true
  }

  if (targetIsFragment(target)) {
    compileFragment(vm, target, dest, meta)
    return
  }
  meta = meta || {}
  if (targetIsContent(target)) {
    console.debug('[JS Framework] compile "content" block by', target)
    vm._content = createBlock(vm, dest)
    return
  }

  if (targetNeedCheckRepeat(target, meta)) {
    console.debug('[JS Framework] compile "repeat" logic by', target)
    if (dest.type === 'document') {
      console.warn('[JS Framework] The root element does\'t support `repeat` directive!')
    }
    else {
      compileRepeat(vm, target, dest)
    }
    return
  }
  if (targetNeedCheckShown(target, meta)) {
    console.debug('[JS Framework] compile "if" logic by', target)
    if (dest.type === 'document') {
      console.warn('[JS Framework] The root element does\'t support `if` directive!')
    }
    else {
      compileShown(vm, target, dest, meta)
    }
    return
  }
  const typeGetter = meta.type || target.type
  if (targetNeedCheckType(typeGetter, meta)) {
    compileType(vm, target, dest, typeGetter, meta)
    return
  }
  const type = typeGetter
  const component = targetIsComposed(vm, target, type)
  if (component) {
    console.debug('[JS Framework] compile composed component by', target)
    compileCustomComponent(vm, component, target, dest, type, meta)
    return
  }
  console.debug('[JS Framework] compile native component by', target)
  compileNativeComponent(vm, target, dest, type)
}

/**
 * Check if target is a fragment (an array).
 *
 * @param  {object}  target
 * @return {boolean}
 */
function targetIsFragment (target) {
  return Array.isArray(target)
}

/**
 * Check if target type is content/slot.
 *
 * @param  {object}  target
 * @return {boolean}
 */
function targetIsContent (target) {
  return target.type === 'content' || target.type === 'slot'
}

/**
 * Check if target need to compile by a list.
 *
 * @param  {object}  target
 * @param  {object}  meta
 * @return {boolean}
 */
function targetNeedCheckRepeat (target, meta) {
  return !meta.hasOwnProperty('repeat') && target.repeat
}

/**
 * Check if target need to compile by a boolean value.
 *
 * @param  {object}  target
 * @param  {object}  meta
 * @return {boolean}
 */
function targetNeedCheckShown (target, meta) {
  return !meta.hasOwnProperty('shown') && target.shown
}

/**
 * Check if target need to compile by a dynamic type.
 *
 * @param  {string|function} typeGetter
 * @param  {object}          meta
 * @return {boolean}
 */
function targetNeedCheckType (typeGetter, meta) {
  return (typeof typeGetter === 'function') && !meta.hasOwnProperty('type')
}

/**
 * Check if this kind of component is composed.
 *
 * @param  {string}  type
 * @return {boolean}
 */
function targetIsComposed (vm, target, type) {
  let component
  if (vm._app && vm._app.customComponentMap) {
    component = vm._app.customComponentMap[type]
  }
  if (vm._options && vm._options.components) {
    component = vm._options.components[type]
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
function compileFragment (vm, target, dest, meta) {
  const fragBlock = createBlock(vm, dest)
  target.forEach((child) => {
    compile(vm, child, fragBlock, meta)
  })
}

/**
 * Compile a target with repeat directive.
 *
 * @param {object} target
 * @param {object} dest
 */
function compileRepeat (vm, target, dest) {
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

  const fragBlock = createBlock(vm, dest)
  fragBlock.children = []
  fragBlock.data = []
  fragBlock.vms = []

  bindRepeat(vm, target, fragBlock, { getter, key, value, trackBy, oldStyle })
}

/**
 * Compile a target with if directive.
 *
 * @param {object} target
 * @param {object} dest
 * @param {object} meta
 */
function compileShown (vm, target, dest, meta) {
  const newMeta = { shown: true }
  const fragBlock = createBlock(vm, dest)

  if (dest.element && dest.children) {
    dest.children.push(fragBlock)
  }

  if (meta.repeat) {
    newMeta.repeat = meta.repeat
  }

  bindShown(vm, target, fragBlock, newMeta)
}

/**
 * Compile a target with dynamic component type.
 *
 * @param {object}   target
 * @param {object}   dest
 * @param {function} typeGetter
 */
function compileType (vm, target, dest, typeGetter, meta) {
  const type = typeGetter.call(vm)
  const newMeta = extend({ type }, meta)
  const fragBlock = createBlock(vm, dest)

  if (dest.element && dest.children) {
    dest.children.push(fragBlock)
  }

  watch(vm, typeGetter, (value) => {
    const newMeta = extend({ type: value }, meta)
    removeTarget(vm, fragBlock, true)
    compile(vm, target, fragBlock, newMeta)
  })

  compile(vm, target, fragBlock, newMeta)
}

/**
 * Compile a composed component.
 *
 * @param {object} target
 * @param {object} dest
 * @param {string} type
 */
function compileCustomComponent (vm, component, target, dest, type, meta) {
  const Ctor = vm.constructor
  const subVm = new Ctor(type, component, vm, dest, undefined, {
    'hook:init': function () {
      if (vm._static) {
        this._static = vm._static
      }
      setId(vm, null, target.id, this)
      // bind template earlier because of lifecycle issues
      this._externalBinding = {
        parent: vm,
        template: target
      }
    },
    'hook:created': function () {
      bindSubVm(vm, this, target, meta.repeat)
    },
    'hook:ready': function () {
      if (this._content) {
        compileChildren(vm, target, this._content)
      }
    }
  })
  bindSubVmAfterInitialized(vm, subVm, target, dest)
}

/**
 * Generate element from template and attach to the dest if needed.
 * The time to attach depends on whether the mode status is node or tree.
 *
 * @param {object} template
 * @param {object} dest
 * @param {string} type
 */
function compileNativeComponent (vm, template, dest, type) {
  applyNaitveComponentOptions(template)

  let element
  if (dest.ref === '_documentElement') {
    // if its parent is documentElement then it's a body
    console.debug(`[JS Framework] compile to create body for ${type}`)
    element = createBody(vm, type)
  }
  else {
    console.debug(`[JS Framework] compile to create element for ${type}`)
    element = createElement(vm, type)
  }

  if (!vm._rootEl) {
    vm._rootEl = element
    // bind event earlier because of lifecycle issues
    const binding = vm._externalBinding || {}
    const target = binding.template
    const parentVm = binding.parent
    if (target && target.events && parentVm && element) {
      for (const type in target.events) {
        const handler = parentVm[target.events[type]]
        if (handler) {
          element.addEvent(type, bind(handler, parentVm))
        }
      }
    }
  }

  bindElement(vm, element, template)

  if (template.attr && template.attr.append) { // backward, append prop in attr
    template.append = template.attr.append
  }

  if (template.append) { // give the append attribute for ios adaptation
    element.attr = element.attr || {}
    element.attr.append = template.append
  }

  const treeMode = template.append === 'tree'
  const app = vm._app || {}
  if (app.lastSignal !== -1 && !treeMode) {
    console.debug('[JS Framework] compile to append single node for', element)
    app.lastSignal = attachTarget(vm, element, dest)
  }
  if (app.lastSignal !== -1) {
    compileChildren(vm, template, element)
  }
  if (app.lastSignal !== -1 && treeMode) {
    console.debug('[JS Framework] compile to append whole tree for', element)
    app.lastSignal = attachTarget(vm, element, dest)
  }
}

/**
 * Set all children to a certain parent element.
 *
 * @param {object} template
 * @param {object} dest
 */
function compileChildren (vm, template, dest) {
  const app = vm._app || {}
  const children = template.children
  if (children && children.length) {
    children.every((child) => {
      compile(vm, child, dest)
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
function bindRepeat (vm, target, fragBlock, info) {
  const vms = fragBlock.vms
  const children = fragBlock.children
  const { getter, trackBy, oldStyle } = info
  const keyName = info.key
  const valueName = info.value

  function compileItem (item, index, context) {
    let mergedData
    if (oldStyle) {
      mergedData = item
      if (isObject(item)) {
        mergedData[keyName] = index
        if (!mergedData.hasOwnProperty('INDEX')) {
          Object.defineProperty(mergedData, 'INDEX', {
            value: () => {
              console.warn('[JS Framework] "INDEX" in repeat is deprecated, ' +
                'please use "$index" instead')
            }
          })
        }
      }
      else {
        console.warn('[JS Framework] Each list item must be an object in old-style repeat, '
          + 'please use `repeat={{v in list}}` instead.')
        mergedData = {}
        mergedData[keyName] = index
        mergedData[valueName] = item
      }
    }
    else {
      mergedData = {}
      mergedData[keyName] = index
      mergedData[valueName] = item
    }
    const newContext = mergeContext(context, mergedData)
    vms.push(newContext)
    compile(newContext, target, fragBlock, { repeat: item })
  }

  const list = watchBlock(vm, fragBlock, getter, 'repeat',
    (data) => {
      console.debug('[JS Framework] the "repeat" item has changed', data)
      if (!fragBlock || !data) {
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
          removeTarget(vm, oldChildren[index])
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
            moveTarget(vm, reused.target, fragBlock.updateMark, true)
          }
          children.push(reused.target)
          vms.push(reused.vm)
          if (oldStyle) {
            reused.vm = item
          }
          else {
            reused.vm[valueName] = item
          }
          reused.vm[keyName] = index
          fragBlock.updateMark = reused.target
        }
        else {
          compileItem(item, index, vm)
        }
      })

      delete fragBlock.updateMark
    }
  )

  fragBlock.data = list.slice(0)
  list.forEach((item, index) => {
    compileItem(item, index, vm)
  })
}

/**
 * Watch the display update and add/remove the element.
 *
 * @param  {object} target
 * @param  {object} fragBlock
 * @param  {object} context
 */
function bindShown (vm, target, fragBlock, meta) {
  const display = watchBlock(vm, fragBlock, target.shown, 'shown',
    (display) => {
      console.debug('[JS Framework] the "if" item was changed', display)

      if (!fragBlock || !!fragBlock.display === !!display) {
        return
      }
      fragBlock.display = !!display
      if (display) {
        compile(vm, target, fragBlock, meta)
      }
      else {
        removeTarget(vm, fragBlock, true)
      }
    }
  )

  fragBlock.display = !!display
  if (display) {
    compile(vm, target, fragBlock, meta)
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
function watchBlock (vm, fragBlock, calc, type, handler) {
  const differ = vm && vm._app && vm._app.differ
  const config = {}
  const depth = (fragBlock.element.depth || 0) + 1

  return watch(vm, calc, (value) => {
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
function mergeContext (context, mergedData) {
  const newContext = Object.create(context)
  newContext._data = mergedData
  initData(newContext)
  initComputed(newContext)
  newContext._realParent = context
  if (context._static) {
    newContext._static = context._static
  }
  return newContext
}
