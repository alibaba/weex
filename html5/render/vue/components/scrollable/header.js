// import { validateStyles } from '../../validator'
import { supportSticky } from '../../utils/style'

export default {
  data () {
    return {
      sticky: false,
      move: false,
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

  updated () {
    if (!this.sticky) {
      this.initTop = this.$el.offsetTop
    }
  },

  methods: {
    addSticky (offsetY) {
      this.move = false
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
      this.move = true
      this.$el.style.top = offsetY + 'px'
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
      class: { sticky: this.sticky, iossticky: supportSticky(), absolute: this.move }
    }, this.$slots.default)
  }
}
