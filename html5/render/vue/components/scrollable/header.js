import { base } from '../../mixins'
import { validateStyles } from '../../validator'

export default {
  mixins: [base],
  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('header', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('header', {
      attrs: { 'weex-type': 'header' },
      on: this.createEventMap(),
      staticClass: 'weex-header'
    }, this.$slots.default)
  }
}
