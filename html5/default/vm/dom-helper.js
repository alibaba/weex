/**
 * @fileOverview Document & Element Helpers.
 *
 * required:
 * Document#: createElement, createComment, getRef
 * Element#: appendChild, insertBefore, removeChild, nextSibling
 */

/**
 * Create a body by type
 * Using this._app.doc
 *
 * @param  {string} type
 */
export function createBody (vm, type) {
  const doc = vm._app.doc
  return doc.createBody(type)
}

/**
 * Create an element by type
 * Using this._app.doc
 *
 * @param  {string} type
 */
export function createElement (vm, type) {
  const doc = vm._app.doc
  return doc.createElement(type)
}

/**
 * Create and return a frag block for an element.
 * The frag block has a starter, ender and the element itself.
 *
 * @param  {object} element
 */
export function createBlock (vm, element) {
  const start = createBlockStart(vm)
  const end = createBlockEnd(vm)
  const blockId = lastestBlockId++
  if (element.element) {
    let updateMark = element.updateMark
    if (updateMark) {
      if (updateMark.element) {
        updateMark = updateMark.end
      }
      element.element.insertAfter(end, updateMark)
      element.element.insertAfter(start, updateMark)
      element.updateMark = end
    }
    else {
      element.element.insertBefore(start, element.end)
      element.element.insertBefore(end, element.end)
    }
    element = element.element
  }
  else {
    element.appendChild(start)
    element.appendChild(end)
  }
  return { start, end, element, blockId }
}

let lastestBlockId = 1

/**
 * Create and return a block starter.
 * Using this._app.doc
 */
function createBlockStart (vm) {
  const doc = vm._app.doc
  const anchor = doc.createComment('start')
  return anchor
}

/**
 * Create and return a block ender.
 * Using this._app.doc
 */
function createBlockEnd (vm) {
  const doc = vm._app.doc
  const anchor = doc.createComment('end')
  return anchor
}

/**
 * Attach target to a certain dest using appendChild by default.
 * If the dest is a frag block then insert before the ender.
 * If the target is a frag block then attach the starter and ender in order.
 *
 * @param  {object} target
 * @param  {object} dest
 */
export function attachTarget (vm, target, dest) {
  if (dest.element) {
    const before = dest.end
    const after = dest.updateMark
    // push new target for watch list update later
    if (dest.children) {
      dest.children.push(target)
    }
    // for check repeat case
    if (after) {
      const signal = moveTarget(vm, target, after)
      dest.updateMark = target.element ? target.end : target
      return signal
    }
    else if (target.element) {
      dest.element.insertBefore(target.start, before)
      dest.element.insertBefore(target.end, before)
    }
    else {
      return dest.element.insertBefore(target, before)
    }
  }
  else {
    if (target.element) {
      dest.appendChild(target.start)
      dest.appendChild(target.end)
    }
    else {
      return dest.appendChild(target)
    }
  }
}

/**
 * Move target before a certain element. The target maybe block or element.
 *
 * @param  {object} target
 * @param  {object} before
 */
export function moveTarget (vm, target, after) {
  if (target.element) {
    return moveBlock(target, after)
  }
  return moveElement(target, after)
}

/**
 * Move element before a certain element.
 *
 * @param  {object} element
 * @param  {object} before
 */
function moveElement (element, after) {
  const parent = after.parentNode
  if (parent) {
    return parent.insertAfter(element, after)
  }
}

/**
 * Move all elements of the block before a certain element.
 *
 * @param  {object} fragBlock
 * @param  {object} before
 */
function moveBlock (fragBlock, after) {
  const parent = after.parentNode

  if (parent) {
    let el = fragBlock.start
    let signal
    const group = [el]

    while (el && el !== fragBlock.end) {
      el = el.nextSibling
      group.push(el)
    }

    let temp = after
    group.every((el) => {
      signal = parent.insertAfter(el, temp)
      temp = el
      return signal !== -1
    })

    return signal
  }
}

/**
 * Remove target from DOM tree.
 * If the target is a frag block then call _removeBlock
 *
 * @param  {object} target
 */
export function removeTarget (vm, target, preserveBlock = false) {
  if (target.element) {
    removeBlock(target, preserveBlock)
  }
  else {
    removeElement(target)
  }
  if (target._vm) {
    target._vm.$emit('hook:destroyed')
  }
}

/**
 * Remove a certain element.
 * Using this._app.doc
 *
 * @param  {object} target
 */
function removeElement (target) {
  const parent = target.parentNode

  if (parent) {
    parent.removeChild(target)
  }
}

/**
 * Remove a frag block.
 * The second param decides whether the block self should be removed too.
 *
 * @param  {object}  fragBlock
 * @param  {Boolean} preserveBlock=false
 */
function removeBlock (fragBlock, preserveBlock = false) {
  const result = []
  let el = fragBlock.start.nextSibling

  while (el && el !== fragBlock.end) {
    result.push(el)
    el = el.nextSibling
  }

  if (!preserveBlock) {
    removeElement(fragBlock.start)
  }
  result.forEach((el) => {
    removeElement(el)
  })
  if (!preserveBlock) {
    removeElement(fragBlock.end)
  }
}
