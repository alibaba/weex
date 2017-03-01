// import { validateStyles } from '../../validator'
import { supportSticky } from '../../utils/style'

export default {
  data () {
    return {
      sticky: false,
      initTop: 0,
      placeholder: null,
      supportSticky: supportSticky()
    }
  },

  mounted () {
    this.initTop = this.$el.offsetTop
    this.placeholder = window.document.createElement('div')
  },

  updated () {
    if (!this.sticky) {
      this.initTop = this.$el.offsetTop
    }
  },

  methods: {
    addSticky () {
      this.sticky = true
      this.placeholder.style.display = 'block'
      this.placeholder.style.width = this.$el.offsetWidth + 'px'
      this.placeholder.style.height = this.$el.offsetHeight + 'px'
      this.$el.parentNode.insertBefore(this.placeholder, this.$el)
    },

    removeSticky () {
      this.sticky = false
      try {
        this.$el.parentNode.removeChild(this.placeholder)
      }
      catch (e) {
      }
    }
  },

  render (createElement) {
    /* istanbul ignore next */
    // if (process.env.NODE_ENV === 'development') {
    //   validateStyles('header', this.$vnode.data && this.$vnode.data.staticStyle)
    // }

    return createElement('html:header', {
      attrs: { 'weex-type': 'header' },
      on: this._createEventMap(),
      ref: 'header',
      staticClass: 'weex-header',
      class: { sticky: this.sticky, iossticky: this.supportSticky }
    }, this.$slots.default)
  }
}
