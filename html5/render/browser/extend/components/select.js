'use strict'

let isArray

const proto = {
  create () {
    const node = document.createElement('select')
    const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
    this.className = 'weex-slct-' + uuid
    this.styleId = 'weex-style-' + uuid
    node.classList.add(this.className)
    // For the consistency of input component's width.
    // The date and time type of input will have a bigger width
    // when the 'box-sizing' is not set to 'border-box'
    node.style['box-sizing'] = 'border-box'
    return node
  },

  createOptions (opts) {
    const optDoc = document.createDocumentFragment()
    for (let i = 0, l = opts.length; i < l; i++) {
      const opt = document.createElement('option')
      opt.appendChild(document.createTextNode(opts[i]))
      optDoc.appendChild(opt)
    }
    this.node.appendChild(optDoc)
  }
}

const attr = {
  disabled: function (val) {
    this.node.disabled = val && val !== 'false'
  },
  options: function (val) {
    if (!isArray(val)) {
      return
    }
    this.options = val
    this.node.innerHTML = ''
    this.createOptions(val)
  },
  selectedIndex: function (val) {
    val = parseInt(val)
    if (typeof val !== 'number' || isNaN(val) || val >= this.options.length) {
      return
    }
    this.node.value = this.options[val]
  }
}

const event = {
  change: {
    updator: function () {
      return {
        attrs: {
          selectedIndex: this.options.indexOf(this.node.value)
        }
      }
    },
    extra: function () {
      return {
        index: this.options.indexOf(this.node.value),
        timestamp: Date.now()
      }
    }
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend
  isArray = Weex.utils.isArray

  // attrs:
  //   - options: the options to be listed, as a array of strings.
  //   - selectedIndex: the selected options' index number.
  //   - disabled
  function Select (data) {
    this.options = []
    this.selectedIndex = 0
    Atomic.call(this, data)
  }
  Select.prototype = Object.create(Atomic.prototype)
  extend(Select.prototype, proto)
  extend(Select.prototype, { attr })
  extend(Select.prototype, { event })

  Weex.registerComponent('select', Select)
}

export default { init }

