'use strict'

var Atomic = require('./component')
var sender = require('../bridge/sender')

// attrs:
//   - options: the options to be listed, as a array of strings.
//   - selectedIndex: the selected options' index number.
//   - disabled
function Select (data) {
  var attrs = data.attr || {}
  this.options = []
  this.selectedIndex = 0
  Atomic.call(this, data)
}

Select.prototype = Object.create(Atomic.prototype)

Select.prototype.create = function () {
  var node = document.createElement('select')
  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
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
                    ? true
                    : false
  },
  options: function (val) {
    if (Object.prototype.toString.call(val) !== '[object Array]') {
      return
    }
    this.options = val
    this.node.innerHTML = ''
    this.createOptions(val)
  },
  selectedIndex: function (val) {
    val = parseInt(val)
    if (typeof val !== 'number' || val !== val || val >= this.options.length) {
      return
    }
    this.node.value = this.options[val]
  }
}

Select.prototype.bindEvents = function (evts) {
  var isListenToChange = false
  Atomic.prototype.bindEvents.call(
      this,
      evts.filter(function (val) {
        var pass = val !== 'change'
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
  var optDoc = document.createDocumentFragment()
  var opt
  for (var i = 0, l = opts.length; i < l; i++) {
    opt = document.createElement('option')
    opt.appendChild(document.createTextNode(opts[i]))
    optDoc.appendChild(opt)
  }
  this.node.appendChild(optDoc)
}

module.exports = Select
