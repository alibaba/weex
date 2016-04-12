'use strict'

var Atomic = require('./atomic')
require('kountdown/build/countdown')

var FORMATTER_REGEXP = /(\\)?(dd*|hh?|mm?|ss?)/gi

function formatDateTime(data, formatter, timeColor) {
  return formatter.replace(FORMATTER_REGEXP, function (m) {
    var len = m.length
    var firstChar = m.charAt(0)
    // escape character
    if (firstChar === '\\') {
      return m.replace('\\', '')
    }
    var value = (firstChar === 'd' ? data.days :
                firstChar === 'h' ? data.hours :
                firstChar === 'm' ? data.minutes :
                firstChar === 's' ? data.seconds : 0) + ''

    // 5 zero should be enough
    return '<span style="margin:4px;color:'
      + timeColor + '" >'
      + ('00000' + value).substr(-Math.max(value.length, len))
      + '</span>'
  })
}

function Countdown (data) {
  Atomic.call(this, data)
}

Countdown.prototype = Object.create(Atomic.prototype)

Countdown.prototype.create = function () {
  var node = document.createElement('div')
  var data = this.data
  var time = Number(data.attr.countdownTime) || 0
  var endTime = Date.now() / 1000 + time
  var cd = lib.countdown({
    endDate: endTime,
    onUpdate: function (time) {
      var timeColor = data.style.timeColor || '#000'
      var result = formatDateTime(time, data.attr.formatterValue, timeColor)
      node.innerHTML = result
    },
    onEnd: function () {
    }
  }).start()

  return node
}

Countdown.prototype.style = {
  textColor: function (value) {
    this.node.style.color = value
  }
}

module.exports = Countdown
