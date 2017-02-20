import { base } from '../../mixins'
import { validateStyles } from '../../validator'

export default {
  mixins: [base],

  data () {
    return {
      sticky: false,
      initTop: 0,
      initHeight: 0,
      placeholder: null
    }
  },

  mounted () {
    this.initTop = this.$el.offsetTop
    this.initHeight = this.$el.offsetHeight
    this.placeholder = window.document.createElement('div')
  },

  methods: {
    addSticky (offsetY) {
      this.$el.style.position = ''
      this.sticky = true
      this.$el.style.top = offsetY + 'px'
      this.placeholder.style.display = 'block'
      this.placeholder.style.width = this.$el.offsetWidth + 'px'
      this.placeholder.style.height = this.$el.offsetHeight + 'px'
      this.$el.parentNode.insertBefore(this.placeholder, this.$el)
    },

    removeSticky () {
      this.sticky = false
      this.$el.style.top = '0'
      try {
        this.$el.parentNode.removeChild(this.placeholder)
      }
      catch (e) {
      }
    },

    moveUp (offsetY) {
      this.$el.style.position = 'absolute'
      this.$el.style.top = offsetY + 'px'
    }
  },

  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('header', this.$vnode.data && this.$vnode.data.staticStyle)
    }

    return createElement('html:header', {
      attrs: { 'weex-type': 'header' },
      on: this.createEventMap(),
      ref: 'header',
      staticClass: 'weex-header',
      class: { sticky: this.sticky }
    }, this.$slots.default)
  }
}
