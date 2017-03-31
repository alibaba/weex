import { base } from '../mixins'
import { validateStyles } from '../validator'
import { extend } from '../utils'

/**
 * Get text styles
 */
function getTextStyle (context = {}) {
  const vnode = context.$vnode || {}
  const staticStyle = vnode.data && vnode.data.staticStyle || {}
  const mergedStyle = vnode.data && vnode.data.mergedStyle || {}
  const lines = parseInt(mergedStyle.lines) || 0
  if (lines > 0) {
    return extend(staticStyle, {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      webkitLineClamp: lines
    })
  }
  return staticStyle
}

export default {
  mixins: [base],
  props: {
    lines: [Number, String],
    value: [String]
  },

  render (createElement) {
    this.prerender()
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('text', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('p', {
      attrs: { 'weex-type': 'text' },
      on: this.createEventMap(),
      staticClass: 'weex-text',
      staticStyle: getTextStyle(this)
    }, this.$slots.default || [this.value])
  }
}
