import LoadingIndicator from './loading-indicator'

export default {
  // name: 'loading',
  components: { LoadingIndicator },
  props: {
    display: {
      type: String,
      default: 'show',
      validator (value) {
        return ['show', 'hide'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      height: -1,
      viewHeight: 0
    }
  },
  mounted () {
    this.viewHeight = this.$el.offsetHeight
    if (this.display === 'hide') {
      this.height = 0
    }
    else {
      this.height = this.viewHeight
    }
  },
  updated () {
  },
  watch: {
    height (val) {
      this.$el.style.height = val + 'px'
    },
    display (val) {
      if (val === 'hide') {
        this.height = 0
      }
      else {
        this.height = this.viewHeight
      }
    }
  },
  methods: {
    pulling (offsetY = 0) {
      this.height = offsetY
    },
    pullingUp (offsetY) {
      this.$el.style.transition = `height 0s`
      this.pulling(offsetY)
    },
    pullingEnd () {
      this.$el.style.transition = `height .2s`
      if (this.height >= this.viewHeight) {
        this.pulling(this.viewHeight)
        this.$emit('loading')
      }
      else {
        this.pulling(0)
      }
    },
    getChildren () {
      const children = this.$slots.default || []
      if (this.display === 'show') {
        return children
      }
      return children.filter(vnode => {
        return vnode.componentOptions
          && vnode.componentOptions.tag !== 'loading-indicator'
      })
    }
  },
  render (createElement) {
    const ms = this._getComponentStyle(this.$vnode.data)
    return createElement('aside', {
      ref: 'loading',
      attrs: { 'weex-type': 'loading' },
      staticClass: 'weex-loading',
      staticStyle: ms
    }, this.getChildren())
  }
}
