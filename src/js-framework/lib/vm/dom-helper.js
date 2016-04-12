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
export function _createBody(type) {
  const doc = this._app.doc
  return doc.createBody(type)
}

/**
 * Create an element by type
 * Using this._app.doc
 *
 * @param  {string} type
 */
export function _createElement(type) {
  const doc = this._app.doc
  return doc.createElement(type)
}

/**
 * Create and return a frag block for an element.
 * The frag block has a starter, ender and the element itself.
 *
 * @param  {object} element
 */
export function _createBlock(element) {
  const start = this._createBlockStart()
  const end = this._createBlockEnd()
  const blockId = lastestBlockId++
  if (element.element) {
    element.element.insertBefore(start, element.end)
    element.element.insertBefore(end, element.end)
    element = element.element
  }
  else {
    element.appendChild(start)
    element.appendChild(end)
  }
  return {start, end, element, blockId}
}

let lastestBlockId = 1

/**
 * Create and return a block starter.
 * Using this._app.doc
 */
export function _createBlockStart() {
  const doc = this._app.doc
  const anchor = doc.createComment('start')
  return anchor
}

/**
 * Create and return a block ender.
 * Using this._app.doc
 */
export function _createBlockEnd() {
  const doc = this._app.doc
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
export function _attachTarget(target, dest) {

  if (dest.element) {
    const before = dest.end
    const after = dest.updateMark
    // push new target for watch list update later
    if (dest.children) {
      dest.children.push(target)
    }
    // for check repeat case
    if (after) {
      this._moveTarget(target, after)
      dest.updateMark = target.element ? target.end : target
    }
    else if (target.element) {
      dest.element.insertBefore(target.start, before)
      dest.element.insertBefore(target.end, before)
    }
    else {
      dest.element.insertBefore(target, before)
    }
  }
  else {
    if (target.element) {
      dest.appendChild(target.start)
      dest.appendChild(target.end)
    }
    else {
      dest.appendChild(target)
    }
  }
}

/**
 * Move target before a certain element. The target maybe block or element.
 *
 * @param  {object} target
 * @param  {object} before
 */
export function _moveTarget(target, after) {
  if (target.element) {
    this._moveBlock(target, after)
  }
  else {
    this._moveElement(target, after)
  }
}

/**
 * Move element before a certain element.
 *
 * @param  {object} element
 * @param  {object} before
 */
export function _moveElement(element, after) {
  const doc = this._app.doc
  const parent = doc.getRef(after.parentRef)

  if (parent) {
    parent.insertAfter(element, after)
  }
}

/**
 * Move all elements of the block before a certain element.
 *
 * @param  {object} fragBlock
 * @param  {object} before
 */
export function _moveBlock(fragBlock, after) {
  const doc = this._app.doc
  const parent = doc.getRef(after.parentRef)

  if (parent) {
    let el = fragBlock.start
    const group = [el]

    while (el && el !== fragBlock.end) {
      el = el.next()
      group.push(el)
    }

    let temp = after
    group.forEach((el) => {
      parent.insertAfter(el, temp)
      temp = el
    })
  }
}

/**
 * Remove target from DOM tree.
 * If the target is a frag block then call _removeBlock
 *
 * @param  {object} target
 */
export function _removeTarget(target) {

  if (target.element) {
    this._removeBlock(target)
  }
  else {
    this._removeElement(target)
  }
}

/**
 * Remove a certain element.
 * Using this._app.doc
 *
 * @param  {object} target
 */
export function _removeElement(target) {
  const doc = this._app.doc
  const parent = doc.getRef(target.parentRef)

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
export function _removeBlock(fragBlock, preserveBlock = false) {
  const result = []
  let el = fragBlock.start.next()

  while (el && el !== fragBlock.end) {
    result.push(el)
    el = el.next()
  }

  if (!preserveBlock) {
    this._removeElement(fragBlock.start)
  }
  result.forEach((el) => {
    this._removeElement(el)
  })
  if (!preserveBlock) {
    this._removeElement(fragBlock.end)
  }
}

