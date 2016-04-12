'use strict'

module.exports = {

  /**
   * config:
   *   - styles
   *   - duration [Number] milliseconds(ms)
   *   - timingFunction [string]
   *   - dealy [Number] milliseconds(ms)
   */
  transitionOnce: function (comp, config, callback) {
    var styles = config.styles || {}
    var duration = config.duration || 1000 // ms
    var timingFunction = config.timingFunction || 'ease'
    var delay = config.delay || 0  // ms
    var transitionValue = 'all ' + duration + 'ms '
        + timingFunction + ' ' + delay + 'ms'
    var dom = comp.node
    var transitionEndHandler = function (e) {
      e.stopPropagation()
      dom.removeEventListener('webkitTransitionEnd', transitionEndHandler)
      dom.removeEventListener('transitionend', transitionEndHandler)
      dom.style.transition = ''
      dom.style.webkitTransition = ''
      callback()
    }
    dom.style.transition = transitionValue
    dom.style.webkitTransition = transitionValue
    dom.addEventListener('webkitTransitionEnd', transitionEndHandler)
    dom.addEventListener('transitionend', transitionEndHandler)
    comp.updateStyle(styles)
  }

}