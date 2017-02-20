import { base } from '../mixins'
import { validateStyles } from '../validator'

export default {
  mixins: [base],
  props: {
    href: String
  },
  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('a', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('html:a', {
      attrs: {
        'weex-type': 'a',
        href: this.href
      },
      on: this.createEventMap(),
      staticClass: 'weex-a'
    }, this.$slots.default)
  }
}
