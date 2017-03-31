import { base } from '../../../mixins'
import { validateStyles } from '../../../validator'

export default {
  mixins: [base],
  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('cell', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('section', {
      attrs: { 'weex-type': 'cell' },
      on: this.createEventMap(),
      staticClass: 'weex-cell'
    }, this.$slots.default)
  }
}
