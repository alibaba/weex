import { nextFrame, toCSSText } from '../utils'

function transitionOnce (vnode, config, callback) {
  const duration = config.duration || 1000 // ms
  const timing = config.timingFunction || 'ease'
  const delay = config.delay || 0  // ms

  // TODO: parse transition properties
  const transitionValue = `all ${duration}ms ${timing} ${delay}ms`

  const dom = vnode.$el
  const transitionEndHandler = function (event) {
    event.stopPropagation()
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

  nextFrame(() => {
    dom.style.cssText += toCSSText(config.styles || {})
  })
}

export default {
  /**
   * transition
   * @param  {String} vnode
   * @param  {Object} config
   * @param  {String} callback
   */
  transition (vnode, config, callback) {
    // TODO: Make sure the transition is only run once
    return transitionOnce(vnode, config, () => {
      callback && callback()
    })
  }
}
