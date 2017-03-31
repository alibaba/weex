'use strict'

const displayMap = {
  a: 'inline',
  image: 'inline-block',
  span: 'inline-block'
}

const typeMap = {
  a: 'a',
  image: 'image',
  span: 'text'
}

let _richTextNodeRef = 0
const getRichTextNodeRef = function () {
  return `rtn-${_richTextNodeRef++}`
}

function _isArray (arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array'
}

function _isPlainObject (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
}

function _parse (parent, parentNode, value) {
  if (_isArray(value)) {
    return value.forEach((node) => _parse(parent, parentNode, node))
  }
  if (_isPlainObject(value)) {
    const { type, attr, style, children } = value
    // don't pass children to componnent's own `createChildren` method.
    // otherwise there's no chance to set children's display to `inline`.
    delete value.children
    const comp = parent.getComponentManager().createElement({
      type: typeMap[type],
      ref: getRichTextNodeRef(),
      attr,
      style
    })
    comp.node.style.display = displayMap[type]
    parentNode.appendChild(comp.node)
    if (_isArray(children)) {
      children.forEach((child) => _parse(comp, comp.node, child))
    }
  }
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-element')
    node.classList.add('weex-richtext')
    return node
  },

  parse () {
    Array.prototype.slice.call(this.node.children)
      .forEach((child) => this.node.removeChild(child))
    if (!this.value) {
      return
    }
    _parse(this, this.node, this.value)
  }
}

// updatable attributes
const attr = {
  value (val) {
    this.value = val
    this.parse()
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  /**
   * attrs:
   *  - value
   */
  function RichText (data) {
    Atomic.call(this, data)
  }
  RichText.prototype = Object.create(Atomic.prototype)
  extend(RichText.prototype, proto)
  extend(RichText.prototype, { attr })

  Weex.registerComponent('richtext', RichText)
}

export default { init }
