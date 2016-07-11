'use strict'

const Atomic = require('./component')
const sender = require('../bridge/sender')
const utils = require('../utils')

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

Select.prototype.create = function () {
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
}

Select.prototype.attr = {
  disabled: function (val) {
    this.node.disabled = val && val !== 'false'
  },
  options: function (val) {
    if (!utils.isArray(val)) {
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

Select.prototype.bindEvents = function (evts) {
  let isListenToChange = false
  Atomic.prototype.bindEvents.call(
      this,
      evts.filter(function (val) {
        const pass = val !== 'change'
        !pass && (isListenToChange = true)
        return pass
      }))
  if (isListenToChange) {
    this.node.addEventListener('change', function (e) {
      e.index = this.options.indexOf(this.node.value)
      sender.fireEvent(this.data.ref, 'change', e)
    }.bind(this))
  }
}

Select.prototype.createOptions = function (opts) {
  const optDoc = document.createDocumentFragment()
  for (let i = 0, l = opts.length; i < l; i++) {
    const opt = document.createElement('option')
    opt.appendChild(document.createTextNode(opts[i]))
    optDoc.appendChild(opt)
  }
  this.node.appendChild(optDoc)
}

module.exports = Select
