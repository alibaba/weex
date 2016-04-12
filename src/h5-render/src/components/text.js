'use strict'

var Atomic = require('./component')

var DEFAULT_FONT_SIZE = 32

// attr
//  - value: text content.
//  - lines: maximum lines of the text.
function Text (data) {
  this.lines = data.style.lines
  Atomic.call(this, data)
}

Text.prototype = Object.create(Atomic.prototype)

Text.prototype.create = function () {
  var node = document.createElement('div')
  node.style.fontSize = DEFAULT_FONT_SIZE + 'px'
  this.textNode = document.createElement('span')
  // Give the developers the ability to control space
  // and line-breakers.
  this.textNode.style.whiteSpace = 'pre-wrap'
  this.updateLines(this.lines)
  node.appendChild(this.textNode)
  return node
}

Text.prototype.attr = {
  value: function (value) {
    var span = this.node.firstChild
    span.innerHTML = ''
    if (!value) {
      return
    }
    span.textContent = value
    /**
     * Developers are supposed to have the ability to break text
     * lines manually. Using ``&nbsp;`` to replace text space is
     * not compatible with the ``-webkit-line-clamp``. Therefor
     * we use ``white-space: no-wrap`` instead (instead of the
     * code bellow).

      var frag = document.createDocumentFragment()
        text.split(' ').forEach(function(str) {
          var textNode = document.createTextNode(str)
          var space = document.createElement('i')
          space.innerHTML = '&nbsp;'
          frag.appendChild(space)
          frag.appendChild(textNode)
        })
        frag.removeChild(frag.firstChild)
        span.appendChild(document.createElement('br'))
        span.appendChild(frag)
      })
      span.removeChild(span.firstChild)
     */
  }
}

Text.prototype.clearAttr = function () {
  this.node.firstChild.textContent = ''
}

Text.prototype.updateStyle = function (style) {
  Atomic.prototype.updateStyle.call(this, style)
  this.updateLines(style.lines)
}

Text.prototype.updateLines = function (lines) {
  if (lines) {
    this.textNode.style.overflow = 'hidden'
    this.textNode.style.textOverflow = 'ellipsis'
    this.textNode.style.display = '-webkit-box'
    this.textNode.style.webkitLineClamp = lines
    this.textNode.style.webkitBoxOrient = 'vertical'
  }
}

module.exports = Text
