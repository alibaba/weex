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

/**
 * build(externalDirs)
 *   createVm()
 *   merge(externalDirs, dirs)
 *   generate(template, parentNode)
 *     if (type is content) create contentNode
 *     else if (dirs have v-for) foreach -> create context
 *       -> generate(templateWithoutFor, parentNode): diff(list) onchange
 *     else if (dirs have v-if) assert
 *       -> generate(templateWithoutIf, parentNode): toggle(shown) onchange
 *     else if (type is native)
 *       set(dirs): update(id/attr/style/class) onchange
 *       append(template, parentNode)
 *       foreach childNodes -> generate(childNode, template)
 *     else if (type is custom)
 *       addChildVm(vm, parentVm)
 *       build(externalDirs)
 *       foreach childNodes -> generate(childNode, template)
 */
export function _build() {
  const opt = this._options || {}
  const template = opt.template || {}

  if (opt.replace) {
    if (template.children && template.children.length === 1) {
      this._generate(template.children[0], this._parentEl)
    }
    else {
      this._generate(template.children, this._parentEl)
    }
  }
  else {
    this._generate(template, this._parentEl)
  }

  this.$emit('hook:ready')
  this._ready = true
}

/**
 * Generate elements by child or children and append to parent elements.
 * Root element info would be merged if has. The first argument may be an array
 * if the root element with options.replace has not only one child.
 *
 * @param  {object|array} target
 * @param  {object} parentEl
 * @param  {object} context
 */
export function _generate(target, parentEl, context) {

  if (Array.isArray(target)) {
    const fragBlock = this._createBlock(parentEl)
    target.forEach((child) => {
      this._generate(child, fragBlock, context)
    })
    return
  }

  context = context || {}

  if (target.type === 'content' || target.type === 'slot') {
    this._content = this._createBlock(parentEl)
    return
  }

  if (!context.hasOwnProperty('repeat') && target.repeat) {
    const list = target.repeat.call(this)
    const repeatId = latestRepeatId++
    const latestItemId = markList(list, repeatId)

    const fragBlock = this._createBlock(parentEl)
    fragBlock.children = []
    fragBlock.data = list.slice(0)

    this._checkRepeat(target, fragBlock, repeatId, latestItemId)

    list.forEach((item) => {
      this._generate(target, fragBlock, {repeat: item})
    })

    return
  }

  let subContext = this
  if (context.repeat && !context.shown) {
    subContext = this._mergeContext(context.repeat)
  }

  if (!context.hasOwnProperty('shown') && target.shown) {
    const display = target.shown.call(subContext)
    const newContext = {shown: true}
    const fragBlock = subContext._createBlock(parentEl)

    if (parentEl.element && parentEl.children) {
      parentEl.children.push(fragBlock)
    }

    if (context.repeat) {
      newContext.repeat = context.repeat
    }

    fragBlock.display = !!display
    subContext._checkDisplay(target, fragBlock, newContext)

    if (display) {
      subContext._generate(target, fragBlock, newContext)
    }

    return
  }

  let isComponent
  if (this._app && this._app.customComponentMap && target.type) {
    isComponent = this._app.customComponentMap[target.type]
  }
  else {
    isComponent = target.component
  }

  if (isComponent) {
    const Vm = this.constructor
    const subVm = new Vm(target.type, subContext, parentEl, undefined, {
      'hook:init': function () {
        subContext._setId(target.id, null, this)
      },
      'hook:created': function () {
        subContext._bindSubVm(this, target, context.repeat)
      },
      'hook:ready': function () {
        if (this._content) {
          subContext._setChildren(target, this._content)
        }
      }
    })
    subContext._bindSubVmAfterInitialized(subVm, target)
    return
  }

  const element = subContext._generateElement(target, parentEl)
  const treeMode = target.append === 'tree'
  if (!treeMode) {
    subContext._attachTarget(element, parentEl)
  }
  subContext._setChildren(target, element)
  if (treeMode) {
    subContext._attachTarget(element, parentEl)
  }
}

/**
 * Generate element from template and attach to the dest if needed.
 * The time to attach depends on whether the mode status is node or tree.
 *
 * @param  {object} template
 * @param  {object} dest
 */
