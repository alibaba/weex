import LoadingIndicator from './loading-indicator'
import { createEvent } from '../../utils'

export default {
  // name: 'refresh',
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
      lastDy: 0,
      viewHeight: 0,
      height: -1
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
      this.$emit('pullingdown', createEvent(this, 'pullingdown', {
        dy: offsetY - this.lastDy,
        pullingDistance: offsetY,
        viewHeight: this.viewHeight
      }))
      this.lastDy = offsetY
    },
    pullingDown (offsetY) {
      this.$el.style.transition = `height 0s`
      this.pulling(offsetY)
    },
    pullingEnd () {
      this.$el.style.transition = `height .2s`
      if (this.height >= this.viewHeight) {
        this.pulling(this.viewHeight)
        this.$emit('refresh')
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
      ref: 'refresh',
      attrs: { 'weex-type': 'refresh' },
      staticClass: 'weex-refresh',
      staticStyle: ms
    }, this.getChildren())
  }
}
