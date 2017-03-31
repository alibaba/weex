'use strict'

import Kountdown from 'kountdown'

const FORMATTER_REGEXP = /(\\)?(dd*|hh?|mm?|ss?)/gi

function formatDateTime (data, formatter, timeColor) {
  return formatter.replace(FORMATTER_REGEXP, function (m) {
    const len = m.length
    const firstChar = m.charAt(0)
    // escape character
    if (firstChar === '\\') {
      return m.replace('\\', '')
    }
    const value = (firstChar === 'd' ? data.days :
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

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-element')
    const data = this.data
    const time = Number(data.attr.countdownTime) || 0
    const endTime = Date.now() / 1000 + time
    Kountdown({
      endDate: endTime,
      onUpdate: function (time) {
        const timeColor = data.style.timeColor || '#000'
        const result = formatDateTime(time, data.attr.formatterValue, timeColor)
        node.innerHTML = result
      },
      onEnd: function () {
      }
    }).start()

    return node
  }
}

const style = {
  textColor: function (value) {
    this.node.style.color = value
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  function Countdown (data) {
    Atomic.call(this, data)
  }
  Countdown.prototype = Object.create(Atomic.prototype)
  extend(Countdown.prototype, proto)
  extend(Countdown.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('countdown', Countdown)
}

export default { init }
