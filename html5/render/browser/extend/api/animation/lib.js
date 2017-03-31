'use strict'

/**
 * config:
 *   - styles
 *   - duration [Number] milliseconds(ms)
 *   - timingFunction [string]
 *   - dealy [Number] milliseconds(ms)
 */
export function transitionOnce (comp, config, callback) {
  const styles = config.styles || {}
  const duration = config.duration || 1000 // ms
  const timingFunction = config.timingFunction || 'ease'
  const delay = config.delay || 0  // ms
  const transitionValue = 'all ' + duration + 'ms '
      + timingFunction + ' ' + delay + 'ms'
  const dom = comp.node
  const transitionEndHandler = function (e) {
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
