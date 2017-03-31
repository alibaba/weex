'use strict'

const DEFAULT_FONT_SIZE = 32
const DEFAULT_TEXT_OVERFLOW = 'ellipsis'

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container')
    node.style.fontSize = DEFAULT_FONT_SIZE + 'px'
    this.textNode = document.createElement('span')
    // Give the developers the ability to control space
    // and line-breakers.
    this.textNode.style.whiteSpace = 'pre-wrap'
    this.textNode.style.wordWrap = 'break-word'
    this.textNode.style.display = '-webkit-box'
    this.textNode.style.webkitBoxOrient = 'vertical'
    this.style.lines.call(this, (this.data.style || {}).lines)
    node.appendChild(this.textNode)
    return node
  },

  clearAttr () {
    this.node.firstChild.textContent = ''
  }
}

const attr = {
  value: function (value) {
    const span = this.node.firstChild
    span.innerHTML = ''
    if (value == null || value === '') {
      return
    }
    span.textContent = value
    /**
     * Developers are supposed to have the ability to break text
     * lines manually. Using ``&nbsp;`` to replace text space is
     * not compatible with the ``-webkit-line-clamp``. Therefor
     * we use ``white-space: no-wrap`` instead (instead of the
     * code bellow).

      const frag = document.createDocumentFragment()
        text.split(' ').forEach(function(str) {
          const textNode = document.createTextNode(str)
          const space = document.createElement('i')
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

const style = {
  lines: function (val) {
    val = parseInt(val)
    if (isNaN(val)) {
      return
    }
    if (val <= 0) {
      this.textNode.style.textOverflow = ''
      this.textNode.style.overflow = 'visible'
      this.textNode.style.webkitLineClamp = ''
    }
    else {
      const style = this.data ? this.data.style : null
      this.textNode.style.overflow = 'hidden'
      this.textNode.style.textOverflow = style
        ? style.textOverflow
        : DEFAULT_TEXT_OVERFLOW
      this.textNode.style.webkitLineClamp = val
    }
  },

  textOverflow: function (val) {
    this.textNode.style.textOverflow = val
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  // attr
  //  - value: text content.
  // style
  //  - lines: maximum lines of the text.
  function Text (data) {
    Atomic.call(this, data)
  }
  Text.prototype = Object.create(Atomic.prototype)
  extend(Text.prototype, proto)
  extend(Text.prototype, { attr })
  extend(Text.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('text', Text)
}

export default { init }