export function _generateElement(template, dest) {

  this._applyNaitveComponentOptions(template)

  let element
  if (dest.ref === '_documentElement') {
    // if its parent is documentElement then it's a body
    element = this._createBody(template.type)
  } else {
    element = this._createElement(template.type)
  }
  // TODO it was a root element when not in a fragment
  if (!this._rootEl) {
    this._rootEl = element
  }

  this._bindElement(element, template)

  if (template.attr && template.attr.append) { // backward, append prop in attr
    element.append = template.attr.append
  }

  return element
}

/**
 * Set all children to a certain parent element.
 *
 * @param {object} template
 * @param {object} parentEl
 */
export function _setChildren(template, parentEl) {
  const children = template.children
  if (children && children.length) {
    children.forEach((child) => {
      this._generate(child, parentEl)
    })
  }
}

/**
 * Watch the list update and refresh the changes.
 *
 * @param  {object} target
 * @param  {object} fragBlock
 */
export function _checkRepeat(target, fragBlock, repeatId, latestItemId) {
  const children = fragBlock.children

  this._watchBlock(fragBlock, target.repeat, 'repeat', (value) => {
    if (!fragBlock) {
      return
    }

    const oldChildren = children.slice()
    const oldValue = fragBlock.data.slice()
    // 1. collect all new refs track by
    const trackMap = {}
    const reusedMap = {}
    value.forEach((item, index) => {
      let key = item[`__wx_repeat_${repeatId}__`]
      if (!key) {
        key = latestItemId++
        setRepeatItemId(item, repeatId, key)
      }
      trackMap[key] = item
    })

    // 2. remove unused element foreach old item
    const reusedList = []
    oldValue.forEach((item, index) => {
      const key = item[`__wx_repeat_${repeatId}__`]
      if (trackMap.hasOwnProperty(key)) {
        reusedMap[key] = {item, index, target: oldChildren[index]}
        reusedList.push(item)
      }
      else {
        this._removeTarget(oldChildren[index])
      }
    })

    // 3. create new element foreach new item
    children.length = 0
    fragBlock.data = value.slice()
    fragBlock.updateMark = fragBlock.start

    value.forEach((item, index) => {
      const key = item[`__wx_repeat_${repeatId}__`]
      const reused = reusedMap[key]
      if (reused) {
        if (reused.item === reusedList[0]) {
          reusedList.shift()
        } else {
          reusedList.$remove(reused.item)
          this._moveTarget(reused.target, fragBlock.updateMark, true)
        }
        children.push(reused.target)
        fragBlock.updateMark = reused.target
      }
      else {
        this._generate(target, fragBlock, {repeat: item})
      }
    })

    delete fragBlock.updateMark
  })
}

let latestRepeatId = 1

function markList(list, repeatId) {
  let latestItemId = 1
  list.forEach((item) => {
    setRepeatItemId(item, repeatId, latestItemId++)
  })
  return latestItemId
}

function setRepeatItemId(item, repeatId, itemId) {
  const key = `__wx_repeat_${repeatId}__`
  if (typeof item === 'object') {
    Object.defineProperty(item, key, {
      value: itemId
    })
  }
}

/**
 * Watch the display update and add/remove the element.
 *
 * @param  {object} target
 * @param  {object} fragBlock
 * @param  {object} context
 */
export function _checkDisplay(target, fragBlock, context) {

  this._watchBlock(fragBlock, target.shown, 'shown', (value) => {
    if (!fragBlock || !!fragBlock.display === !!value) {
      return
    }
    fragBlock.display = value
    if (value) {
      this._generate(target, fragBlock, context)
    }
    else {
      this._removeBlock(fragBlock, true)
    }
  })
}

export function _watchBlock(fragBlock, calc, type, handler) {
  const differ = this && this._app && this._app.differ
  const config = {}
  const depth = fragBlock.element.depth + 1

  this._watch(calc, (value) => {
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
export function _mergeContext(mergedData) {
  const context = Object.create(this)
  context._data = mergedData
  context._initData()
  context._realParent = this
  return context
}
