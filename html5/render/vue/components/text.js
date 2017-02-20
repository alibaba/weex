import { base } from '../mixins'
import { validateStyles } from '../validator'

/**
 * Get text styles
 */
function getTextStyle (context = {}) {
  const lines = parseInt(context.lines) || 0
  if (lines > 0) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      webkitLineClamp: lines
    }
  }
}

export default {
  mixins: [base],
  props: {
    lines: [Number, String],
    value: [String]
  },

  render (createElement) {
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
