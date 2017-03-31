import { base } from '../mixins'
import { validateStyles } from '../validator'

export default {
  mixins: [base],
  props: {
    src: {
      type: String,
      required: true
    },
    resize: {
      validator (value) {
        /* istanbul ignore next */
        return ['cover', 'contain', 'stretch'].indexOf(value) !== -1
      }
    }
  },

  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('image', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    let cssText = `background-image:url("${this.src}");`

    // compatibility: http://caniuse.com/#search=background-size
    cssText += (this.resize && this.resize !== 'stretch')
      ? `background-size: ${this.resize};`
      : `background-size: 100% 100%;`

    return createElement('figure', {
      attrs: { 'weex-type': 'image' },
      on: this.createEventMap(['load']),
      staticClass: 'weex-image',
      style: cssText
    })
  }
}
