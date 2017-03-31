import { base } from '../mixins'
import { validateStyles } from '../validator'

function trimTextNode (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return children
}

export default {
  mixins: [base],
  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('div', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('html:div', {
      attrs: { 'weex-type': 'div' },
      on: this.createEventMap(),
      staticClass: 'weex-div'
    }, trimTextNode(this.$slots.default))
  }
}
